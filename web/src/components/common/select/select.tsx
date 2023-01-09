import {useEffect, useMemo, useRef, useState} from 'react';
import Container from '../container';
import Input from '../input';
import Icon from '../icon';
import {useOutsideClick} from 'src/hooks/utilsHooks';
import Option, {SelectOption} from './components/option';
import Loader from '../loader';
import {useErrorWithFocus} from 'src/hooks/common';

type Props<T> = {
    value?: T;
    label?: string;
    name?: string;
    onChange?: (value: T) => void;
    placeholder?: string;
    options?: SelectOption[];
    className?: string;
    clearable?: boolean;
    multiple?: boolean;
    fetch?: () => any;
    loading?: boolean;
    error?: string;
};

const Select = <T extends SelectOption | SelectOption[] | null>({
    value,
    label,
    name,
    className,
    placeholder = '',
    onChange,
    options = [],
    clearable = false,
    multiple,
    fetch,
    loading,
    error,
}: Props<T>) => {
    const ref = useRef<HTMLDivElement>(null);

    const [errorToShow, setDirty] = useErrorWithFocus(error);

    const values = useMemo<SelectOption[]>(
        () => (value ? (Array.isArray(value) ? [...value] : [value]) : []),
        [value]
    );

    const [showDropdown, setShowDropdown] = useState(false);
    const [search, setSearch] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    const onSelect = (option: SelectOption) => {
        if (onChange) {
            const idx = values.findIndex(el => el.value === option.value);

            const newValue =
                idx !== -1
                    ? [...values.slice(0, idx), ...values.slice(idx + 1)]
                    : [...values, option];
            // @ts-ignore: Don't know how to fix this issue
            onChange && onChange(multiple ? newValue : newValue[0]);
        }
        !multiple && closeDropdown();
        setDirty();
    };

    const openDropdown = () => {
        fetch && fetch();
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
        () =>
            multiple ? values.map(el => el.title).join('; ') : values[0]?.title,
        [options, values, multiple]
    );

    useOutsideClick(ref, closeDropdown);

    return (
        <Container ref={ref} className={`relative ${className}`}>
            <Input
                value={searchActive ? search : valueStr}
                name={name}
                clearable={clearable}
                label={label}
                placeholder={(searchActive && valueStr) || placeholder}
                onChange={setSearch}
                onFocus={openDropdown}
                error={errorToShow}
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
            {showDropdown ? (
                <Container className="absolute left-0 top-[52px] border border-slate-400 rounded bg-white z-10 w-full max-h-[240px] overflow-y-scroll">
                    <Loader loading={loading}>
                        {optionsToShow.map(option => (
                            <Option
                                key={option.value}
                                multiple={multiple}
                                onClick={() => onSelect(option)}
                                selected={values.some(
                                    el => el.value === option.value
                                )}>
                                {option.title}
                            </Option>
                        ))}
                    </Loader>
                </Container>
            ) : null}
        </Container>
    );
};

export default Select;
