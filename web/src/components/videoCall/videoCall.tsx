import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import IconButton from 'src/components/common/iconButton';
import VideoStream from './components/videoStream';
import styles from './videoCall.module.scss';

const VideoCall = () => (
    <Container>
        <VideoStream />
    </Container>
);

export default VideoCall;
