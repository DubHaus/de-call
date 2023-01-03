import {useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {
    useGetCategoriesQuery,
    useGetCurrentUserQuery,
    useGetDraftProfileQuery,
    useUpdateDraftProfileMutation,
} from 'src/generated/graphql';
import Text from '@components/common/typography/text';
import Layout from '@components/layout';
import GridLayout from '@components/common/gridLayout';
import Container from '@components/common/container';
import Title from '@components/common/typography/title';
import Button from '@components/common/button';
import Chip from '@components/common/chip';
import iconsToCategories from './iconsToCategoriesMap';
import ProfilePreview from 'src/widgets/profilePreview';
import {IconType} from '@components/common/icon/icon';
import {SelectOption} from '@components/common/select/components/option';
import {useHandleErrors} from 'src/hooks/errors';

type TInterests = {icon: IconType} & SelectOption;

const Page3 = () => {
    const [interests, setInterests] = useState<string[]>([]);

    const {data: categoriesData} = useGetCategoriesQuery();

    const {data: profileData} = useGetDraftProfileQuery({
        fetchPolicy: 'network-only',
    });
    const {data: userData} = useGetCurrentUserQuery();

    const interestsList = useMemo<TInterests[]>(
        () =>
            categoriesData?.categories.map(({value, title}) => ({
                icon: iconsToCategories[value],
                value,
                title,
            })) || [],
        [categoriesData]
    );

    const updateInterests = (value: string) => {
        const idx = interests.findIndex(el => el === value);
        setInterests(
            idx !== -1
                ? [...interests.slice(0, idx), ...interests.slice(idx + 1)]
                : [...interests, value]
        );
    };

    const selectAll = () => {
        if (categoriesData?.categories) {
            categoriesData?.categories.length === interests.length
                ? setInterests([])
                : setInterests(categoriesData?.categories.map(el => el.value));
        }
    };

    const [mutation, {loading, error}] = useUpdateDraftProfileMutation();
    useHandleErrors(error);

    const router = useRouter();

    return (
        <Layout alt>
            <GridLayout alt>
                <Container className="col-span-6">
                    <Title className="" level="h3">
                        Create account
                    </Title>
                    <Container className="mt-5">
                        <Text>3 of 4</Text>
                        <span className="w-full h-[7px] bg-emerald-500 block">
                            <span className="w-[75%] bg-indigo-500 block h-full" />
                        </span>
                    </Container>
                </Container>
            </GridLayout>
            <GridLayout alt>
                <Container className="col-span-6">
                    <Text>
                        Now please add your interests or things you are
                        interested to talk about
                    </Text>
                    <Container className="mt-16">
                        <Container className="mb-3">
                            <Chip
                                selected={
                                    interestsList.length === interests.length
                                }
                                onClick={selectAll}
                                size="sm"
                                icon="filter">
                                All
                            </Chip>
                        </Container>
                        {interestsList?.map(({icon, value, title}) => (
                            <Chip
                                key={value}
                                onClick={() => updateInterests(value)}
                                selected={interests.includes(value)}
                                className="mr-2 mb-2"
                                icon={icon}>
                                {title}
                            </Chip>
                        ))}
                    </Container>
                </Container>
                <Container className="col-start-8 col-span-6">
                    <ProfilePreview
                        {...profileData?.draftProfile}
                        interests={interestsList.filter(el =>
                            interests.includes(el.value)
                        )}
                        username={userData?.user.username}
                    />
                </Container>
            </GridLayout>
            <GridLayout alt>
                <Container className="col-span-6 justify-self-end">
                    <Button
                        href="/account-creation/page-2"
                        className="mr-5"
                        type="secondary">
                        Back
                    </Button>
                    <Button
                        onClick={async () => {
                            try {
                                await mutation({
                                    variables: {
                                        input: {
                                            interests: interestsList
                                                .filter(el =>
                                                    interests.includes(el.value)
                                                )
                                                .map(({title, value}) => ({
                                                    title,
                                                    value,
                                                })),
                                        },
                                    },
                                });
                                router.push('/account-creation/page-4');
                            } catch (error) {
                                console.error(error);
                            }
                        }}>
                        Continue
                    </Button>
                </Container>
            </GridLayout>
        </Layout>
    );
};

export default Page3;
