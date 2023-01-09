import Card from '@components/card';
import Button from '@components/common/button';
import Chip from '@components/common/chip';
import Container from '@components/common/container';
import GridLayout from '@components/common/gridLayout';
import Icon from '@components/common/icon';
import Loader from '@components/common/loader';
import Text from '@components/common/typography/text';
import Title from '@components/common/typography/title';
import Layout from '@components/layout';
import {useMyCreatedEventsQuery} from 'src/generated/graphql';
import {useShowHide} from 'src/hooks/common';
import {getTimeForEvent} from 'src/utils/date';
import CreateActivityModal from 'src/widgets/createActivityModal';
import iconsToCategories from '../account-creation/page-3/iconsToCategoriesMap';

const Activities = () => {
    const [show, open, close] = useShowHide();
    const {loading, error, data} = useMyCreatedEventsQuery();
    return (
        <Layout title="Activities">
            <GridLayout>
                <Container className="col-span-12">
                    <Container className="flex items-center justify-between">
                        <Title level="h4">Your planned activities</Title>
                        <Button type="ghost">See all</Button>
                    </Container>
                    <Container className="flex items-center mt-2">
                        <Chip selected size="sm" className="mr-3">
                            Today
                        </Chip>
                        <Chip size="sm" className="mr-3">
                            Tomorrow
                        </Chip>
                        <Chip size="sm" className="mr-3">
                            This weekend
                        </Chip>
                        <Chip size="sm" className="mr-3">
                            <Icon size="xs" icon="calendar" />
                        </Chip>
                    </Container>
                </Container>
                <Container className="col-span-5">
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
                <Container className="col-span-5 col-start-7">
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
            <GridLayout>
                <Container className="col-span-5 mt-10 mb-10">
                    <Container className="flex items-center justify-between">
                        <Title level="h4">Your activities</Title>
                        <Button
                            onClick={() => open()}
                            size="sm"
                            icon="plus"
                            type="primary"
                        />
                    </Container>
                </Container>
                <Container className="col-span-7" />
                <Loader loading={loading}>
                    {data?.myCreatedEvents?.length ? (
                        data.myCreatedEvents.map(
                            ({
                                title,
                                attendees,
                                categories,
                                date,
                                description,
                                id,
                                previewImage,
                            }) => (
                                <>
                                    <Container className="col-span-5">
                                        <Card
                                            title={title}
                                            top={
                                                <Container className=" mb-4 flex justify-between">
                                                    <Container className="flex">
                                                        <Text
                                                            bold
                                                            className="mr-2">
                                                            {getTimeForEvent(
                                                                date
                                                            )}
                                                            <span className="text-indigo-500"></span>
                                                        </Text>
                                                        {categories.map(el => (
                                                            <Icon
                                                                icon={
                                                                    iconsToCategories[
                                                                        el.value
                                                                    ]
                                                                }
                                                                className="text-indigo-500"
                                                                onClick={() =>
                                                                    open()
                                                                }
                                                            />
                                                        ))}
                                                    </Container>
                                                </Container>
                                            }
                                            description={description}
                                            actions={
                                                <>
                                                    <Button type="secondary">
                                                        Hide
                                                    </Button>
                                                    <Button type="primary">
                                                        Join the lesson
                                                    </Button>
                                                </>
                                            }
                                            previewUrl={previewImage?.location}>
                                            <Text className="mt-4" size="sm">
                                                Allie and John and{' '}
                                                {attendees.length} other people
                                                will be there
                                            </Text>
                                        </Card>
                                    </Container>
                                    <Container className="col-span-1" />
                                </>
                            )
                        )
                    ) : (
                        <Container>
                            <Text className="mt-10">
                                For now you haven’t created no events <br />
                                Try creating your first one and invite your
                                friends to it or make it public
                            </Text>
                            <Button className="mt-5" icon="plus">
                                Add event
                            </Button>
                        </Container>
                    )}
                </Loader>
            </GridLayout>
            {show ? <CreateActivityModal close={close} /> : null}
        </Layout>
    );
};

export default Activities;
