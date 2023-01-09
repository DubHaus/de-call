import {IconType} from '@components/common/icon/icon';
import Link from 'next/link';
import Icon from 'src/components/common/icon';
import Caption from 'src/components/common/typography/caption';
import styles from './menuItem.module.scss';

type Props = {
    icon: IconType;
    name: string;
    active?: boolean;
    compact?: boolean;
    href: string;
};

const MenuItem = ({
    icon,
    name,
    active = false,
    compact = false,
    href,
}: Props) => (
    <Link href={href}>
        <a
            className={`${styles.button} ${compact && styles.compact} ${
                active && styles.active
            } flex items-center`}>
            <Icon className={styles.icon} icon={icon} />
            {!compact ? <Caption bold={active} className="ml-3" >{name}</Caption> : null}
        </a>
    </Link>
);

export default MenuItem;
