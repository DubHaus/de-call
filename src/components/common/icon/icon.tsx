import {IconType} from 'types/icons';
import Icons from './icons';

type Props = {
    icon: IconType;
    color?: string;
    className?: string;
};

const Icon = ({icon, color, className = ''}: Props) => {
    const Component = Icons[icon];
    return <Component className={className} color={color} />;
};

export default Icon;
