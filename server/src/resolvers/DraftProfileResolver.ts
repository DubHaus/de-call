import {User} from '../entity/User';
import {DraftProfile} from '../entity/DraftProfile';
import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware} from 'type-graphql';
import {GraphQLError} from 'graphql';

import {DraftProfileInput} from './types/profile';
import {isAuth} from '../middleware/isAuth';
import {MyContext} from '../ts-types/context';
import {Category} from '../entity/catalogs/Category';
import {Language} from '../entity/catalogs/Language';
import {Photo} from '../entity/Photo';
import {deleteFile} from '../utils/file';

@Resolver(() => DraftProfile)
export class DraftProfileResolver {
    @Query(() => DraftProfile)
    @UseMiddleware(isAuth())
    async draftProfile(
        @Ctx() {currentUser}: MyContext
    ): Promise<DraftProfile | void> {
        const user = await User.findOne({
            where: {username: currentUser?.username},
            relations: {
                draftProfile: {
                    languages: true,
                    interests: true,
                    profilePhoto: true,
                },
            },
        });

        if (user) {
            return user.draftProfile;
        } else {
            throw new GraphQLError("User don't exist!");
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth())
    async updateDraftProfile(
        @Arg('input')
        {
            firstName,
            lastName,
            bio,
            interests,
            languages,
            photo,
        }: DraftProfileInput,
        @Ctx() {currentUser}: MyContext
    ): Promise<Boolean> {
        const user = await User.findOne({
            where: {username: currentUser?.username},
            relations: {draftProfile: {profilePhoto: true}},
        });

        if (user) {
            const draftProfile = user.draftProfile || new DraftProfile();

            if (firstName) {
                draftProfile.firstName = firstName;
            }
            if (lastName) {
                draftProfile.lastName = lastName;
            }
            if (bio) {
                draftProfile.bio = bio;
            }

            if (languages && languages.length) {
                const foundLanguages = await Language.find({
                    where: languages.map(({value}) => ({value})),
                });
                draftProfile.languages = foundLanguages;
            }
            if (interests && interests.length) {
                const categoryEnitities = await Category.find({
                    where: interests.map(({value}) => ({value})),
                });
                draftProfile.interests = categoryEnitities;
            }

            if (photo) {
                const newPhotoEntity = await Photo.findOne({
                    where: {location: photo},
                });
                
                if (newPhotoEntity) {
                    if (
                        draftProfile.profilePhoto &&
                        draftProfile.profilePhoto !== newPhotoEntity
                    ) {
                        const photoToDelete = draftProfile.profilePhoto;
                        try {
                            await deleteFile(
                                draftProfile.profilePhoto.localPath
                            );
                            await DraftProfile.save(draftProfile);
                            await Photo.remove(draftProfile.profilePhoto);
                            draftProfile.profilePhoto = newPhotoEntity;
                        } catch (err) {
                            console.error(err);
                            throw new GraphQLError(
                                `Couldn't delete file ${photoToDelete.location}`
                            );
                        }
                    } else {
                        draftProfile.profilePhoto = newPhotoEntity;
                    }
                } else {
                    throw new GraphQLError("Photo don't exist");
                }
            }

            await DraftProfile.save(draftProfile);
            user.draftProfile = draftProfile;

            await User.save(user);
            return true;
        } else {
            throw new GraphQLError("User don't exist!");
        }
    }
}
