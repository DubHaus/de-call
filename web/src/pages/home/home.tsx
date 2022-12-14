import Card from 'src/components/card';
import Button from 'src/components/common/button';
import Container from 'src/components/common/container';
import GridLayout from 'src/components/common/gridLayout';
import Icon from 'src/components/common/icon';
import Text from 'src/components/common/typography/text';
import Title from 'src/components/common/typography/title';
import Layout from 'src/components/layout';

const HomePage = () => {
    return (
        <Layout title="Home page">
            <GridLayout>
                <Container className="col-span-5">
                    <Title level="h4">Your planned activities</Title>
                    <Text>
                        For now you don’t have any activities. You can add them
                        on “Explore” page
                    </Text>
                </Container>
                <Container className="col-span-5 col-start-7">
                    <Container className="flex items-center justify-between">
                        <Title level="h4">What’s your friends are up to</Title>
                        <Button type="ghost">See all</Button>
                    </Container>
                    <Card
                        title="Lesson on history of Mathematics"
                        top={
                            <Container className="mb-4 flex justify-between">
                                <Container className="flex">
                                    <Text bold className="mr-2">
                                        Today{' '}
                                        <span className="text-indigo-500">
                                            19:00
                                        </span>
                                    </Text>
                                    <Icon
                                        icon="science"
                                        className="fill-indigo-500"
                                    />
                                </Container>
                                <Text bold className="mr-2">
                                    Host:
                                    <span className="text-indigo-500">
                                        Timyr Green
                                    </span>
                                </Text>
                            </Container>
                        }
                        description="We will discuss where and how mathematics started and who
                        was first mathematician. As well we will try to understand
                        why people were needed math back in time"
                        actions={
                            <>
                                <Button type="secondary">Hide</Button>
                                <Button type="primary">Join the lesson</Button>
                            </>
                        }
                        previewUrl="/images/card-image-1.png">
                        <Text className="mt-4" size="sm">
                            Allie and John and 8 other people will be there
                        </Text>
                    </Card>
                </Container>
            </GridLayout>
        </Layout>
    );
};

export default HomePage;
