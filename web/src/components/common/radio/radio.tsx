import {uniqueId} from 'lodash';
import {ReactNode, useMemo} from 'react';
import Container from '../container';

type Props<T> = {
    children?: ReactNode;
    onChange?: (value: T) => void;
    value: T;
    className?: string;
    checked?: boolean;
};

const Radio = <T extends any>({
    children,
    onChange,
    checked,
    value,
    className = '',
}: Props<T>) => {
    const id = useMemo(() => uniqueId(), []);
    return (
        <Container className={`${className} cursor-pointer`}>
            <input
                id={id}
                className="appearance-none rounded-full h-4 w-4 border border-solid border-indigo-600  checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                checked={checked}
                onChange={onChange && (e => onChange(value))}
            />
            <label htmlFor={id} className="inline-block text-gray-800 cursor-pointer">
                {children}
            </label>
        </Container>
    );
};

export default Radio;
