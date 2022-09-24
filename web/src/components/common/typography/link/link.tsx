import {ReactNode} from 'react';
import styles from './link.module.scss';

type Props = {
    children?: ReactNode;
    onClick?: () => void;
    className?: string
};

const Link = ({children, onClick, className=""}: Props) => (
    <span onClick={onClick} className={`${styles.link} ${className}`}>
        {children}
    </span>
);

export default Link;
