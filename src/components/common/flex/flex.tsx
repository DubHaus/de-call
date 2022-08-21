import {ReactNode} from 'react';
import Container from '../container';
import styles from './flex.module.scss';

type Props = {
    children: ReactNode;
    align?: 'center' | 'start' | 'end' | 'stretch';
    justify?: 'between' | 'around' | 'start' | 'end' | 'stretch';
    gap?: number | string;
    direction?: 'row' | 'column';
};

const Flex = ({
    children,
    align = 'center',
    justify = 'stretch',
    gap = '',
    direction = 'row',
}: Props) => (
    <Container
        style={{gap}}
        className={`${styles.flex} ${styles[`align-${align}`]} ${
            styles[`justify-${justify}`]
        } ${styles[`${direction}`]}`}>
        {children}
    </Container>
);

export default Flex;
