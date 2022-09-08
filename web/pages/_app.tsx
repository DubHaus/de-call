import type {AppProps} from 'next/app';
import {queryClient} from 'api';
import {Hydrate, QueryClientProvider} from 'react-query';

import Container from 'components/common/container';
import styles from './app.module.scss';
import 'public/styles/varibles.scss';
import 'public/styles/global.scss';
import {useEffect, useState} from 'react';
import {refreshAccessToken} from 'utils/accessToken';
import Loader from 'components/common/loader';
import Link from 'next/link';

const App = ({Component, pageProps}: AppProps) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        refreshAccessToken().finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loader loading={loading} />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Link href="/profile">Profile</Link>
                <Link href="/signup">Sign up</Link>
                <Link href="/login">Login</Link>
                <Link href="/">Home</Link>

                <Container className={styles.container}>
                    <Component {...pageProps} />
                </Container>
            </Hydrate>
        </QueryClientProvider>
    );
};

export default App;
