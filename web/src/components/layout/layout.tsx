import Container from 'components/common/container';
import Flex from 'components/common/flex';
import Header from 'components/header';
import Menu from 'components/menu';
import {ReactNode, useState} from 'react';
import styles from './layout.module.scss';

type Props = {
    children: ReactNode;
};

const Layout = ({children}: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <Container className={styles.container}>
            <Header active={open} setActive={setOpen} />
            <Flex align="stretch">
                <Menu compact={!open} className={styles.menuContainer} />
                <Container className={styles.content}>{children}</Container>
            </Flex>
        </Container>
    );
};

export default Layout;
