import {ReactNode} from 'react';
import styles from './title.module.scss';

type Props = {
    children: ReactNode;
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
};

const Title = ({children, level = 'h1', className = ''}: Props) => {
    switch (level) {
        case 'h1':
            return <h1 className={`${styles.h1} ${className}`}>{children}</h1>;
        case 'h2':
            return <h2 className={`${styles.h2} ${className}`}>{children}</h2>;
        case 'h3':
            return <h3 className={`${styles.h3} ${className}`}>{children}</h3>;
        case 'h4':
            return <h4 className={`${styles.h4} ${className}`}>{children}</h4>;
        case 'h5':
            return <h5 className={`${styles.h5} ${className}`}>{children}</h5>;
        case 'h6':
            return <h6 className={`${styles.h6} ${className}`}>{children}</h6>;
    }
};
export default Title;
