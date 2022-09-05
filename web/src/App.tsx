import Container from 'components/common/container';
import CallRoom from 'pages/callRoom';
import Explore from 'pages/explore';
import Login from 'pages/login';
import SignUp from 'pages/signUp';
import styles from './app.module.scss';

const App = () => (
    <Container className={styles.container}>
        <CallRoom />
        {/* <Explore /> */}
        {/* <SignUp /> */}
        {/* <Login /> */}
    </Container>
);

export default App;
