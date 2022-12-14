import {useState} from 'react';

import {useRouter} from 'next/router';
import {useRegisterMutation} from 'src/generated/graphql';
import Text from '@components/common/typography/text';
import Layout from '@components/layout';
import GridLayout from '@components/common/gridLayout';
import Container from '@components/common/container';
import Title from '@components/common/typography/title';
import Form from '@components/common/form';
import Button from '@components/common/button';
import Image from 'next/image';
import Input from '@components/common/input';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    const [register] = useRegisterMutation();
    const router = useRouter();

    return (
        <Layout alt>
            <GridLayout alt className="z-1 relative">
                <Container className="col-span-5">
                    <Title className="" level="h3">
                        Create account
                    </Title>
                    <Text className="mt-5">
                        First you need to fill out information about you
                    </Text>
                    <Form
                        className="mt-16"
                        onSubmit={async () => {
                            const responce = await register({
                                variables: {
                                    input: {email, password, username},
                                },
                            });
                            if (responce.data?.register) router.push('/'); // TODO create error handler
                        }}>
                        <Input
                            className="mb-4 w-full"
                            label="Email"
                            placeholder="Email"
                            value={email}
                            onChange={setEmail}
                        />
                        <Input
                            className="mb-4 w-full"
                            label="username"
                            placeholder="@username"
                            value={username}
                            onChange={setUsername}
                        />
                        <Input
                            className="mb-4 w-full"
                            label="Password"
                            placeholder="password"
                            value={password}
                            onChange={setPassword}
                            type="password"
                        />
                        <Input
                            className="w-full"
                            label="Password"
                            placeholder="repeat password"
                            value={repeat}
                            onChange={setRepeat}
                            type="password"
                        />
                    </Form>
                </Container>
            </GridLayout>
            <GridLayout>
                <Container className="col-span-2 col-start-7 self-end">
                    <Button>Continue</Button>
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
    );
};

export default SignUpPage;
