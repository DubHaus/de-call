import {Omit} from 'src/types/utils';
import {useState} from 'react';
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
    ...props
}: Props & Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'>) => {
    const [errorToShow, setDirty] = useErrorWithFocus(error);
    const [focus, setFocus] = useState(false);

    return (
        <Container>
            <fieldset
                className={`border border-solid rounded w-full ${
                    errorToShow ? 'border-red-400' : 'border-slate-400'
                } ${className}`}>
                <legend
                    className={`text-sm transition-all px-1 h-0 relative top-[-10px]  ${
                        errorToShow ? 'text-red-600' : 'text-slate-600'
                    } ${!focus ? 'hidden' : ''}`}>
                    {label}
                </legend>
                <textarea
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
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
