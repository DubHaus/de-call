import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  title: Scalars['String'];
  value: Scalars['String'];
};

export type CategoryInput = {
  title: Scalars['String'];
  value: Scalars['String'];
};

/** Event creation input */
export type CreateEventInput = {
  categories: Array<CategoryInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  previewImage?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type: EventType;
};

/** New user */
export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type DraftProfile = {
  __typename?: 'DraftProfile';
  bio?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  interests?: Maybe<Array<Category>>;
  languages?: Maybe<Array<Language>>;
  lastName: Scalars['String'];
  profilePhoto?: Maybe<Photo>;
};

/** Profile draft updating */
export type DraftProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  interests?: InputMaybe<Array<CategoryInput>>;
  languages?: InputMaybe<Array<LanguageInput>>;
  lastName?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  attendees: Array<User>;
  categories: Array<Category>;
  creator: User;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  previewImage?: Maybe<Image>;
  title: Scalars['String'];
  type: EventType;
};

/** Event type */
export enum EventType {
  Closed = 'closed',
  Private = 'private',
  Public = 'public'
}

export type Image = {
  __typename?: 'Image';
  description?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  id: Scalars['ID'];
  location: Scalars['String'];
};

export type Language = {
  __typename?: 'Language';
  title: Scalars['String'];
  value: Scalars['String'];
};

export type LanguageInput = {
  title: Scalars['String'];
  value: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

/** New user */
export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Scalars['Boolean'];
  createProfile: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: SignupResponce;
  removeImage: Scalars['Boolean'];
  removePhoto: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateDraftProfile: Scalars['Boolean'];
  uploadImage: Scalars['String'];
  uploadPhoto: Scalars['String'];
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};


export type MutationRegisterArgs = {
  input: CreateUserInput;
};


export type MutationRemoveImageArgs = {
  input: Scalars['String'];
};


export type MutationRemovePhotoArgs = {
  input: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  username: Scalars['Int'];
};


export type MutationUpdateDraftProfileArgs = {
  input: DraftProfileInput;
};


export type MutationUploadImageArgs = {
  input: UploadImageInput;
};


export type MutationUploadPhotoArgs = {
  input: UploadImageInput;
};

export type Photo = {
  __typename?: 'Photo';
  description?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  id: Scalars['ID'];
  location: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  interests: Array<Category>;
  languages?: Maybe<Array<Language>>;
  lastName?: Maybe<Scalars['String']>;
  photos: Array<Photo>;
  profilePhoto?: Maybe<Photo>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  draftProfile: DraftProfile;
  isLoggedIn: Scalars['Boolean'];
  languages: Array<Language>;
  myCreatedEvents: Array<Event>;
  user: User;
  users: Array<User>;
};

export type SignupResponce = {
  __typename?: 'SignupResponce';
  accessToken: Scalars['String'];
  created: Scalars['Boolean'];
};

/** new photo */
export type UploadImageInput = {
  description: Scalars['String'];
  file: Scalars['Upload'];
};

export type User = {
  __typename?: 'User';
  createdEvents: Array<Event>;
  draftProfile?: Maybe<DraftProfile>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  profile?: Maybe<Profile>;
  username: Scalars['String'];
};

export type GetLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLanguagesQuery = { __typename?: 'Query', languages: Array<{ __typename?: 'Language', value: string, title: string }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', value: string, title: string }> };

export type UpdateDraftProfileMutationVariables = Exact<{
  input: DraftProfileInput;
}>;


export type UpdateDraftProfileMutation = { __typename?: 'Mutation', updateDraftProfile: boolean };

export type GetDraftProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDraftProfileQuery = { __typename?: 'Query', draftProfile: { __typename?: 'DraftProfile', firstName: string, lastName: string, bio?: string | null, interests?: Array<{ __typename?: 'Category', value: string, title: string }> | null, languages?: Array<{ __typename?: 'Language', value: string, title: string }> | null, profilePhoto?: { __typename?: 'Photo', location: string } | null } };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: boolean };

