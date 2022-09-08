import {getCurrentUser} from 'api';
import Container from 'components/common/container';
import Flex from 'components/common/flex';
import Loader from 'components/common/loader';
import Caption from 'components/common/typography/caption';
import Text from 'components/common/typography/text';
import {useQuery} from 'react-query';

const ProfilePage = () => {
    const {data, error, isLoading} = useQuery('user', () => getCurrentUser(), {
        cacheTime: 0,
    });

    if (error) console.log(error);

    return (
        <Loader loading={isLoading}>
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
