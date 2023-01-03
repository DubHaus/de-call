import Checkbox from '@components/common/checkbox';
import {ReactNode, useEffect, useRef} from 'react';
import Container from 'src/components/common/container';

export type SelectOption = {
    value: string;
    title: string;
};

type Props = {
    onClick: () => void;
    selected?: boolean;
    multiple?: boolean;
    children?: ReactNode;
};

const Option = ({onClick, children, selected, multiple}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        selected &&
            ref.current?.scrollIntoView({
                block: 'center',
                inline: 'start',
            });
    }, [ref, selected]);

    return (
        <Container
            ref={ref}
            onClick={onClick}
            className={`px-3 py-2 bg-white cursor-pointer text-current ${
                selected && 'font-bold'
            } hover:bg-slate-200`}>
            {multiple ? (
                <Checkbox value={selected}>{children}</Checkbox>
            ) : (
                children
            )}
        </Container>
    );
};

export default Option;
