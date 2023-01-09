import {Omit} from 'src/types/utils';
import {useMemo, useState} from 'react';
import Container from '../container';
import {useErrorWithFocus} from 'src/hooks/common';

interface Props {
    value?: string;
    label?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    clearable?: boolean;
    error?: string;
}

const TextArea = ({
    value = '',
    label,
    placeholder = '',
    onChange,
    className = '',
    clearable,
    error,
    onFocus,
    onBlur,
    ...props
}: Props & Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'>) => {
    const [errorToShow, setDirty] = useErrorWithFocus(error);
    const [focused, setFocused] = useState(false);

    const filled = useMemo(() => !!value, [value]);

    return (
        <Container className={className}>
            <fieldset
                className={`border border-solid rounded w-full transition-all duration-300 ${
                    focused
                        ? 'border-indigo-500 ring  ring-indigo-500/20'
                        : errorToShow
                        ? 'border-red-400'
                        : 'border-slate-400'
                }`}>
                <legend
                    className={`text-sm transition-all px-1 h-0 relative top-[-10px]  ${
                        errorToShow ? 'text-red-600' : 'text-slate-600'
                    } ${!filled ? 'hidden' : ''}`}>
                    {label}
                </legend>
                <textarea
                    onFocus={e => {
                        setFocused(true);
                        onFocus && onFocus(e);
                    }}
                    onBlur={e => {
                        setFocused(false);
                        onBlur && onBlur(e);
                    }}
                    value={value}
                    onChange={e => {
                        onChange && onChange(e.target.value);
                        setDirty();
                    }}
                    placeholder={placeholder}
                    className={`w-full text-current p-3 h-full min-h-[150px]  placeholder:text-slate-400 ${className}`}
                    {...props}
                />
            </fieldset>
            {errorToShow ? (
                <span className="text-red-600 text-sm">{errorToShow}</span>
            ) : null}
        </Container>
    );
};

export default TextArea;
