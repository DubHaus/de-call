import {ReactNode} from 'react';
import styles from './caption.module.scss';

type Props = {
    children: ReactNode;
    bold?: boolean;
    className?: string;
    compact?: boolean
};

const Text = ({children, bold = false, className = '', compact= false}: Props) => (
    <span className={`${styles.text} ${bold && styles.bold} ${compact && styles.compact} ${className}`}>
        {children}
    </span>
);

export default Text;
