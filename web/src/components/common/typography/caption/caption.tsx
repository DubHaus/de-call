import {ReactNode} from 'react';

type Props = {
    children: ReactNode;
    bold?: boolean;
    className?: string;
    size?: 'lg' | 'base' | 'sm' | 'xs';
};

const Text = ({
    children,
    bold = false,
    className = '',
    size = 'base',
}: Props) => (
    <span
        className={`text-${size} text-current font-sans ${
            bold ? 'font-bold' : 'font-normal'
        } ${className}`}>
        {children}
    </span>
);

export default Text;
