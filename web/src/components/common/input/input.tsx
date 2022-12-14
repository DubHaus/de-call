import {Omit} from 'src/types/utils';
import {ReactNode, useState} from 'react';
import Container from '../container';

interface Props {
    value?: string;
    label?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    clearable?: boolean;
    right?: ReactNode;
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
    ...props
}: Props & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>) => {
    const [focus, setFocus] = useState(false);

    return (
        <fieldset
            className={`border border-solid flex items-center justify-between rounded border-slate-400 w-full ${className}`}>
            <legend
                className={`text-sm transition-all px-1 h-0 relative top-[-10px]  text-slate-600 ${
                    !focus ? 'hidden' : ''
                }`}>
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
                className="w-full p-3  text-current  placeholder:text-slate-400 ${className}"
                {...props}
            />
            <Container className="pr-3">{right}</Container>
        </fieldset>
    );
};

export default Input;
