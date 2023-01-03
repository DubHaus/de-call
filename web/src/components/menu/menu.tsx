import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Logo from './components/logo';
import MenuButton from './components/menuButton';
import MenuItem from './components/menuItem';

type Props = {
    className?: string;
    open: boolean;
    toggle: (value: boolean) => void;
};

const Menu = ({className = '', open, toggle}: Props) => (
    <Container
        className={`${className} p-4  transition-all ease-in-out 
        ${open ? 'w-96' : 'w-24'}`}>
        <Flex gap={15} align="center" direction="column">
            <Logo compact={!open} />
            <MenuButton
                active={open}
                onChange={() => toggle(!open)}
            />
            <MenuItem
                icon="home"
                name="Home"
                href="/"
                active
                compact={!open}
                onClick={() => {}}
            />
            <MenuItem
                icon="explore"
                name="Explore"
                href="/explore"
                compact={!open}
                onClick={() => {}}
            />
            <MenuItem
                icon="send"
                name="Messages"
                href="/messages"
                compact={!open}
                onClick={() => {}}
            />
            <MenuItem
                icon="profile"
                name="Profile"
                href="/profile"
                compact={!open}
                onClick={() => {}}
            />
            <MenuItem
                icon="calendar"
                href="/calls"
                name="Schedules calls"
                compact={!open}
                onClick={() => {}}
            />
            <MenuItem
                icon="call"
                href="/requ"
                name="Incoming request"
                compact={!open}
                onClick={() => {}}
            />
        </Flex>
    </Container>
);

export default Menu;
