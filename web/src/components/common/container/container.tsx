import React, {CSSProperties, ReactNode} from 'react';

type Props = {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
    gap?: number;
};

const Container = React.forwardRef<HTMLDivElement, Props>(
    (
        {children = null, className = '', gap, onClick, style = {}}: Props,
        ref
    ) => (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                ...(gap ? {gap, display: 'flex', flexDirection: 'column'} : {}),
            }}
            onClick={onClick}>
            {children}
        </div>
    )
);

export default Container;
