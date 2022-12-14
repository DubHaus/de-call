import Image from 'next/image';
import Button from 'src/components/common/button';
import Container from 'src/components/common/container';
import GridLayout from 'src/components/common/gridLayout';
import Text from 'src/components/common/typography/text';
import Title from 'src/components/common/typography/title';
import Layout from 'src/components/layout';

const WelcomePage = () => {
    return (
        <Layout alt>
            <GridLayout alt className="z-1 relative">
                <Container className="col-span-6">
                    <Title className="mt-[15vh]" level="h1">
                        TownSquare - calls and games
                    </Title>
                    <Text className="mt-5 w-[400px]">
                        Welcome to “TownSquare” - an ultimate place, where you
                        can hangout with your friends, colleges and find new
                        ones :D
                    </Text>
                    <Container className="mt-5 flex justify-end">
                        <Button className="mr-5" type="secondary">
                            Sign up
                        </Button>
                        <Button>Login</Button>
                    </Container>
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

export default WelcomePage;
