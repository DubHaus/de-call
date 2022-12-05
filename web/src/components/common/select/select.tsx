import {useEffect, useMemo, useRef, useState} from 'react';
import Container from '../container';
import styles from './select.module.scss';
import Input from '../input';
import Icon from '../icon';
import {useOutsideClick} from 'src/hooks/utilsHooks';
import Option, {SelectOption} from './components/option';

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
    compact?: boolean;
    clearable?: boolean;
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
    compact = false,
    clearable = false,
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const [showDropdown, setShowDropdown] = useState(false);
    const [search, setSearch] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    const onSelect = (option: string) => {
        onChange && onChange(option);
        closeDropdown();
    };

    const openDropdown = () => {
        setShowDropdown(true);
        setSearchActive(true);
        ref.current?.focus();
    };

    const closeDropdown = () => {
        setShowDropdown(false);
        setSearchActive(false);
        setSearch('');
    };

    const optionsToShow = useMemo(
        () =>
            options.filter(el =>
                el.title.toLowerCase().includes(search.toLowerCase())
            ),
        [search, options]
    );

    const valueStr = useMemo(
        () => options.find(el => el.value === value)?.title,
        [options, value]
    );

    useOutsideClick(ref, closeDropdown);

    return (
        <Container ref={ref} className={`${styles.container} ${className}`}>
            <Input
                value={searchActive ? search : valueStr}
                name={name}
                clearable={clearable}
                altBackground={altBackground}
                className={styles.input}
                label={label}
                placeholder={placeholder || (searchActive && valueStr) || ''}
                onChange={value => {
                    setSearch(value);
                }}
                onFocus={openDropdown}
                compact={compact}
                right={
                    !hideIndicator ? (
                        <Icon
                            onClick={
                                showDropdown ? closeDropdown : openDropdown
                            }
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
                    {optionsToShow.map(option => (
                        <Option
                            key={option.value}
                            {...option}
                            select={onSelect}
                            selected={value === option.value}
                        />
                    ))}
                </Container>
            ) : null}
        </Container>
    );
};

export default Select;
