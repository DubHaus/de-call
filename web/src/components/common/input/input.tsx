import {Omit} from 'src/types/utils';
import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import Container from '../container';
import {useErrorWithFocus} from 'src/hooks/common';

interface Props {
    value?: string;
    label?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    clearable?: boolean;
    right?: ReactNode;
    error?: string;
}

const Input = ({
    value = '',
    label,
    placeholder = '',
    onChange,
    className = '',
    clearable,
    right,
    error,
    onFocus,
    onBlur,
    ...props
}: Props & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>) => {
    const [errorToShow, setDirty] = useErrorWithFocus(error);
    const [focused, setFocused] = useState(false);

    const filled = useMemo(() => !!value, [value]);

    return (
        <Container className={className}>
            <fieldset
                className={`border border-solid flex items-center justify-between rounded w-full transition-all duration-300
                ${
                    focused
                        ? 'border-indigo-500 ring  ring-indigo-500/20'
                        : errorToShow
                        ? 'border-red-400'
                        : 'border-slate-400'
                }`}>
                {label ? (
                    <legend
                        className={`text-sm transition-all px-1 h-0 relative top-[-10px] ${
                            errorToShow ? 'text-red-600' : 'text-slate-600'
                        }  ${!filled ? 'hidden' : ''}`}>
                        {label}
                    </legend>
                ) : null}
                <input
                    value={value}
                    onChange={e => {
                        onChange && onChange(e.target.value);
                        setDirty();
                    }}
                    onFocus={e => {
                        setFocused(true);
                        onFocus && onFocus(e);
                    }}
                    onBlur={e => {
                        setFocused(false);
                        onBlur && onBlur(e);
                    }}
                    placeholder={placeholder}
                    className="w-full p-3  text-current placeholder:text-slate-400 h-[48px]"
                    {...props}
                />
                {right ? <Container className="pr-3">{right}</Container> : null}
            </fieldset>
            {errorToShow ? (
                <span className="text-red-600 text-sm">{errorToShow}</span>
            ) : null}
        </Container>
    );
};

export default Input;
