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
import FileInput from '@components/common/fileInput';

const Page3 = () => {
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
                        <Text>3 of 3</Text>
                        <span className="w-full h-[7px] bg-emerald-500 block">
                            <span className="w-full bg-indigo-500 block h-full"></span>
                        </span>
                    </Container>
                    <Text className="mt-10">
                        Great! Lastly, you need to add some photos. Don’t worry
                        you can change it or add new ones later
                    </Text>
                    <Container className='mt-16' >
                        <FileInput />
                    </Container>
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

export default Page3;
