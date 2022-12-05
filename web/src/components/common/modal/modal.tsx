import {useOutsideClick} from 'src/hooks/utilsHooks';
import {ReactNode, useRef} from 'react';
import Container from '../container';
import Icon from '../icon';
import styles from './modal.module.scss';
import Button from '../button';
import Title from '../typography/title';
import Flex from '../flex';

type Props = {
    children: ReactNode;
    close: () => void;
    width?: number | 'min-content' | 'fit-content';
    title?: string;
    buttons?: ReactNode;
};

const Modal = ({
    children,
    close,
    width = 'min-content',
    title,
    buttons = null,
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, close);

    return (
        <Container className={styles.modal}>
            <Container
                gap={40}
                style={{width}}
                ref={ref}
                className={styles.container}>
                <Title className={styles.title} level="h4">
                    {title}
                </Title>
                <Container className={styles.content}>{children}</Container>
                <Flex gap={20} justify="end">
                    {buttons}
                </Flex>
            </Container>
        </Container>
    );
};

export default Modal;
