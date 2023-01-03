import {ReactNode} from 'react';
import Container from '../container';

type Props = {
    children: ReactNode;
    className?: string;
    alt?: boolean;
    align?: 'start' | 'center' | 'baseline' | 'center' | 'stretch';
};

const GridLayout = ({children, className, alt,align = 'stretch'}: Props) => (
    <Container
        className={`max-w-[1280px] m-auto ${
            alt && 'px-[104px]'
        } p-5 grid grid-cols-12 gap-4 items items-${align} ${className}`}>
        {children}
    </Container>
);

export default GridLayout;
