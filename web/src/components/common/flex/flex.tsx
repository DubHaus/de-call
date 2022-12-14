import {ReactNode} from 'react';
import Container from '../container';
import styles from './flex.module.scss';

type Props = {
    children: ReactNode;
    align?: 'center' | 'start' | 'end' | 'stretch';
    justify?: 'between' | 'around' | 'start' | 'end' | 'stretch';
    gap?: number;
    direction?: 'row' | 'column';
    className?: string;
    wrap?: boolean;
    inline?: boolean;
};

const Flex = ({
    children,
    align = 'center',
    justify = 'stretch',
    gap = 0,
    direction = 'row',
    className = '',
    wrap = false,
    inline = false,
}: Props) => (
    <Container
        style={{
            gap,
            flexWrap: wrap ? 'wrap' : 'nowrap',
            display: inline ? 'inline-flex' : 'flex',
        }}
        className={`${styles[`align-${align}`]} ${
            styles[`justify-${justify}`]
        } ${styles[`${direction}`]} ${className}`}>
        {children}
    </Container>
);

export default Flex;
