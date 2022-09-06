import Container from 'components/common/container';
import Flex from 'components/common/flex';
import IconButton from 'components/common/iconButton';
import VideoStream from './components/videoStream';
import styles from './videoCall.module.scss';

const VideoCall = () => (
    <Container>
        <VideoStream />
    </Container>
);

export default VideoCall;
