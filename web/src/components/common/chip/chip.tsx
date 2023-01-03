import {ReactNode} from 'react';
import Icon from '../icon';
import {IconType} from '../icon/icon';

type Props = {
    children: ReactNode;
    icon?: IconType;
    onClick?: () => void;
    selected?: boolean;
    className?: string;
    size?: 'base' | 'sm';
};

const Chip = ({children, icon, onClick, selected, className, size}: Props) => (
    <button
        onClick={() => onClick && onClick()}
        className={`${
            size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-sm'
        } inline-flex items-center rounded-full border-indigo-600 border border-solid font-bold ${
            selected ? 'bg-indigo-600 text-slate-50' : 'text-indigo-600'
        }  ${className}`}>
        {children}
        {icon ? (
            <Icon
                icon={icon}
                className="ml-2"
                size={size === 'base' ? 'sm' : 'xs'}
            />
        ) : null}
    </button>
);

export default Chip;
