import Flex from 'src/components/common/flex';
import Input from 'src/components/common/input';
import Link from 'src/components/common/typography/link';
import Title from 'src/components/common/typography/title';
import Layout from 'src/components/layout';
import styles from './login.module.scss';
import Container from 'src/components/common/container';
import Button from 'src/components/common/button';
import {useState} from 'react';
import Form from 'src/components/common/form';
import {useLoginMutation} from 'generated/graphql';
import {useRouter} from 'next/router';
import {setAccessToken} from 'src/utils/accessToken';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginMutation] = useLoginMutation();
    const router = useRouter();

    return (
        <Layout>
            <Title className={styles.title} level="h2">
                Login
            </Title>
            <Form
                onSubmit={async () => {
                    const repsonce = await loginMutation({
                        variables: {input: {email, password}},
                    });
                    if (repsonce.data?.login.accessToken) {
                        setAccessToken(repsonce.data?.login.accessToken);
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
