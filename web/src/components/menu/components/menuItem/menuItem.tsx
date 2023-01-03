import Container from '@components/common/container';
import {IconType} from '@components/common/icon/icon';
import Link from 'next/link';
import Flex from 'src/components/common/flex';
import Icon from 'src/components/common/icon';
import Caption from 'src/components/common/typography/caption';
import styles from './menuItem.module.scss';

type Props = {
    icon: IconType;
    name: string;
    active?: boolean;
    onClick: () => void;
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
        <a>
            <Icon className={styles.icon} icon={icon} />
            {!compact ? <Caption className={styles.name}>{name}</Caption> : null}
        </a>
    </Link>
);

export default MenuItem;
