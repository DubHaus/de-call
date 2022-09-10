import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Login from 'src/components/login';
import Logo from './components/logo';
import MenuButton from './components/menuButton';
import styles from './header.module.scss';

type Props = {
    active: boolean;
    setActive: (val: boolean) => void;
};

const Header = ({active, setActive}: Props) => {
    return (
        <Container className={styles.header}>
            <Flex justify="between">
                <Flex gap={10}>
                    <MenuButton active={active} onChange={setActive} />
                    <Logo />
                </Flex>
                <Container className={styles.login}>
                    <Login />
                </Container>
            </Flex>
        </Container>
    );
};

export default Header;
