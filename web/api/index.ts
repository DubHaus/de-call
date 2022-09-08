import {GraphQLClient} from 'graphql-request';
import {QueryClient} from 'react-query';

import {getSdk} from 'generated/graphql';
import {
    getAccessToken,
    refreshAccessToken,
    validateAccessToken,
} from 'utils/accessToken';

const gqlClient = new GraphQLClient('http://localhost:4000/graphql', {
    credentials: 'include',
    headers: () => ({authorization: `bearer ${getAccessToken()}`}),
    requestMiddleware: async request => {
        const token = getAccessToken();
        const valid = token ? validateAccessToken(token) : false;
        if (!valid) {
            try {
                await refreshAccessToken();
            } catch (err) {
                console.error("Coudn't refresh access token, error - ", err);
            }
        }

        return request;
    },
});

export const {getUsers, Register, Login, getCurrentUser} = getSdk(gqlClient);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});
