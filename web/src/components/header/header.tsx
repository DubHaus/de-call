import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Login from 'src/components/login';
import styles from './header.module.scss';

type Props = {
    className?: string;
    title?: string;
};

const Header = ({className, title}: Props) => {
    return (
        <Container className={`p-5 ${className}`}>
            <Flex justify="between">
                <h1 className="text-xl font-semibold">{title}</h1>
                <Container className={styles.login}>
                    <Login />
                </Container>
            </Flex>
        </Container>
    );
};

export default Header;
