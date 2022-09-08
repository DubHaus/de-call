import Flex from 'components/common/flex';
import Input from 'components/common/input';
import Link from 'components/common/typography/link';
import Title from 'components/common/typography/title';
import Layout from 'components/layout';
import styles from './login.module.scss';
import Container from 'components/common/container';
import Button from 'components/common/button';
import {useState} from 'react';
import Form from 'components/common/form';
import {useMutation} from 'react-query';
import {Login} from 'api';
import {LoginUserInput} from 'generated/graphql';
import {useRouter} from 'next/router';
import {setAccessToken} from 'utils/accessToken';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useMutation(
        'login',
        (input: LoginUserInput) => Login({input}),
        {}
    );
    const router = useRouter();

    return (
        <Layout>
            <Title className={styles.title} level="h2">
                Login
            </Title>
            <Form
                onSubmit={async () => {
                    const repsonce = await loginMutation.mutateAsync({
                        email,
                        password,
                    });
                    if (repsonce.login.accessToken) {
                        setAccessToken(repsonce.login.accessToken);
                        router.push('/'); // TODO create error handler
                    }
                }}>
                <Container>
                    <Input
                        className={`${styles.input} ${styles.userName}`}
                        placeholder="email"
                        onChange={setEmail}
                        value={email}
                        name="email"
                    />
                    <Input
                        className={`${styles.input} ${styles.password}`}
                        placeholder="Password"
                        onChange={setPassword}
                        value={password}
                        type="password"
                        name="password"
                    />
                </Container>

                <Flex gap={20}>
                    <Button submit type="secondary">
                        Login
                    </Button>
                    <Link>Forgot password</Link>
                </Flex>
            </Form>
        </Layout>
    );
};

export default LoginPage;
