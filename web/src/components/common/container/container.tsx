import React, {CSSProperties, ReactNode} from 'react';

type Props = {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
};

const Container = React.forwardRef<HTMLDivElement, Props>(
    ({children = null, className = '', onClick, style = {}}: Props, ref) => (
        <div ref={ref} className={className} style={style} onClick={onClick}>
            {children}
        </div>
    )
);

export default Container;
