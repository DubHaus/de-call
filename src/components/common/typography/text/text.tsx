import {ReactNode} from 'react';
import styles from './text.module.scss';

type Props = {
    children: ReactNode;
};

const Text = ({children}: Props) => <p className={styles.text}>{children}</p>;

export default Text;
