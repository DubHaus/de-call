import {ChangeEvent} from 'react';
import {DefaultProps} from 'src/types/input';
import Container from '../container';
import Icon from '../icon';
import Text from '../typography/text';

type Props = {
    onChange: (file: File) => void;
    value: string;
    preview?: boolean;
} & DefaultProps;

const ImageInput = ({
    onChange,
    value,
    preview,
    label,
    className,
    error,
    name,
    placeholder,
}: Props) => {
    const fileHandler = ({
        target: {files, validity},
    }: ChangeEvent<HTMLInputElement>) => {
        if (!files || files.length === 0 || !validity.valid) {
            return;
        }
        onChange(files[0]);
    };
    return (
        <Container className={`flex items-center ${className}`}>
            <div className="shrink-0">
                {preview ? (
                    value ? (
                        <img
                            className="mr-4 object-cover w-16 h-16 rounded-full"
                            alt="profile photo"
                            src={value}
                        />
                    ) : (
                        <Container className="mr-4 w-16 h-16 rounded-full inline-flex justify-center items-center bg-indigo-100">
                            <Icon icon="profile" />
                        </Container>
                    )
                ) : null}
            </div>
            <label className="block">
                <Text className="mb-1" size="sm">
                    {label}
                </Text>
                <span className="sr-only cursor-pointer">Choose File</span>
                <input
                    onChange={fileHandler}
                    type="file"
                    name={name}
                    placeholder={placeholder}
                    className="block w-full cursor-pointer text-sm text-current file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
            </label>
        </Container>
    );
};

export default ImageInput;
