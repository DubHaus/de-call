import {User} from '../entity/User';
import {Profile} from '../entity/Profile';
import {Ctx, Mutation, Resolver, UseMiddleware} from 'type-graphql';
import {GraphQLError} from 'graphql';

import {isAuth} from '../middleware/isAuth';
import {MyContext} from '../ts-types/context';

@Resolver(() => Profile)
export class ProfileResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth())
    async createProfile(
        @Ctx()
        {currentUser}: MyContext
    ): Promise<Boolean> {
        const user = await User.findOne({
            where: {username: currentUser?.username},
            relations: {
                draftProfile: {
                    interests: true,
                    languages: true,
                    profilePhoto: true,
                },
            },
        });

        if (user) {
            const draft = user.draftProfile;
            if (draft) {
                if (!user.profile) {
                    user.profile = new Profile();
                }
                user.profile.firstName = draft.firstName;
                user.profile.lastName = draft.lastName;
                if (draft.bio) {
                    user.profile.bio = draft.bio;
                }
                if (draft.interests) {
                    user.profile.interests = draft.interests;
                } else throw new GraphQLError('Interests should be filled');
                if (draft.languages) {
                    user.profile.languages = draft.languages;
                } else throw new GraphQLError('Languages should be filled');
                if (draft.profilePhoto) {
                    user.profile.profilePhoto = draft.profilePhoto;
                    user.profile.photos = [
                        draft.profilePhoto,
                        ...(user.profile.photos || []),
                    ];
                } else {
                    user.profile.photos = [];
                }

                await Profile.save(user.profile);
                await User.save(user);
                return true;
            } else throw new GraphQLError('Need to create draft first');
        } else {
            throw new GraphQLError("User don't exist!");
        }
    }
}
