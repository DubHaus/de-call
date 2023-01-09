import Link from 'next/link';
import {ReactNode} from 'react';
import Container from '../container';
import Icon from '../icon';
import {IconType} from '../icon/icon';

type Props = {
    children?: ReactNode;
    icon?: IconType;
    type?: 'primary' | 'secondary' | 'ghost';
    submit?: boolean;
    href?: string;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    size?: 'lg' | 'base' | 'sm';
};

const Button = ({
    children,
    icon,
    type,
    disabled = false,
    href,
    submit = false,
    onClick,
    className = '',
    size = 'base',
}: Props) => {
    const iconOnly = icon && !children;
    type = type || (iconOnly ? 'ghost' : 'primary');

    const sizeClasses =
        size === 'lg'
            ? 'min-w-[100px] px-4 h-10'
            : size === 'base'
            ? 'min-w-[100px] px-4 h-10'
            : 'min-w-[60px] px-4 h-8';

    return (
        <button
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
            className={`${
                iconOnly ? 'h-[100%] p-1' : `min-w-[100px] ${sizeClasses}`
            } font-bold text-${size} rounded ${
                type === 'primary' && 'bg-indigo-500'
            } ${
                type === 'primary'
                    ? 'text-white'
                    : type === 'ghost' && iconOnly
                    ? 'text-current'
                    : 'text-indigo-500'
            } ${
                type === 'secondary'
                    ? 'border-solid  border-2 border-indigo-500'
                    : ''
            } ${className}`}>
            {href ? (
                <Link href={href}>{children}</Link>
            ) : (
                <Container
                    className={icon && children ? 'flex items-center' : ''}>
                    {children}
                    {icon ? (
                        <Icon
                            size={size}
                            className={children ? 'ml-2' : ''}
                            icon={icon}
                        />
                    ) : null}
                </Container>
            )}
        </button>
    );
};

export default Button;
