import {IconType} from 'src/types/icons';
import Icons from './icons';

type Props = {
    icon: IconType;
    color?: string;
    className?: string;
    onClick?: () => void;
    size?: 'lg' | 'base' | 'sm' | 'xs';
};

const Icon = ({icon, color, className = '', onClick, size = 'base'}: Props) => {
    const Component = Icons[icon];
    return (
        <Component
            onClick={onClick}
            className={`${className} ${onClick && 'cursor-pointer'} ${
                size === 'base'
                    ? 'h-6 w-6'
                    : size === 'lg'
                    ? 'h-7 w-7'
                    : size === 'sm'
                    ? 'h-5 w-5'
                    : 'h-4 w-4'
            }`}
            color={color}
        />
    );
};

export default Icon;
