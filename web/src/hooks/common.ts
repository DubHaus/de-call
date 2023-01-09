import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

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

export const useShowHide = (): [
    boolean,
    () => void,
    () => void,
    Dispatch<SetStateAction<boolean>>
] => {
    const [show, setShow] = useState(false);

    const open = useCallback(() => setShow(true), [setShow]);
    const close = useCallback(() => setShow(false), [setShow]);

    return [show, open, close, setShow];
};
