import {useOutsideClick} from 'src/hooks/utilsHooks';
import {ReactNode, useRef} from 'react';
import Container from '../container';
import Icon from '../icon';
import styles from './modal.module.scss';

type Props = {
    children: ReactNode;
    close: () => void;
    width?: number;
};

const Modal = ({children, close, width = 500}: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, close);

    return (
        <Container className={styles.modal}>
            <Container style={{width}} ref={ref} className={styles.container}>
                <Icon className={styles.close} icon="close" onClick={close} />
                <Container>{children}</Container>
            </Container>
        </Container>
    );
};

export default Modal;
