import {GetServerSidePropsContext} from 'next';
import {addApolloState, initializeApollo} from 'src/lib/apolloClient';
import {} from '@apollo/client';
import {GetUsersDocument, useGetIsLoggedInQuery} from 'src/generated/graphql';
import HomePage from './home';
import WelcomePage from './welcome';
import Loader from '@components/common/loader';

const App = () => {
    const {data, loading} = useGetIsLoggedInQuery({
        fetchPolicy: 'network-only',
    });

    if (loading) return <Loader />;

    return data?.isLoggedIn ? <HomePage /> : <WelcomePage />;
};

export const getServerSideProps = async ({req}: GetServerSidePropsContext) => {
    const apolloClient = initializeApollo({ctx: {req}});

    await apolloClient.query({query: GetUsersDocument});

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default App;
