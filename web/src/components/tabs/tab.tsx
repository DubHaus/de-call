import NextLink from 'next/link';
import {ReactNode} from 'react';
import Link from '../common/typography/link';
import styles from './tab.module.scss';

type Props = {
    tab: string;
    active?: boolean;
    children: ReactNode;
};

const Tab = ({children, tab, active = false}: Props) => (
    <Link className={`${styles.tab} ${active ? styles.active : ''}`}>
        <NextLink href={tab}>{children}</NextLink>
    </Link>
);

export default Tab;
