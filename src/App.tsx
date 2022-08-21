import Container from 'components/common/container';
import CallRoom from 'pages/callRoom';
import styles from './app.module.scss';

const App = () => (
    <Container className={styles.container}>
        <CallRoom />
    </Container>
);

export default App;
