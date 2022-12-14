import {useState} from 'react';
import {useRouter} from 'next/router';
import {useRegisterMutation} from 'src/generated/graphql';
import Text from '@components/common/typography/text';
import Layout from '@components/layout';
import GridLayout from '@components/common/gridLayout';
import Container from '@components/common/container';
import Title from '@components/common/typography/title';
import Button from '@components/common/button';
import Image from 'next/image';
import FileInput from '@components/common/fileInput';

const FinishPage = () => {
    return (
        <Layout alt>
            <GridLayout alt className="z-1 relative">
                <Container className="col-span-6">
                    <Title className="" level="h3">
                        Create account
                    </Title>
                    <Container className="mt-5">
                        <Text>3 of 3</Text>
                        <span className="w-full h-[7px] bg-emerald-500 block">
                            <span className="w-full bg-indigo-500 block h-full"></span>
                        </span>
                    </Container>
                    <Text size="lg" className="mt-10">
                        Congradulation! 🥳 <br />
                        Best conversations await you!
                    </Text>
                    <Text className="mt-16">
                        You can start your jorney with Explore Page - there you
                        can catch up with acitivites that’s happening with your
                        friends and others and join to them. <br />
                        Or you can add your friends in Friends Page
                    </Text>
                </Container>
            </GridLayout>
            <GridLayout>
                <Container className="col-span-7 col-start-1 justify-self-end">
                    <Button className="mr-5" type="secondary">
                        Close
                    </Button>
                    <Button className="mr-5">Explore</Button>
                    <Button>Friends</Button>
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

export default FinishPage;
