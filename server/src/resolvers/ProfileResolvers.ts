import {User} from '../entity/User';
import {Profile} from '../entity/Profile';
import {Arg, Ctx, Mutation, Resolver, UseMiddleware} from 'type-graphql';
import {GraphQLError} from 'graphql';

import {CreateProfileInput} from './types/profile';
import {isAuth} from '../middleware/isAuth';
import {MyContext} from '../ts-types/context';
import {Category} from '../entity/catalogs/Category';

@Resolver(() => Profile)
export class ProfileResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createProfile(
        @Arg('input') {bio, interests, firstName, lastName}: CreateProfileInput,
        @Ctx() {currentUser}: MyContext
    ): Promise<Boolean | null> {
        const user = await User.findOne({
            where: {username: currentUser?.username},
        });
        if (user) {
            if (!user.profile) {
                const profile = new Profile();
                profile.bio = bio;
                profile.firstName = firstName;
                profile.lastName = lastName;

                if (interests.length) {
                    const categoryEnitities = await Category.find({
                        where: interests.map(id => ({id})),
                    });
                    profile.interests = categoryEnitities;
                }
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
