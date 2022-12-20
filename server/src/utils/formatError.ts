import {GraphQLError, GraphQLFormattedError} from 'graphql';

export const formatError = (
    error: GraphQLError
): GraphQLFormattedError<Record<string, any>> => {
    if (
        error.message === 'Argument Validation Error' &&
        error.extensions.exception?.validationErrors?.length
    ) {
        const errors: {[key: string]: {}} = {};
        error.extensions.exception?.validationErrors.forEach(
            ({
                property,
                constraints,
            }: {
                property: string;
                constraints: {[key: string]: string};
            }) => {
                (error && errors[property]) || (errors[property] = {});
                errors[property] = {...errors[property], ...constraints};
            }
        );

        return {
            ...error,
            extensions: {
                code: 'VALIDATION_ERROR',
                errors,
            },
        };
    }
    return error;
};
