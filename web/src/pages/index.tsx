import Container from 'src/components/common/container';
import Title from 'src/components/common/typography/title';
import {GetServerSidePropsContext} from 'next';
import {addApolloState, initializeApollo} from 'src/lib/apolloClient';
import {} from '@apollo/client';
import {GetUsersDocument, useGetUsersQuery} from 'generated/graphql';

const App = () => {
    const {data} = useGetUsersQuery();
    return (
        <Container>
            <Title>Users</Title>
            <div>{JSON.stringify(data)}</div>
        </Container>
    );
};

export const getServerSideProps = async ({req}: GetServerSidePropsContext) => {
    const apolloClient = initializeApollo({ctx: {req}});

    await apolloClient.query({query: GetUsersDocument});

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default App;
