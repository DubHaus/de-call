import {ReactNode} from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    bold?: boolean;
    light?: boolean;
    size?: 'lg' | 'base' | 'sm' | 'xs';
};

const Span = ({
    children,
    className = '',
    onClick,
    bold,
    size = 'base',
}: Props) => (
    <span
        onClick={onClick}
        className={`text-${size} text-current font-sans ${
            bold ? 'font-bold' : 'font-normal'
        } ${className}`}>
        {children}
    </span>
);

export default Span;
