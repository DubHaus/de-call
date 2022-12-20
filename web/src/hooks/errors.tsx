import {useContext, useMemo} from 'react';
import {ApolloError} from '@apollo/client';
import {useEffect} from 'react';
import {AlertUpdateContext} from 'src/context/alerts';

export const useHandleErrors = (error: ApolloError | undefined) => {
    const {addAlert, removeAlert} = useContext(AlertUpdateContext);

    const [validationErrors, otherErrors] = useMemo(() => {
        const validationErrors: {[key: string]: string} = {};
        const otherErrors: string[] = [];

        error?.graphQLErrors.forEach(error => {
            if (error.extensions.code === 'VALIDATION_ERROR') {
                Object.entries(
                    error?.extensions?.errors &&
                        typeof error?.extensions?.errors === 'object'
                        ? error?.extensions.errors
                        : {}
                ).forEach(([key, value]: [string, {[key: string]: string}]) => {
                    validationErrors[key] = Object.values(value)[0];
                });
            } else if (error.extensions.code === 'BAD_USER_INPUT') {
                otherErrors.push(error.message);
            }
        });
        return [validationErrors, otherErrors];
    }, [error]);

    useEffect(() => {
        const indices = otherErrors.map(message =>
            addAlert({text: message, type: 'error'})
        );

        return () => {
            indices.forEach(removeAlert); // clean previous errors
        };
    }, [otherErrors]);

    return validationErrors;
};
