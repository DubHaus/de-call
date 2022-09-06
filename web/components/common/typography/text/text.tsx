import {ReactNode} from 'react';
import styles from './text.module.scss';

type Props = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
};

const Text = ({children, className = '', onClick}: Props) => (
    <p onClick={onClick} className={`${styles.text} ${className}`}>
        {children}
    </p>
);

export default Text;
