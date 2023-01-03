import {ReactNode} from 'react';
import NextLink from 'next/link';
import styles from './link.module.scss';

type Props = {
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
    href: string;
};

const Link = ({children, onClick, className = '', href}: Props) => (
    <NextLink href={href}>
        <a onClick={onClick} className={`${styles.link} ${className}`}>
            {children}
        </a>
    </NextLink>
);

export default Link;
