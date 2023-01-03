import {Arg, Ctx, Mutation, Resolver, UseMiddleware} from 'type-graphql';
import {Event} from '../entity/Event';
import {Image} from '../entity/Image';
import {Photo} from '../entity/Photo';
import {isAuth} from '../middleware/isAuth';
import {MyContext} from '../ts-types/context';
import {CreateEventInput} from './types/Event';

@Resolver(() => Event)
export class EventReslover {
    @Mutation()
    @UseMiddleware(isAuth())
    async createEvent(
        @Arg('input')
        {
            title,
            description,
            categories,
            date,
            type,
            previewImage,
        }: CreateEventInput,
        @Ctx() {currentUser}: MyContext
    ) {
        let newPhotoEntity: Image | undefined;
        if (previewImage) {
            const foundImage = await Image.findOne({
                where: {location: previewImage},
            });
            foundImage && (newPhotoEntity = foundImage);
        }
        const event = Event.create({
            title,
            description,
            categories,
            date,
            type,
            previewImage: newPhotoEntity,
        });
    }
}
