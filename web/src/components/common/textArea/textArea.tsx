import {Omit} from 'src/types/utils';
import {useState} from 'react';

interface Props {
    value?: string;
    label?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    clearable?: boolean;
}

const TextArea = ({
    value = '',
    label,
    placeholder = '',
    onChange,
    className = '',
    clearable,
    ...props
}: Props & Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'>) => {
    const [focus, setFocus] = useState(false);

    return (
        <fieldset
            className={`border border-solid rounded border-slate-400 w-full ${className}`}>
            <legend
                className={`text-sm transition-all px-1 h-0 relative top-[-10px]  text-slate-600 ${
                    !focus ? 'hidden' : ''
                }`}>
                {label}
            </legend>
            <textarea
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={value}
                onChange={onChange ? e => onChange(e.target.value) : undefined}
                placeholder={placeholder}
                className={`w-full text-current p-3 h-full min-h-[150px]  placeholder:text-slate-400 ${className}`}
                {...props}
            />
        </fieldset>
    );
};

export default TextArea;
