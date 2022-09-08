import {useState} from 'react';
import {useMutation} from 'react-query';

import {Register} from 'api';

import Checkbox from 'components/common/checkbox';
import Flex from 'components/common/flex';
import Input from 'components/common/input';
import Caption from 'components/common/typography/caption';
import Link from 'components/common/typography/link';
import Title from 'components/common/typography/title';
import Layout from 'components/layout';
import styles from './signUp.module.scss';
import Container from 'components/common/container';
import Button from 'components/common/button';
import Form from 'components/common/form';
import {CreateUserInput} from 'generated/graphql';
import {useRouter} from 'next/router';

const SignUpPage = () => {
    const [terms, setTerms] = useState(false);
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutation('register', (input: CreateUserInput) =>
        Register({input})
    );
    const router = useRouter();

    return (
        <Layout>
            <Title className={styles.title} level="h2">
                Sign up
            </Title>
            <Form
                onSubmit={async () => {
                    const repsonce = await mutation.mutateAsync({
                        email,
                        firstName,
                        password,
                    });
                    if (repsonce.register) router.push('/'); // TODO create error handler
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
