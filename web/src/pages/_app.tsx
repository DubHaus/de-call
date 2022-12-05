import {useEffect, useState} from 'react';
import type {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import Link from 'next/link';
import {useApollo} from 'src/lib/apolloClient';

import Container from 'src/components/common/container';
import styles from './app.module.scss';
import 'public/styles/varibles.scss';
import 'public/styles/global.scss';
import {refreshAccessToken} from 'src/utils/accessToken';
import Loader from 'src/components/common/loader';

const App = ({Component, pageProps}: AppProps) => {
    const apolloClient = useApollo(pageProps);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        refreshAccessToken().finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loader loading={loading} />;
    }

    return (
        <ApolloProvider client={apolloClient}>
            <Container className={styles.container}>
                <Component {...pageProps} />
            </Container>
        </ApolloProvider>
    );
};

export default App;
