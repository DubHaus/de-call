import {GraphQLError} from 'graphql';
import {Arg, Ctx, Mutation, Resolver, UseMiddleware} from 'type-graphql';
import { v4 } from 'uuid';
import {Photo} from '../entity/Photo';
import {isAuth} from '../middleware/isAuth';
import {MyContext} from '../ts-types/context';
import {deleteFile, splitImageExt, storeFS} from '../utils/file';
import {UploadImageInput} from './types/image';

@Resolver()
export class PhotoResolver {
    @Mutation(() => String)
    @UseMiddleware(isAuth())
    async uploadPhoto(
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

            const photo = Photo.create({
                id,
                description,
                filename,
                localPath,
                location,
            });

            await Photo.insert(photo);

            return photo.location;
        } else throw new GraphQLError("User don't exist!");
    }

    @Mutation(() => Boolean)
    async removePhoto(
        @Arg('input')
        location: string
    ): Promise<boolean> {
        const photo = await Photo.findOne({where: {location}});
        if (photo) {
            try {
                await deleteFile(photo.localPath);
                await Photo.delete(photo.id);
            } catch (err) {
                console.error(err);
                throw new GraphQLError(
                    `Couldn't delete file ${photo.location}`
                );
            }
            return true;
        } else {
            throw new GraphQLError("Photo don't exist!");
        }
    }
}
