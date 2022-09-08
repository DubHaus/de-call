import Container from 'components/common/container';
import Caption from 'components/common/typography/caption';
import Title from 'components/common/typography/title';
import Layout from 'components/layout';
import VideoCall from 'components/videoCall';

const CallRoomPage = () => (
    <Layout>
        <Container>
            <Title level="h2">Video call with Timyr Green</Title>
            <Container>
                <Caption>Started: 9:30</Caption>
                <Caption>Passed: 32m 24s</Caption>
                <Caption>Current bill: 32m 24s</Caption>
            </Container>
            <Caption>Theme: How to make a startup</Caption>
        </Container>
        <VideoCall />
    </Layout>
);

export default CallRoomPage;
