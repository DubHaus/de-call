import {useEffect, useState} from 'react';
import type {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {useApollo} from 'src/lib/apolloClient';

import Container from 'src/components/common/container';
import 'public/styles/varibles.scss';
import 'public/styles/global.scss';
import './app.css';
import {refreshAccessToken} from 'src/utils/accessToken';
import Loader from 'src/components/common/loader';

const App = ({Component, pageProps}: AppProps) => {
    const apolloClient = useApollo(pageProps);

    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     refreshAccessToken().finally(() => setLoading(false));
    // }, []);

    // if (loading) {
    //     return <Loader loading={loading} />;
    // }

    return (
        <ApolloProvider client={apolloClient}>
            <Container className="bg-slate-50">
                <Component {...pageProps} />
            </Container>
        </ApolloProvider>
    );
};

export default App;
