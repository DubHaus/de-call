import {useRouter} from 'next/router';
import {useMemo} from 'react';
import Container from 'src/components/common/container';
import Title from 'src/components/common/typography/title';
import Layout from 'src/components/layout';
// import {useGetCurrentUserQuery} from 'generated/graphql';
import Tabs from 'src/components/tabs';
import Tab from 'src/components/tabs/tab';
import Profile from './components/profile';
import Schedule from './components/schedule';

const TabsInfo = {
    profile: {
        tab: 'profile',
        Component: Profile,
        title: 'Profile',
    },
    schedule: {
        tab: 'schedule',
        Component: Schedule,
        title: 'Schedule',
    },
};

const ProfilePage = () => {
    const router = useRouter();
    const activeTab = router.query.tab as string;

    const {Component, title} = useMemo(() => {
        const tabs = Object.keys(TabsInfo);
        if (tabs.includes(activeTab)) {
            return TabsInfo[activeTab as keyof typeof TabsInfo];
        } else {
            return {Component: () => null, title: null};
        }
    }, [activeTab]);

    return (
        <Layout>
            <Container>
                <Title level="h2">{title}</Title>
            </Container>
            <Tabs>
                {Object.values(TabsInfo).map(({tab, title}) => (
                    <Tab key={tab} tab={tab} active={tab === activeTab}>
                        {title}
                    </Tab>
                ))}
            </Tabs>
            <Component />
        </Layout>
    );
};

export default ProfilePage;
