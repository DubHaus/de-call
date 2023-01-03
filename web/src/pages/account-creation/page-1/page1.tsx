import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Text from '@components/common/typography/text';
import Layout from '@components/layout';
import GridLayout from '@components/common/gridLayout';
import Container from '@components/common/container';
import Title from '@components/common/typography/title';
import Form from '@components/common/form';
import Button from '@components/common/button';
import Input from '@components/common/input';
import {
    useGetCurrentUserQuery,
    useGetDraftProfileQuery,
    useUpdateDraftProfileMutation,
} from 'src/generated/graphql';
import {useHandleErrors} from 'src/hooks/errors';
import ProfilePreview from 'src/widgets/profilePreview';

const Page1 = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const {data: profileData} = useGetDraftProfileQuery({
        fetchPolicy: 'network-only',
    });
    const {data: userData} = useGetCurrentUserQuery();

    const [updateDraft, {loading, error}] = useUpdateDraftProfileMutation();

    const errors = useHandleErrors(error);

    const router = useRouter();

    useEffect(() => {
        profileData?.draftProfile.firstName &&
            setFirstName(profileData?.draftProfile.firstName);
        profileData?.draftProfile.lastName &&
            setLastName(profileData?.draftProfile.lastName);
    }, [profileData]);

    return (
        <Form
            onSubmit={async () => {
                try {
                    const repsonce = await updateDraft({
                        variables: {
                            input: {firstName, lastName},
                        },
                    });

                    if (repsonce.data?.updateDraftProfile) {
                        router.push('/account-creation/page-2');
                    }
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
                            <Text>1 of 4</Text>
                            <span className="w-full h-[7px] bg-emerald-500 block">
                                <span className="w-[25%] bg-indigo-500 block h-full"></span>
                            </span>
                        </Container>
                    </Container>
                </GridLayout>
                <GridLayout alt>
                    <Container className="col-span-6">
                        <Text>
                            <strong>Congradulation!</strong> You have created
                            account. Now you need to complete your profile.
                            <br />
                            <br />
                            First, what is your name?
                        </Text>
                        <Container className="mt-16">
                            <Input
                                className="mb-4 w-full"
                                label="First name"
                                placeholder="First name"
                                name="firstName"
                                value={firstName}
                                onChange={setFirstName}
                                error={errors.firstName}
                            />
                            <Input
                                className="w-full"
                                label="Last name"
                                placeholder="Last name"
                                name="lastName"
                                value={lastName}
                                onChange={setLastName}
                                error={errors.lastName}
                            />
                        </Container>
                    </Container>
                    <Container className="col-start-8 col-span-6">
                        <ProfilePreview
                            {...profileData?.draftProfile}
                            firstName={firstName}
                            lastName={lastName}
                            username={userData?.user.username}
                        />
                    </Container>
                </GridLayout>
                <GridLayout alt>
                    <Container className="col-span-6 justify-self-end">
                        <Button disabled={loading} submit>
                            Continue
                        </Button>
                    </Container>
                </GridLayout>
            </Layout>
        </Form>
    );
};

export default Page1;
