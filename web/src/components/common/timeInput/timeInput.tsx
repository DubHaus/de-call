import {useMemo} from 'react';
import Select from '../select';
import {SelectOption} from '../select/select';
import styles from './timeInput.module.scss';
import {generateIdxFromTime, generateTimeFromIdx} from './utils';

interface Props {
    value?: string;
    label?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    name?: string;
    from?: string;
    until?: string;
    step?: number;
    altBackground?:boolean
}

const TimeInput = ({
    value,
    onChange,
    className,
    label,
    name,
    placeholder,
    from = '0:00',
    until = '24:00',
    step = 15,
    altBackground,
}: Props) => {
    const timeOptions = useMemo(() => {
        const startIdx = generateIdxFromTime(from, step);
        const stopIdx = generateIdxFromTime(until, step);
        let options: SelectOption[] = Array.from(Array(24 * (60 / step)).keys())
            .filter(idx => startIdx <= idx && idx <= stopIdx)
            .map(idx => {
                const time = generateTimeFromIdx(idx, step);
                return {
                    title: time,
                    value: time,
                };
            });
        return options;
    }, [from, until]);

    return (
        <Select
            value={value}
            onChange={onChange}
            className={`${className} ${styles.container}`}
            label={label}
            altBackground={altBackground}
            name={name}
            placeholder={placeholder}
            // hideIndicator
            options={timeOptions}
        />
    );
};

export default TimeInput;
