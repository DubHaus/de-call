import {useMemo} from 'react';
import {
    ApolloClient,
    HttpLink,
    from,
    InMemoryCache,
    NormalizedCacheObject,
    ApolloLink,
    Observable,
} from '@apollo/client';
import {SchemaLink} from '@apollo/client/link/schema';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import {getAccessToken, setAccessToken} from 'src/utils/accessToken';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import {createUploadLink} from 'apollo-upload-client';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

type SchemaContext =
    | SchemaLink.ResolverContext
    | SchemaLink.ResolverContextFunction;

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle: any;
            Promise.resolve(operation)
                .then(operation => {
                    const accessToken = getAccessToken();
                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `bearer ${accessToken}`,
                            },
                        });
                    }
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

function createIsomorphicLink(ctx?: SchemaContext) {
    const httpLink = new HttpLink({});

    const refetchLink = new TokenRefreshLink({
        accessTokenField: 'accessToken',
        isTokenValidOrUndefined: () => {
            const token = getAccessToken();

            if (!token) {
                return true;
            }

            try {
                const {exp} = jwtDecode(token) as {exp: number};
                if (Date.now() >= exp * 1000) {
                    return false;
                } else {
                    return true;
                }
            } catch {
                return false;
            }
        },
        fetchAccessToken: () => {
            return fetch('http://localhost:4000/refresh_token', {
                method: 'POST',
                credentials: 'include',
            });
        },
        handleFetch: setAccessToken,
        handleError: err => {
            console.warn('Your refresh token is invalid. Try to relogin');
            console.error(err);
        },
    });

    const uploadLink = createUploadLink({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include',
    });

    return from([refetchLink, requestLink, uploadLink]);
}

function createApolloClient(ctx?: SchemaContext) {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: createIsomorphicLink(ctx),
        cache: new InMemoryCache(),
        credentials: 'include',
    });
}

interface InitApollo {
    initialState?: any;
    ctx?: SchemaContext;
}

export function initializeApollo({initialState, ctx}: InitApollo) {
    const _apolloClient = apolloClient ?? createApolloClient(ctx);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
        const data = merge(existingCache, initialState, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter(d =>
                    sourceArray.every(s => !isEqual(d, s))
                ),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: {props: any}
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(
        () => initializeApollo({initialState: state}),
        [state]
    );
    return store;
}
