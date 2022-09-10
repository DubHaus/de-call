import {IconType} from 'src/types/icons';
import Icons from './icons';
import styles from './icon.module.scss';

type Props = {
    icon: IconType;
    color?: string;
    className?: string;
    onClick?: () => void;
};

const Icon = ({icon, color, className = '', onClick}: Props) => {
    const Component = Icons[icon];
    return (
        <Component
            onClick={onClick}
            className={`${className} ${onClick && styles.pointer}`}
            color={color}
        />
    );
};

export default Icon;
