import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import {useErrorWithFocus} from 'src/hooks/common';
import {DefaultProps} from 'src/types/input';
import Container from '../container';

type Props = {
    value: string | null;
    onChange: (value: string | null) => void;
} & DefaultProps;

const DateInput = ({className, value, onChange, placeholder, error}: Props) => {
    const [errorToShow, setDirty] = useErrorWithFocus(error);
    const handleValueChange = (
        newValue: {
            startDate: string | Date | null;
            endDate: string | Date | null;
        } | null
    ) => {
        setDirty();
        if (newValue?.startDate instanceof Date) {
            newValue.startDate = newValue.startDate.toString();
        }
        onChange(newValue?.startDate || null);
    };

    return (
        <Container className={className}>
            <Datepicker
                primaryColor={'indigo'}
                placeholder={placeholder}
                inputClassName={`text-current text-base font-normal bg-transparent rounded border border-solid  h-[51px] ${
                    errorToShow ? 'border-red-400' : 'border-slate-400'
                }`}
                useRange={false}
                asSingle={true}
                value={{startDate: value, endDate: value}}
                onChange={handleValueChange}
                displayFormat="DD.MM.YYYY"
            />
            {errorToShow ? (
                <span className="text-red-600 text-sm">{errorToShow}</span>
            ) : null}
        </Container>
    );
};
export default DateInput;
