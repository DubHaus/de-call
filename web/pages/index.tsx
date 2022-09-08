import {dehydrate, useQuery} from 'react-query';

import {queryClient, getUsers} from 'api';
import Container from 'components/common/container';
import Title from 'components/common/typography/title';

// export const getServerSideProps = async () => {
//     await queryClient.prefetchQuery('users', () => getUsers());

//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient),
//         },
//     };
// };

const App = () => {
    const {data} = useQuery('users', () => getUsers());
    return (
        <Container>
            <Title>Users</Title>
            <div>{JSON.stringify(data)}</div>
        </Container>
    );
};

export default App;
