import styles from './menuButton.module.scss';

type Props = {
    active: boolean;
    onChange: (value: boolean) => void;
    className?:string
};

const MenuButton = ({active, onChange, className}: Props) => (
    <button className={`${styles.button} ${className}`} onClick={() => onChange(!active)}>
        <div className={`${styles.container} ${active && styles.active}`}>
            <div className={styles.bar1} />
            <div className={styles.bar2} />
            <div className={styles.bar3} />
        </div>
    </button>
);

export default MenuButton;
