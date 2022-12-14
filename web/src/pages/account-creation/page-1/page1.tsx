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

const Page1 = () => {
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [register] = useRegisterMutation();
    const router = useRouter();

    return (
        <Layout alt>
            <GridLayout alt className="z-1 relative">
                <Container className="col-span-5">
                    <Title className="" level="h3">
                        Create account
                    </Title>
                    <Container className="mt-5">
                        <Text>1 of 3</Text>
                        <span className="w-full h-[7px] bg-emerald-500 block">
                            <span className="w-1/3 bg-indigo-500 block h-full"></span>
                        </span>
                    </Container>
                    <Text className="mt-10">
                        <strong>Congradulation!</strong> You have created
                        account. Now you need to complete your profile.
                        <br />
                        <br />
                        First, what is your name?
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
                            label="First name"
                            placeholder="First name"
                        />
                        <Input
                            className="w-full"
                            label="Surname"
                            placeholder="Surname"
                        />
                    </Form>
                </Container>
            </GridLayout>
            <GridLayout>
                <Container className="col-span-4 col-start-5 self-end">
                    <Button className="mr-5" type="secondary">
                        Back
                    </Button>
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

export default Page1;
