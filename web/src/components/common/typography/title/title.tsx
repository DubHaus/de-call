import {ReactNode} from 'react';
import styles from './title.module.scss';

type Props = {
    children: ReactNode;
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    className?: string;
};

const Title = ({children, level = 'h1', className = ''}: Props) => {
    switch (level) {
        case 'h1':
            return (
                <h1 className={`font-bold text-4xl text-current	 ${className}`}>
                    {children}
                </h1>
            );
        case 'h2':
            return (
                <h2 className={`font-bold text-3xl text-current	 ${className}`}>
                    {children}
                </h2>
            );
        case 'h3':
            return (
                <h3 className={`font-bold text-2xl text-current	 ${className}`}>
                    {children}
                </h3>
            );
        case 'h4':
            return (
                <h4 className={`font-bold text-xl text-current	 ${className}`}>
                    {children}
                </h4>
            );
        case 'h5':
            return (
                <h5 className={`font-bold text-lg text-current	 ${className}`}>
                    {children}
                </h5>
            );
    }
};
export default Title;
