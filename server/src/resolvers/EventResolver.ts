import {GraphQLError} from 'graphql';
import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware} from 'type-graphql';
import {Event} from '../entity/Event';
import {Image} from '../entity/Image';
import {User} from '../entity/User';
import {isAuth} from '../middleware/isAuth';
import {MyContext} from '../ts-types/context';
import {CreateEventInput} from './types/Event';

@Resolver(() => Event)
export class EventReslover {
    @Mutation(() => Boolean)
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
    ): Promise<Boolean> {
        let image: Image | undefined;
        const creator = await User.findOne({
            where: {username: currentUser?.username},
        });
        if (creator) {
            if (previewImage) {
                const foundImage = await Image.findOne({
                    where: {location: previewImage},
                });
                foundImage && (image = foundImage);
            }
            await Event.save({
                title,
                description,
                categories,
                date,
                type,
                creator,
                previewImage: image,
            });
            return true;
        } else {
            throw new GraphQLError("User don't exist!");
        }
    }

    @Query(() => [Event])
    @UseMiddleware(isAuth())
    async myCreatedEvents(@Ctx() {currentUser}: MyContext): Promise<Event[]> {
        if (currentUser?.username) {
            const events = await Event.find({
                where: {creator: {username: currentUser.username}},
                relations: {
                    attendees: true,
                    categories: true,
                    creator: {
                        profile: {
                            photos: true,
                        },
                    },
                    previewImage: true,
                },
            });
            return events;
        } else {
            throw new GraphQLError("User don't exist!");
        }
    }
}
