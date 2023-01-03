import {useMemo, useState} from 'react';

import {useRouter} from 'next/router';
import {CreateUserInput, useRegisterMutation} from 'src/generated/graphql';
import Text from '@components/common/typography/text';
import Layout from '@components/layout';
import GridLayout from '@components/common/gridLayout';
import Container from '@components/common/container';
import Title from '@components/common/typography/title';
import Form from '@components/common/form';
import Button from '@components/common/button';
import Image from 'next/image';
import Input from '@components/common/input';
import {useHandleErrors} from 'src/hooks/errors';
import {setAccessToken} from 'src/utils/accessToken';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerMutation, {error, loading}] = useRegisterMutation();
    const router = useRouter();

    const errors = useHandleErrors(error);

    return (
        <Form
            onSubmit={async () => {
                try {
                    const repsonce = await registerMutation({
                        variables: {input: {email, password, username}},
                    });

                    if (repsonce.data?.register.accessToken) {
                        setAccessToken(repsonce.data?.register.accessToken);
                        router.push('/account-creation');
                    }
                } catch (err) {
                    console.error(err);
                }
            }}>
            <Layout alt>
                <GridLayout alt className="z-1 relative">
                    <Container className="col-span-5">
                        <Title level="h3">Create account</Title>
                        <Text className="mt-5">
                            First you need to fill out information about you
                        </Text>
                        <Container className="mt-16">
                            <Input
                                className="mb-4 w-full"
                                label="Email"
                                placeholder="Email"
                                value={email}
                                onChange={setEmail}
                                error={errors.email}
                            />
                            <Input
                                className="mb-4 w-full"
                                label="username"
                                placeholder="@username"
                                name="username"
                                value={username}
                                onChange={setUsername}
                                error={errors.username}
                            />
                            <Input
                                className="mb-4 w-full"
                                label="Password"
                                placeholder="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                                error={errors.password}
                            />
                        </Container>
                    </Container>
                </GridLayout>
                <GridLayout>
                    <Container className="col-span-2 col-start-7 self-end">
                        <Button submit>Continue</Button>
                    </Container>
                </GridLayout>
                <Container className="w-[40%] max-w-[500px] h-1/2 absolute left-[60%] top-[25%] z-0">
                    <Image
                        src="/images/welcome-image-1.png"
                        quality={100}
                        layout="fill"
                        objectFit="cover"
                    />
                </Container>
            </Layout>
        </Form>
    );
};

export default SignUpPage;
