import {CSSProperties, ReactNode} from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
};

const Container = ({children, className = '', style = {}}: Props) => (
    <div className={className} style={style}>
        {children}
    </div>
);

export default Container;
