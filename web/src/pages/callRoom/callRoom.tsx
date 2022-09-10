import Container from 'src/components/common/container';
import Caption from 'src/components/common/typography/caption';
import Title from 'src/components/common/typography/title';
import Layout from 'src/components/layout';
import VideoCall from 'src/components/videoCall';

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
