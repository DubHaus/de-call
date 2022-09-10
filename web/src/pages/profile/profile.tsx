import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Loader from 'src/components/common/loader';
import Caption from 'src/components/common/typography/caption';
import Text from 'src/components/common/typography/text';
import {useGetCurrentUserQuery} from 'generated/graphql';

const ProfilePage = () => {
    const {data, error, loading} = useGetCurrentUserQuery({
        fetchPolicy: 'network-only',
    });

    if (error) console.log(error);

    return (
        <Loader loading={loading}>
            <Container>
                <Flex gap={20}>
                    <Caption>First Name</Caption>
                    <Text>{data?.user.firstName}</Text>
                </Flex>
                <Flex gap={20}>
                    <Caption>Email</Caption>
                    <Text>{data?.user.email}</Text>
                </Flex>
                <Flex gap={20}>
                    <Caption>Last Name</Caption>
                    <Text>{data?.user.lastName}</Text>
                </Flex>
            </Container>
        </Loader>
    );
};

export default ProfilePage;
