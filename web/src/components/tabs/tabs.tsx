import {ReactNode} from 'react';
import Container from '../common/container';
import Flex from '../common/flex';
import styles from './tabs.module.scss';

type Props = {
    children: ReactNode;
};

const Tabs = ({children}: Props) => (
    <Container className={styles.container}>
        <Flex gap={50} align="center" justify="start">
            {children}
        </Flex>
    </Container>
);

export default Tabs;
