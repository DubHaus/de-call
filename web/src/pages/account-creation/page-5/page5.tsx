import {useRouter} from 'next/router';
import {
    useGetCurrentUserQuery,
    useGetDraftProfileQuery,
} from 'src/generated/graphql';
import Text from '@components/common/typography/text';
import Layout from '@components/layout';
import GridLayout from '@components/common/gridLayout';
import Container from '@components/common/container';
import Title from '@components/common/typography/title';
import Button from '@components/common/button';
import ProfilePreview from 'src/widgets/profilePreview';
import Link from '@components/common/typography/link';

const Page5 = () => {
    const router = useRouter();

    const {data: profileData} = useGetDraftProfileQuery({
        fetchPolicy: 'network-only',
    });
    const {data: userData} = useGetCurrentUserQuery();

    return (
        <Layout alt>
            <GridLayout alt>
                <Container className="col-span-6">
                    <Title className="" level="h3">
                        Create account
                    </Title>
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
                    <Text size="lg">
                        Congradulation! 🥳 <b />
                        Best conversations await you!
                    </Text>
                    <Container className="mt-16">
                        <Text>
                            You can start your jorney with{' '}
                            <Link href="/explore">Explore Page</Link> - there
                            you can catch up with acitivites that’s happening
                            with your friends and others and join to them. <b />
                            Or you can add your friends in{' '}
                            <Link href="/friends">Friends Page</Link>
                        </Text>
                    </Container>
                </Container>
                <Container className="col-start-8 col-span-6">
                    <ProfilePreview
                        {...profileData?.draftProfile}
                        username={userData?.user.username}
                    />
                </Container>
            </GridLayout>
            <GridLayout alt>
                <Container className="col-span-6 justify-self-end">
                    <Button
                        href="/account-creation/page-4"
                        className="mr-5"
                        type="secondary">
                        Back
                    </Button>
                    <Button>Continue</Button>
                </Container>
            </GridLayout>
        </Layout>
    );
};

export default Page5;