export type MyCreatedEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCreatedEventsQuery = { __typename?: 'Query', myCreatedEvents: Array<{ __typename?: 'Event', id: string, title: string, description: string, date: any, type: EventType, categories: Array<{ __typename?: 'Category', value: string }>, previewImage?: { __typename?: 'Image', location: string } | null, attendees: Array<{ __typename?: 'User', username: string }> }> };

export type UploadImageMutationVariables = Exact<{
  input: UploadImageInput;
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: string };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UploadPhotoMutationVariables = Exact<{
  input: UploadImageInput;
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto: string };

export type CreateProfileMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: boolean };

export type RegisterMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'SignupResponce', accessToken: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user: { __typename?: 'User', username: string, email: string } };

export type GetIsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIsLoggedInQuery = { __typename?: 'Query', isLoggedIn: boolean };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', username: string, email: string, profile?: { __typename?: 'Profile', firstName: string, lastName?: string | null, bio?: string | null } | null }> };


export const GetLanguagesDocument = gql`
    query getLanguages {
  languages {
    value
    title
  }
}
    `;

/**
 * __useGetLanguagesQuery__
 *
 * To run a query within a React component, call `useGetLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLanguagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLanguagesQuery(baseOptions?: Apollo.QueryHookOptions<GetLanguagesQuery, GetLanguagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(GetLanguagesDocument, options);
      }
export function useGetLanguagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLanguagesQuery, GetLanguagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(GetLanguagesDocument, options);
        }
export type GetLanguagesQueryHookResult = ReturnType<typeof useGetLanguagesQuery>;
export type GetLanguagesLazyQueryHookResult = ReturnType<typeof useGetLanguagesLazyQuery>;
export type GetLanguagesQueryResult = Apollo.QueryResult<GetLanguagesQuery, GetLanguagesQueryVariables>;
export const GetCategoriesDocument = gql`
    query getCategories {
  categories {
    value
    title
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const UpdateDraftProfileDocument = gql`
    mutation UpdateDraftProfile($input: DraftProfileInput!) {
  updateDraftProfile(input: $input)
}
    `;
export type UpdateDraftProfileMutationFn = Apollo.MutationFunction<UpdateDraftProfileMutation, UpdateDraftProfileMutationVariables>;

/**
 * __useUpdateDraftProfileMutation__
 *
 * To run a mutation, you first call `useUpdateDraftProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDraftProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDraftProfileMutation, { data, loading, error }] = useUpdateDraftProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDraftProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDraftProfileMutation, UpdateDraftProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDraftProfileMutation, UpdateDraftProfileMutationVariables>(UpdateDraftProfileDocument, options);
      }
export type UpdateDraftProfileMutationHookResult = ReturnType<typeof useUpdateDraftProfileMutation>;
export type UpdateDraftProfileMutationResult = Apollo.MutationResult<UpdateDraftProfileMutation>;
export type UpdateDraftProfileMutationOptions = Apollo.BaseMutationOptions<UpdateDraftProfileMutation, UpdateDraftProfileMutationVariables>;
export const GetDraftProfileDocument = gql`
    query GetDraftProfile {
  draftProfile {
    firstName
    lastName
    bio
    interests {
      value
      title
    }
    languages {
      value
      title
    }
    profilePhoto {
      location
    }
  }
}
    `;

/**
 * __useGetDraftProfileQuery__
 *
 * To run a query within a React component, call `useGetDraftProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDraftProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetDraftProfileQuery, GetDraftProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDraftProfileQuery, GetDraftProfileQueryVariables>(GetDraftProfileDocument, options);
      }
export function useGetDraftProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDraftProfileQuery, GetDraftProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDraftProfileQuery, GetDraftProfileQueryVariables>(GetDraftProfileDocument, options);
        }
export type GetDraftProfileQueryHookResult = ReturnType<typeof useGetDraftProfileQuery>;
export type GetDraftProfileLazyQueryHookResult = ReturnType<typeof useGetDraftProfileLazyQuery>;
export type GetDraftProfileQueryResult = Apollo.QueryResult<GetDraftProfileQuery, GetDraftProfileQueryVariables>;
export const CreateEventDocument = gql`
    mutation createEvent($input: CreateEventInput!) {
  createEvent(input: $input)
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const MyCreatedEventsDocument = gql`
    query myCreatedEvents {
  myCreatedEvents {
    id
    title
    description
    date
    categories {
      value
    }
    previewImage {
      location
    }
    attendees {
      username
    }
    type
  }
}
    `;

/**
 * __useMyCreatedEventsQuery__
 *
 * To run a query within a React component, call `useMyCreatedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCreatedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCreatedEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCreatedEventsQuery(baseOptions?: Apollo.QueryHookOptions<MyCreatedEventsQuery, MyCreatedEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCreatedEventsQuery, MyCreatedEventsQueryVariables>(MyCreatedEventsDocument, options);
      }
export function useMyCreatedEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCreatedEventsQuery, MyCreatedEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCreatedEventsQuery, MyCreatedEventsQueryVariables>(MyCreatedEventsDocument, options);
        }
export type MyCreatedEventsQueryHookResult = ReturnType<typeof useMyCreatedEventsQuery>;
export type MyCreatedEventsLazyQueryHookResult = ReturnType<typeof useMyCreatedEventsLazyQuery>;
export type MyCreatedEventsQueryResult = Apollo.QueryResult<MyCreatedEventsQuery, MyCreatedEventsQueryVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($input: UploadImageInput!) {
  uploadImage(input: $input)
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginUserInput!) {
  login(input: $input) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UploadPhotoDocument = gql`
    mutation UploadPhoto($input: UploadImageInput!) {
  uploadPhoto(input: $input)
}
    `;
export type UploadPhotoMutationFn = Apollo.MutationFunction<UploadPhotoMutation, UploadPhotoMutationVariables>;

/**
 * __useUploadPhotoMutation__
 *
 * To run a mutation, you first call `useUploadPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPhotoMutation, { data, loading, error }] = useUploadPhotoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadPhotoMutation, UploadPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPhotoMutation, UploadPhotoMutationVariables>(UploadPhotoDocument, options);
      }
export type UploadPhotoMutationHookResult = ReturnType<typeof useUploadPhotoMutation>;
export type UploadPhotoMutationResult = Apollo.MutationResult<UploadPhotoMutation>;
export type UploadPhotoMutationOptions = Apollo.BaseMutationOptions<UploadPhotoMutation, UploadPhotoMutationVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile {
  createProfile
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: CreateUserInput!) {
  register(input: $input) {
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  user {
    username
    email
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetIsLoggedInDocument = gql`
    query getIsLoggedIn {
  isLoggedIn
}
    `;

/**
 * __useGetIsLoggedInQuery__
 *
 * To run a query within a React component, call `useGetIsLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIsLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIsLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIsLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<GetIsLoggedInQuery, GetIsLoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIsLoggedInQuery, GetIsLoggedInQueryVariables>(GetIsLoggedInDocument, options);
      }
export function useGetIsLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIsLoggedInQuery, GetIsLoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIsLoggedInQuery, GetIsLoggedInQueryVariables>(GetIsLoggedInDocument, options);
        }
export type GetIsLoggedInQueryHookResult = ReturnType<typeof useGetIsLoggedInQuery>;
export type GetIsLoggedInLazyQueryHookResult = ReturnType<typeof useGetIsLoggedInLazyQuery>;
export type GetIsLoggedInQueryResult = Apollo.QueryResult<GetIsLoggedInQuery, GetIsLoggedInQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  users {
    username
    email
    profile {
      firstName
      lastName
      bio
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;