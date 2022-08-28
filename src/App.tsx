import Container from 'components/common/container';
import CallRoom from 'pages/callRoom';
import Explore from 'pages/explore';
import SignUp from 'pages/signUp';
import styles from './app.module.scss';

const App = () => (
    <Container className={styles.container}>
        {/* <CallRoom /> */}
        {/* <Explore /> */}
        <SignUp />
    </Container>
);

export default App;
