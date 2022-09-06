import {ReactNode} from 'react';
import Container from '../container';
import Flex from '../flex';
import styles from './input.module.scss';

type Props = {
    value?: string;
    onChange?: (value: string) => void;
    left?: ReactNode;
    placeholder?: string;
    right?: ReactNode;
    className?: string;
    compact?: boolean;
    altBackground?: boolean;
};

const Input = ({
    value = '',
    placeholder = '',
    left = null,
    right = null,
    onChange,
    className = '',
    compact = false,
    altBackground = false,
}: Props) => (
    <Container
        className={`${styles.container} ${
            compact && styles.compact
        }  ${className} ${altBackground && styles.altBackground} `}>
        <Flex gap={10}>
            {left && <Container>{left}</Container>}
            <input
                value={value}
                placeholder={placeholder}
                onChange={onChange && (e => onChange(e.target.value))}
            />
            {right && <Container>{right}</Container>}
        </Flex>
    </Container>
);

export default Input;
