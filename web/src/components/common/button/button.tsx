import {ReactNode} from 'react';
import {IconType} from 'src/types/icons';
import Icon from '../icon';

type Props = {
    children?: ReactNode;
    icon?: IconType;
    type?: 'primary' | 'secondary' | 'ghost';
    submit?: boolean;
    disabled?: boolean;
    compact?: boolean;
    onClick?: () => void;
    className?: string;
};

const Button = ({
    children,
    icon,
    type = 'primary',
    disabled = false,
    submit = false,
    onClick,
    compact = false,
    className = '',
}: Props) => (
    <button
        onClick={onClick}
        type={submit ? 'submit' : 'button'}
        className={`min-w-[100px] px-4 h-10 font-bold rounded ${
            type === 'primary' && 'bg-indigo-500'
        } ${type === 'primary' ? 'text-white' : 'text-indigo-500'} ${
            type === 'secondary'
                ? 'border-solid  border-2 border-indigo-500'
                : ''
        } ${className}`}>
        {children}
        {icon ? <Icon icon={icon} /> : null}
    </button>
);

export default Button;
