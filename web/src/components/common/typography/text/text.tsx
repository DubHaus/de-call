import {ReactNode} from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    bold?: boolean;
    light?: boolean;
    size?: 'lg' | 'base' | 'sm' | 'xs';
};

const Text = ({
    children,
    className = '',
    onClick,
    bold,
    size = 'base',
}: Props) => (
    <p
        onClick={onClick}
        className={`text-${size} text-current font-sans ${
            bold && 'font-bold'
        } ${className}`}>
        {children}
    </p>
);

export default Text;
