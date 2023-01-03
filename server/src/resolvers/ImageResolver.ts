import {GraphQLError} from 'graphql';
import {Arg, Ctx, Mutation, Resolver, UseMiddleware} from 'type-graphql';
import {v4} from 'uuid';
import {Image} from '../entity/Image';
import {isAuth} from '../middleware/isAuth';
import {MyContext} from '../ts-types/context';
import {deleteFile, splitImageExt, storeFS} from '../utils/file';
import {UploadImageInput} from './types/image';

@Resolver()
export class ImageResolver {
    @Mutation(() => String)
    @UseMiddleware(isAuth())
    async uploadImage(
        @Arg('input')
        {file, description}: UploadImageInput,
        @Ctx() {currentUser}: MyContext
    ): Promise<string> {
        if (currentUser) {
            const {createReadStream, filename} = await file;
            const id = v4();
            const stream = createReadStream();
            const [name, ext] = splitImageExt(filename);
            const fullFileName = `${name}-${currentUser.username}-${id}.${ext}`;
            const localPath = await storeFS({
                stream,
                filename: fullFileName,
            });
            const location = `http://localhost:4000/images/${fullFileName}`;

            const image = Image.create({
                id,
                description,
                filename,
                localPath,
                location,
            });

            await Image.insert(image);

            return image.location;
        } else throw new GraphQLError("User don't exist!");
    }

    @Mutation(() => Boolean)
    async removeImage(
        @Arg('input')
        location: string
    ): Promise<boolean> {
        const image = await Image.findOne({where: {location}});
        if (image) {
            try {
                await deleteFile(image.localPath);
                await Image.delete(image.id);
            } catch (err) {
                console.error(err);
                throw new GraphQLError(
                    `Couldn't delete file ${image.location}`
                );
            }
            return true;
        } else {
            throw new GraphQLError("Image don't exist!");
        }
    }
}
