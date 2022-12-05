import {ReactNode} from 'react';
import styles from './text.module.scss';

type Props = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    compact?: boolean;
    bold?: boolean;
    light?: boolean;
};

const Text = ({
    children,
    className = '',
    onClick,
    bold = false,
    compact = false,
    light = false,
}: Props) => (
    <p
        onClick={onClick}
        className={`${styles.text} ${bold && styles.bold} ${
            compact && styles.compact
        } ${light && styles.light} ${className}`}>
        {children}
    </p>
);

export default Text;
