import type {AppProps} from 'next/app';

import Container from 'components/common/container';
import styles from './app.module.scss';
import 'public/styles/varibles.scss';
import 'public/styles/global.scss';

const App = ({Component, pageProps}: AppProps) => (
    <Container className={styles.container}>
        <Component {...pageProps} />
    </Container>
);

export default App;
