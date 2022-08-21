import {ReactNode} from 'react';
import {IconType} from 'types/icons';
import Flex from '../flex';
import Icon from '../icon';
import Caption from '../typography/caption';
import styles from './button.module.scss';

type Props = {
    children: ReactNode;
    icon?: IconType;
    type?: 'primary' | 'secondary' | 'negative';
    disabled?: boolean;
};

const Button = ({
    children,
    icon,
    type = 'primary',
    disabled = false,
}: Props) => (
    <button
        className={`${styles.button} ${styles[type]} ${
            disabled && styles.disabled
        }`}>
        <Flex gap={10}>
            <Caption>{children}</Caption>
            {icon ? <Icon icon={icon} /> : null}
        </Flex>
    </button>
);

export default Button;
