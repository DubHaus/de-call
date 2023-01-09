import React, {CSSProperties, ReactNode} from 'react';

type Props = {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
    gap?: number;
    onHover?: () => void;
    onBlur?: () => void;
};

const Container = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            children = null,
            className = '',
            gap,
            onClick,
            style = {},
            onHover,
            onBlur,
        }: Props,
        ref
    ) => (
        <div
            ref={ref}
            className={className}
            onMouseOver={onHover}
            onMouseLeave={onBlur}
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
