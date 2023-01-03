import {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {
    Language,
    useGetCurrentUserQuery,
    useGetDraftProfileQuery,
    useGetLanguagesLazyQuery,
    useUpdateDraftProfileMutation,
} from 'src/generated/graphql';
import Text from '@components/common/typography/text';
import Layout from '@components/layout';
import GridLayout from '@components/common/gridLayout';
import Container from '@components/common/container';
import Title from '@components/common/typography/title';
import Form from '@components/common/form';
import Button from '@components/common/button';
import TextArea from '@components/common/textArea';
import Select from '@components/common/select';
import {useHandleErrors} from 'src/hooks/errors';
import ProfilePreview from 'src/widgets/profilePreview';
import {SelectOption} from '@components/common/select/components/option';

const Page2 = () => {
    const [bio, setBio] = useState<string | undefined>();
    const [languages, setLanguages] = useState<SelectOption[] | undefined>();

    const [fetch, {data: languageData, loading}] = useGetLanguagesLazyQuery();
    const {data: userData} = useGetCurrentUserQuery();
    const {data: profileData} = useGetDraftProfileQuery({
        fetchPolicy: 'network-only',
    });

    const [updateDraft, {loading: formLoading, error}] =
        useUpdateDraftProfileMutation();
    const router = useRouter();

    const errors = useHandleErrors(error);

    useEffect(() => {
        profileData?.draftProfile.bio && setBio(profileData?.draftProfile.bio);
        profileData?.draftProfile.languages &&
            setLanguages(
                profileData?.draftProfile.languages.map(({value, title}) => ({
                    value,
                    title,
                }))
            );
    }, [profileData?.draftProfile]);

    return (
        <Form
            onSubmit={async () => {
                try {
                    await updateDraft({
                        variables: {
                            input: {
                                bio,
                                languages,
                            },
                        },
                    });
                    router.push('/account-creation/page-3');
                } catch (err) {
                    console.error(err);
                }
            }}>
            <Layout alt>
                <GridLayout alt>
                    <Container className="col-span-6">
                        <Title className="" level="h3">
                            Create account
                        </Title>
                        <Container className="mt-5">
                            <Text>2 of 4</Text>
                            <span className="w-full h-[7px] bg-emerald-500 block">
                                <span className="w-[50%] bg-indigo-500 block h-full"></span>
                            </span>
                        </Container>
                    </Container>
                </GridLayout>
                <GridLayout alt>
                    <Container className="col-span-6">
                        <Text>
                            Welcome Yura! Now you need to add bio - tell about
                            yourself in a couple of sentences. Don’t worry you
                            can always change it later
                        </Text>
                        <Container className="mt-16">
                            <TextArea
                                placeholder="Your bio - tell about yourself and your interests"
                                label="Bio"
                                value={bio}
                                onChange={setBio}
                                name="bio"
                                error={errors.bio}
                            />
                            <Select
                                className="mt-5"
                                placeholder="Languages"
                                label="Languages"
                                name="languages"
                                value={languages}
                                multiple
                                onChange={setLanguages}
                                fetch={fetch}
                                options={languageData?.languages.map(
                                    ({title, value}) => ({title, value})
                                )}
                                loading={loading}
                                error={errors.languages}
                            />
                        </Container>
                    </Container>
                    <Container className="col-start-8 col-span-6">
                        <ProfilePreview
                            {...profileData?.draftProfile}
                            bio={bio}
                            languages={languages}
                            username={userData?.user.username}
                        />
                    </Container>
                </GridLayout>
                <GridLayout alt>
                    <Container className="col-span-6 justify-self-end">
                        <Button
                            href="/account-creation/page-1"
                            disabled={formLoading}
                            className="mr-5"
                            type="secondary">
                            Back
                        </Button>
                        <Button disabled={formLoading} submit>
                            Continue
                        </Button>
                    </Container>
                </GridLayout>
            </Layout>
        </Form>
    );
};

export default Page2;
