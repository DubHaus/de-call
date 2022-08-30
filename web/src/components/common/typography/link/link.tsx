import {ReactNode} from 'react';
import styles from './link.module.scss';

type Props = {
    children?: ReactNode;
    onClick?: () => void;
};

const Link = ({children, onClick}: Props) => (
    <span onClick={onClick} className={styles.link}>
        {children}
    </span>
);

export default Link;
