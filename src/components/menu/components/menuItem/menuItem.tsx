import Flex from 'components/common/flex';
import Icon from 'components/common/icon';
import Caption from 'components/common/typography/caption';
import {IconType} from 'types/icons';
import styles from './menuItem.module.scss';

type Props = {
    icon: IconType;
    name: string;
    active?: boolean;
    onClick: () => void;
    compact?: boolean;
};

const MenuItem = ({
    icon,
    name,
    active = false,
    compact = false,
    onClick,
}: Props) => (
    <button
        className={`${styles.button} ${active && styles.active} ${
            compact && styles.compact
        }`}
        onClick={onClick}>
        <Flex gap={compact ? 0 : 10}>
            <Icon className={styles.icon} icon={icon} />
            <Caption className={styles.name}>{name}</Caption>
        </Flex>
    </button>
);

export default MenuItem;
