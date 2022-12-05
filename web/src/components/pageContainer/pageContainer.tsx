import {ReactNode} from 'react';
import Container from '../common/container';
import styles from './pageContainer.module.scss';

type Props = {
    children: ReactNode;
};

const PageContainer = ({children}: Props) => (
    <Container className={styles.container}>{children}</Container>
);

export default PageContainer;
