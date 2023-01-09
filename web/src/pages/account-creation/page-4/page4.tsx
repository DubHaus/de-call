import {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {
    useCreateProfileMutation,
    useGetCurrentUserQuery,
    useGetDraftProfileQuery,
    useUpdateDraftProfileMutation,
    useUploadPhotoMutation,
} from 'src/generated/graphql';
import Text from '@components/common/typography/text';
import Layout from '@components/layout';
import GridLayout from '@components/common/gridLayout';
import Container from '@components/common/container';
import Title from '@components/common/typography/title';
import Button from '@components/common/button';
import ImageInput from '@components/common/imageInput';
import ProfilePreview from 'src/widgets/profilePreview';

const Page4 = () => {
    const [picture, setPicture] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const loadPhoto = (file: File) => {
        const objectUrl = URL.createObjectURL(file);
        setPicture(objectUrl);
        setFile(file);
    };

    const router = useRouter();

    const {data: profileData} = useGetDraftProfileQuery({
        fetchPolicy: 'network-only',
    });
    const {data: userData} = useGetCurrentUserQuery();

    useEffect(() => {
        profileData?.draftProfile.profilePhoto &&
            setPicture(profileData?.draftProfile.profilePhoto.location);
    }, [profileData?.draftProfile]);

    const [uploadPhoto] = useUploadPhotoMutation();
    const [uploadDraft] = useUpdateDraftProfileMutation();
    const [createProfile] = useCreateProfileMutation();

    const createAccount = useMemo(
        () => async () => {
            if (file) {
                const {data} = await uploadPhoto({
                    variables: {input: {description: file.name, file}},
                });
                const path = data?.uploadPhoto;
                if (path) {
                    await uploadDraft({variables: {input: {photo: path}}});
                    await createProfile();
                    router.push('/account-creation/page-5');
                }
            } else {
                await createProfile();
                router.push('/account-creation/page-5');
            }
        },
        [file]
    );

    return (
        <Layout alt>
            <GridLayout alt>
                <Container className="col-span-6">
                    <Title level="h3">Create account</Title>
                    <Container className="mt-5">
                        <Text>4 of 4</Text>
                        <span className="w-full h-[7px] bg-emerald-500 block">
                            <span className="w-full bg-indigo-500 block h-full"></span>
                        </span>
                    </Container>
                </Container>
            </GridLayout>
            <GridLayout alt>
                <Container className="col-span-6">
                    <Text>
                        Great! Lastly, you need to add some photos. Don’t worry
                        you can change it or add new ones later
                    </Text>
                    <Container className="mt-16">
                        <ImageInput
                            preview
                            value={picture}
                            onChange={loadPhoto}
                        />
                    </Container>
                </Container>
                <Container className="col-start-8 col-span-6">
                    <ProfilePreview
                        {...profileData?.draftProfile}
                        profilePhoto={picture ? {location: picture} : undefined}
                        username={userData?.user.username}
                    />
                </Container>
            </GridLayout>
            <GridLayout alt className="">
                <Container className="col-span-6 justify-self-end">
                    <Button
                        href="/account-creation/page-3"
                        className="mr-5"
                        type="secondary">
                        Back
                    </Button>
                    <Button onClick={createAccount}>Continue</Button>
                </Container>
            </GridLayout>
        </Layout>
    );
};

export default Page4;
