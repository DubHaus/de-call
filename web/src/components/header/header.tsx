import Loader from '@components/common/loader';
import Title from '@components/common/typography/title';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import {useGetIsLoggedInQuery} from 'src/generated/graphql';
import Login from './components/login';
import Logout from './components/logout';
import styles from './header.module.scss';

type Props = {
    className?: string;
    title?: string;
};

const Header = ({className, title}: Props) => {
    const {data, loading} = useGetIsLoggedInQuery({
        fetchPolicy: 'network-only',
    });
    return (
        <Container className={`px-5 py-3 bg-slate-50/50 ${className}`}>
            <Flex justify="between">
                <Title level="h3">{title}</Title>
                <Loader loading={loading}>
                    <Container className={styles.login}>
                        {data?.isLoggedIn ? <Logout /> : <Login />}
                    </Container>
                </Loader>
            </Flex>
        </Container>
    );
};

export default Header;
