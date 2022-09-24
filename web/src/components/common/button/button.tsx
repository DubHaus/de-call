import {ReactNode} from 'react';
import {IconType} from 'src/types/icons';
import Flex from '../flex';
import Icon from '../icon';
import Caption from '../typography/caption';
import styles from './button.module.scss';

type Props = {
    children?: ReactNode;
    icon?: IconType;
    type?: 'primary' | 'secondary' | 'negative' | 'alt';
    submit?: boolean;
    disabled?: boolean;
};

const Button = ({
    children,
    icon,
    type = 'primary',
    disabled = false,
    submit = false,
}: Props) => (
    <button
        type={submit ? 'submit' : 'button'}
        className={`${styles.button} ${styles[type]} ${
            disabled && styles.disabled
        } ${!children && styles.iconOnly}`}>
        {children ? (
            <Flex gap={10}>
                <Caption>{children}</Caption>
                {icon ? <Icon className={styles.icon} icon={icon} /> : null}
            </Flex>
        ) : icon ? (
            <Icon className={styles.icon} icon={icon} />
        ) : null}
    </button>
);

export default Button;
