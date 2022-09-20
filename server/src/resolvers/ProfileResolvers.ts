import {User} from '../entity/User';
import {Profile} from '../entity/Profile';
import {Arg, Ctx, Mutation, Resolver, UseMiddleware} from 'type-graphql';
import {GraphQLError} from 'graphql';

import {CreateProfileInput} from './types/profile';
import {isAuth} from '../middleware/isAuth';
import {MyContext} from '../ts-types/context';
import {Socials} from '../entity/Socials';
import {Category} from '../entity/catalogs/Category';
import {UserInputError} from 'apollo-server-express';

@Resolver(() => Profile)
export class ProfileResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createProfile(
        @Arg('input') {bio, socials, categories}: CreateProfileInput,
        @Ctx() {currentUser}: MyContext
    ): Promise<Boolean | null> {
        const user = await User.findOne({where: {id: currentUser?.userId}});
        if (user) {
            if (!user.profile) {
                const profile = new Profile();
                profile.bio = bio;

                if (categories.length) {
                    const categoryEnitities = await Category.find({
                        where: categories.map(id => ({id})),
                    });
                    profile.categories = categoryEnitities;
                } else {
                    throw new UserInputError(
                        'Categories are empty. Need to specify at least one'
                    );
                }

                const socialsEntity = new Socials();
                socialsEntity.github = socials.github;
                socialsEntity.instagramm = socials.instagramm;
                socialsEntity.twitter = socials.twitter;
                await Socials.save(socialsEntity);

                profile.socials = socialsEntity;
                await Profile.save(profile);

                user.profile = profile;
                await User.save(user);

                return true;
            } else {
                throw new GraphQLError('User profile already created');
            }
        } else {
            throw new GraphQLError('User does not exist');
        }
    }
}
