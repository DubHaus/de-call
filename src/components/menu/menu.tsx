import Container from 'components/common/container';
import Flex from 'components/common/flex';
import MenuItem from './components/menuItem';
import styles from './menu.module.scss';

type Props = {
    className?: string;
    compact?: boolean;
};

const Menu = ({className = '', compact = false}: Props) => (
    <Container
        className={`${styles.menu} ${className} ${compact && styles.compact}`}>
        <Flex gap={15} direction="column">
            <MenuItem
                icon="home"
                name="Home"
                active
                compact={compact}
                onClick={() => {}}
            />
            <MenuItem
                icon="explore"
                name="Explore"
                compact={compact}
                onClick={() => {}}
            />
            <MenuItem
                icon="send"
                name="Messages"
                compact={compact}
                onClick={() => {}}
            />
            <MenuItem
                icon="profile"
                name="Profile"
                compact={compact}
                onClick={() => {}}
            />
            <MenuItem
                icon="calendar"
                name="Schedules calls"
                compact={compact}
                onClick={() => {}}
            />
            <MenuItem
                icon="call"
                name="Incoming request"
                compact={compact}
                onClick={() => {}}
            />
        </Flex>
    </Container>
);

export default Menu;
