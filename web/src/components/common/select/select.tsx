import {useRef, useState} from 'react';
import Container from '../container';
import styles from './select.module.scss';
import Input from '../input';
import Icon from '../icon';
import {useOutsideClick} from 'src/hooks/utilsHooks';

type Option = {
    value: string;
    title: string;
};

type Props = {
    value?: string;
    label?: string;
    name?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    options: Option[];
    className?: string;
};

const Select = ({
    value = '',
    label,
    name,
    className,
    placeholder = '',
    onChange,
    options,
}: Props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const onSelect = (option: string) => {
        setShowDropdown(false);
        onChange && onChange(option);
    };

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setShowDropdown(false));

    return (
        <Container ref={ref} className={`${styles.container} ${className}`}>
            <Input
                value={value}
                name={name}
                clearable
                label={label}
                placeholder={placeholder}
                onFocus={() => setShowDropdown(true)}
                right={
                    <Icon
                        onClick={() => setShowDropdown(!showDropdown)}
                        className={`${styles.icon} ${
                            showDropdown && styles.rotate
                        }`}
                        icon="down"
                    />
                }
            />
            {showDropdown ? (
                <Container className={styles.options}>
                    {options.map(({title, value: option}) => (
                        <Container
                            onClick={() => onSelect(value)}
                            className={`${styles.option} ${
                                value === option && styles.active
                            }`}>
                            {title}
                        </Container>
                    ))}
                </Container>
            ) : null}
        </Container>
    );
};

export default Select;
