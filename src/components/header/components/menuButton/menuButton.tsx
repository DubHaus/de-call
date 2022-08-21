import styles from './menuButton.module.scss';

type Props = {
    active: boolean;
    onChange: (value: boolean) => void;
};

const MenuButton = ({active, onChange}: Props) => (
    <button className={styles.button} onClick={() => onChange(!active)}>
        <div className={`${styles.container} ${active && styles.active}`}>
            <div className={styles.bar1} />
            <div className={styles.bar2} />
            <div className={styles.bar3} />
        </div>
    </button>
);

export default MenuButton;
