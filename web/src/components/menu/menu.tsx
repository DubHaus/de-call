import {IconType} from '@components/common/icon/icon';
import {useRouter} from 'next/router';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Logo from './components/logo';
import MenuButton from './components/menuButton';
import MenuItem from './components/menuItem';

const routes: {[key: string]: {icon: IconType; name: string; title: string}} = {
    home: {
        icon: 'home',
        name: 'home',
        title: 'Home',
    },
    explore: {
        icon: 'explore',
        name: 'explore',
        title: 'Explore',
    },
    messages: {
        icon: 'send',
        name: 'messages',
        title: 'Messages',
    },
    friends: {
        icon: 'people',
        name: 'friends',
        title: 'Friends',
    },
    activities: {
        icon: 'calendar',
        name: 'activities',
        title: 'Scheduled activities',
    },
    profile: {
        icon: 'profile',
        name: 'profile',
        title: 'Profile',
    },
};

const getActiveItem = (route: string) => {
    return Object.keys(routes).find(path => route.includes(path));
};

type Props = {
    className?: string;
    open: boolean;
    toggle: (value: boolean) => void;
};

const Menu = ({className = '', open, toggle}: Props) => {
    const router = useRouter();

    const active = getActiveItem(router.asPath);

    return (
        <Container
            className={`${className} p-4  transition-all ease-in-out 
        ${open ? 'w-96' : 'w-24'}`}>
            <Flex gap={15} align="center" direction="column">
                <Logo compact={!open} />
                <MenuButton active={open} onChange={() => toggle(!open)} />
                {Object.values(routes).map(({icon, title, name}) => (
                    <MenuItem
                        key={name}
                        icon={icon}
                        name={title}
                        href={`/${name}`}
                        compact={!open}
                        active={active === name}
                    />
                ))}
            </Flex>
        </Container>
    );
};

export default Menu;
