import {ReactNode} from 'react';
import Container from '../container';

type Props = {
    children: ReactNode;
    className?: string;
    alt?: boolean;
    align?: 'start' | 'center' | 'baseline' | 'center' | 'stretch';
    local?: boolean;
};

const GridLayout = ({
    children,
    className,
    alt,
    align = 'stretch',
    local,
}: Props) => (
    <Container
        className={`${local ? '' : 'm-auto max-w-[1280px] p-5'} ${
            alt && 'px-[104px]'
        }  grid grid-cols-12 gap-4 items items-${align} ${className}`}>
        {children}
    </Container>
);

export default GridLayout;
