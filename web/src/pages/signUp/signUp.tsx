import {useState} from 'react';

import Checkbox from 'src/components/common/checkbox';
import Flex from 'src/components/common/flex';
import Input from 'src/components/common/input';
import Caption from 'src/components/common/typography/caption';
import Link from 'src/components/common/typography/link';
import Title from 'src/components/common/typography/title';
import Layout from 'src/components/layout';
import styles from './signUp.module.scss';
import Container from 'src/components/common/container';
import Button from 'src/components/common/button';
import Form from 'src/components/common/form';
import {CreateUserInput, useRegisterMutation} from 'generated/graphql';
import {useRouter} from 'next/router';

const SignUpPage = () => {
    const [terms, setTerms] = useState(false);
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [register] = useRegisterMutation();
    const router = useRouter();

    return (
        <Layout>
            <Title className={styles.title} level="h2">
                Sign up
            </Title>
            <Form
                onSubmit={async () => {
                    const responce = await register({
                        variables: {input: {email, firstName, password}},
                    });
                    if (responce.data?.register) router.push('/'); // TODO create error handler
                }}>
                <Container>
                    <Flex gap={20}>
                        <Input
                            className={`${styles.input} ${styles.name}`}
                            placeholder="Name"
                            value={name}
                            onChange={setName}
                            name="name"
                        />
                        <Input
                            className={`${styles.input} ${styles.userName}`}
                            placeholder="Username"
                            value={firstName}
                            onChange={setFirstName}
                            name="username"
                        />
                    </Flex>
                    <Input
                        className={`${styles.input} ${styles.email}`}
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                        name="email"
                    />
                    <Input
                        className={`${styles.input} ${styles.password}`}
                        placeholder="Password"
                        value={password}
                        onChange={setPassword}
                        name="password"
                        type="password"
                    />

                    <Checkbox
                        className={`${styles.input} ${styles.checkbox}`}
                        onChange={setTerms}
                        value={terms}>
                        <Caption>
                            Creating an account means you’re okay with our{' '}
                            <Link>Terms of Service </Link>,{' '}
                            <Link>Privacy Policy</Link>, and our default
                            Notification Settings.
                        </Caption>
                    </Checkbox>
                </Container>
                <Button submit type="secondary">
                    Create account
                </Button>
            </Form>
        </Layout>
    );
};

export default SignUpPage;
