import {ReactNode} from 'react';
import Container from '../container';

type Props = {
    children: ReactNode;
    className?: string;
    alt?: boolean;
};

const GridLayout = ({children, className, alt}: Props) => (
    <Container
        className={`max-w-[1280px] m-auto ${
            alt && 'px-[104px]'
        } p-5 grid grid-cols-12 gap-4 ${className}`}>
        {children}
    </Container>
);

export default GridLayout;
