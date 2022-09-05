import Flex from 'components/common/flex';
import Input from 'components/common/input';
import Link from 'components/common/typography/link';
import Title from 'components/common/typography/title';
import Layout from 'components/layout';
import styles from './login.module.scss';
import Container from 'components/common/container';
import Button from 'components/common/button';

const Login = () => {
    return (
        <Layout>
            <Title className={styles.title} level="h2">
                Login
            </Title>
            <Container>
                <Input
                    className={`${styles.input} ${styles.userName}`}
                    placeholder="Username"
                />
                <Input
                    className={`${styles.input} ${styles.password}`}
                    placeholder="Password"
                />
            </Container>
            <Flex gap={20}>
                <Button type="secondary">Login</Button>
                <Link>Forgot password</Link>
            </Flex>
        </Layout>
    );
};

export default Login;
