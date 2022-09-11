import {HTMLInputTypeAttribute, ReactNode} from 'react';
import Container from '../container';
import Flex from '../flex';
import {Omit} from 'src/types/utils';
import styles from './input.module.scss';
import Icon from '../icon';

interface Props {
    value?: string;
    label?: string;
    onChange?: (value: string) => void;
    left?: ReactNode;
    placeholder?: string;
    right?: ReactNode;
    className?: string;
    compact?: boolean;
    altBackground?: boolean;
    clearable?: boolean;
}

const Input = ({
    value = '',
    label,
    placeholder = '',
    left = null,
    right = null,
    onChange,
    className = '',
    compact = false,
    altBackground = false,
    clearable,
    ...props
}: Props & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>) => (
    <Container
        className={`${styles.container} ${
            compact && styles.compact
        }  ${className} ${altBackground && styles.altBackground} `}>
        {label && value && <label className={styles.label}>{label}</label>}
        <Flex gap={10}>
            {left && <Container>{left}</Container>}
            <input
                {...props}
                value={value}
                placeholder={placeholder}
                onChange={onChange && (e => onChange(e.target.value))}
            />
            {clearable && value ? (
                <Icon
                    className={styles.icon}
                    icon="close"
                    onClick={onChange && (() => onChange(''))}
                />
            ) : null}
            {right}
        </Flex>
    </Container>
);

export default Input;
