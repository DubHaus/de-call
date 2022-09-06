import type {AppProps} from 'next/app';
import {queryClient} from 'api';
import {Hydrate, QueryClientProvider} from 'react-query';

import Container from 'components/common/container';
import styles from './app.module.scss';
import 'public/styles/varibles.scss';
import 'public/styles/global.scss';

const App = ({Component, pageProps}: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
            <Container className={styles.container}>
                <Component {...pageProps} />
            </Container>
        </Hydrate>
    </QueryClientProvider>
);

export default App;
