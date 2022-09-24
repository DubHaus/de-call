import {useRef, useState} from 'react';
import Container from '../container';
import styles from './select.module.scss';
import Input from '../input';
import Icon from '../icon';
import {useOutsideClick} from 'src/hooks/utilsHooks';

export type SelectOption = {
    value: string;
    title: string;
};

type Props = {
    value?: string;
    label?: string;
    name?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    options: SelectOption[];
    className?: string;
    hideIndicator?: boolean;
    altBackground?: boolean;
};

const Select = ({
    value = '',
    label,
    name,
    className,
    placeholder = '',
    onChange,
    options,
    altBackground,
    hideIndicator = false,
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
                altBackground={altBackground}
                className={styles.input}
                label={label}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={() => setShowDropdown(true)}
                right={
                    !hideIndicator ? (
                        <Icon
                            onClick={() => setShowDropdown(!showDropdown)}
                            className={`${styles.icon} ${
                                showDropdown && styles.rotate
                            }`}
                            icon="down"
                        />
                    ) : null
                }
            />
            {showDropdown ? (
                <Container className={styles.options}>
                    {options.map(({title, value: option}) => (
                        <Container
                            onClick={() => onSelect(option)}
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
