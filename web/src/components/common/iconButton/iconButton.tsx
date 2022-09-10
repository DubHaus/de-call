import {ReactNode, useState} from 'react';
import {IconType} from 'src/types/icons';
import Container from '../container';
import Icon from '../icon';
import styles from './iconButton.module.scss';

type Props = {
    icon: IconType;
    type?: 'primary' | 'secondary' | 'negative' | "alt";
    disabled?: boolean;
    contextMenu?: ReactNode;
    onClick: () => void;
};

const IconButton = ({
    icon,
    type = 'primary',
    disabled = false,
    contextMenu,
    onClick,
}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Container className={styles.container}>
            <button
                onClick={onClick}
                className={`${styles.button} ${styles[type]} ${
                    disabled && styles.disabled
                }`}>
                <Icon className={styles.icon} icon={icon} />
            </button>
            {contextMenu ? (
                <button
                    onClick={e => {
                        e.stopPropagation()
                        setOpen(!open);
                    }}
                    className={styles.contextButton}>
                    <Icon className={styles.contextIcon} icon="down" />
                </button>
            ) : null}
            {open ? (
                <Container className={styles.contextContent}>
                    {contextMenu}
                </Container>
            ) : null}
        </Container>
    );
};
export default IconButton;
