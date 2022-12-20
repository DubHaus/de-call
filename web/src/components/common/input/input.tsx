import {Omit} from 'src/types/utils';
import React, {ReactNode, useState} from 'react';
import Container from '../container';

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
    onFocus,
    onBlur,
    clearable,
    right,
    error,
    ...props
}: Props & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>) => {
    const [focus, setFocus] = useState(false);

    return (
        <Container className={className}>
            <fieldset
                className={`border border-solid flex items-center justify-between rounded w-full  ${
                    error ? 'border-red-400' : 'border-slate-400'
                }`}>
                <legend
                    className={`text-sm transition-all px-1 h-0 relative top-[-10px] ${
                        error ? 'text-red-600' : 'text-slate-600'
                    }  ${!focus ? 'hidden' : ''}`}>
                    {label}
                </legend>
                <input
                    onFocus={e => {
                        setFocus(true);
                        onFocus && onFocus(e);
                    }}
                    onBlur={e => {
                        setFocus(false);
                        onBlur && onBlur(e);
                    }}
                    value={value}
                    onChange={onChange ? e => onChange(e.target.value) : undefined}
                    placeholder={placeholder}
                    className="w-full p-3  text-current placeholder:text-slate-400"
                    {...props}
                />
                {right ? <Container className="pr-3">{right}</Container> : null}
            </fieldset>
            {error ? (
                <span className="text-red-600 text-sm">{error}</span>
            ) : null}
        </Container>
    );
};

export default Input;
