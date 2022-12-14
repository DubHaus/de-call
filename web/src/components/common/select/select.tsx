import {useEffect, useMemo, useRef, useState} from 'react';
import Container from '../container';
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
        <Container ref={ref} className={`relative ${className}`}>
            <Input
                value={searchActive ? search : valueStr}
                name={name}
                clearable={clearable}
                className=""
                label={label}
                placeholder={placeholder || (searchActive && valueStr) || ''}
                onChange={value => {
                    setSearch(value);
                }}
                onFocus={openDropdown}
                right={
                    <Icon
                        onClick={showDropdown ? closeDropdown : openDropdown}
                        className={` w-5 h-5 text-slate-400 ${
                            showDropdown && 'rotate-180'
                        }`}
                        icon="down"
                    />
                }
            />
            {showDropdown && optionsToShow.length ? (
                <Container className="absolute left-0 top-[52px] border border-slate-400 rounded w-full">
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
