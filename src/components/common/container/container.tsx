import {CSSProperties, ReactNode} from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
};

const Container = ({children, className = '', onClick, style = {}}: Props) => (
    <div className={className} style={style} onClick={onClick} >
        {children}
    </div>
);

export default Container;
