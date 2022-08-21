import Container from 'components/common/container';
import Flex from 'components/common/flex';
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
            <Flex>
                <MenuButton active={active} onChange={setActive} />
                <Logo />
                <Flex>
                    <a href="#1">Menu1</a>
                    <a href="#2">Menu2</a>
                    <a href="#3">Menu3</a>
                </Flex>
            </Flex>
        </Container>
    );
};

export default Header;
