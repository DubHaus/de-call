import {useEffect} from 'react';

export const useOutsideClick = (
    ref: React.RefObject<HTMLElement>,
    onClick: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                event.target instanceof Element &&
                ref.current &&
                !ref.current.contains(event.target)
            ) {
                onClick();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onClick]);
};
