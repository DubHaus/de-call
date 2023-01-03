import {useCallback, useEffect, useMemo, useState} from 'react';

export const useErrorWithFocus = (
    error?: string
): [string | undefined, () => void] => {
    const [dirty, setDirty] = useState(false);
    const errorToShow = useMemo(
        () => (!dirty ? error : undefined),
        [error, dirty]
    );

    useEffect(() => {
        setDirty(false);
    }, [error]);

    const onChange = useCallback(() => setDirty(true), []);

    return [errorToShow, onChange];
};
