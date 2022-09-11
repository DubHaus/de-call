import {ReactNode} from 'react';
import Container from '../container';
import Flex from '../flex';
import {Omit} from 'src/types/utils';
import styles from './textArea.module.scss';

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
}

const TextArea = ({
    value = '',
    label,
    placeholder = '',
    left = null,
    right = null,
    onChange,
    className = '',
    compact = false,
    altBackground = false,
    ...props
}: Props & Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'>) => (
    <Container
        className={`${styles.container} ${
            compact && styles.compact
        }  ${className} ${altBackground && styles.altBackground} `}>
        <Flex gap={10}>
            {label && value && <label className={styles.label}>{label}</label>}
            {left && <Container>{left}</Container>}
            <textarea
                {...props}
                value={value}
                placeholder={placeholder}
                onChange={onChange && (e => onChange(e.target.value))}
            />
            {right && <Container>{right}</Container>}
        </Flex>
    </Container>
);

export default TextArea;
