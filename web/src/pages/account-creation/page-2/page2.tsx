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
import TextArea from '@components/common/textArea';
import Select from '@components/common/select';

const Page2 = () => {
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
                        <Text>2 of 3</Text>
                        <span className="w-full h-[7px] bg-emerald-500 block">
                            <span className="w-2/3 bg-indigo-500 block h-full"></span>
                        </span>
                    </Container>
                    <Text className="mt-10">
                        Welcome Yura! Now you need to add bio - tell about
                        yourself in a couple of sentences. Don’t worry you can
                        always change it later
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
                        <TextArea
                            placeholder="Your bio - tell about yourself and your interests"
                            label="Bio"
                        />
                        <Select
                            className="mt-5"
                            placeholder="Your interests"
                            label="Your interests"
                            options={[
                                {title: 'Sport', value: 'sport'},
                                {title: 'Games', value: 'games'},
                                {title: 'Education', value: 'education'},
                                {title: 'Business', value: 'business'},
                            ]}
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

export default Page2;
