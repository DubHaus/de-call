import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Header from 'src/components/header';
import Menu from 'src/components/menu';
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
