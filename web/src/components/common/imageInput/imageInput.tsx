import Image from 'next/image';
import {ChangeEvent, useEffect, useState} from 'react';
import Container from '../container';
import Icon from '../icon';
import styles from './style.module.scss';

type Props = {
    onChange: (file: File) => void;
    value: string;
};

const ImageInput = ({onChange, value}: Props) => {
    const fileHandler = ({
        target: {files, validity},
    }: ChangeEvent<HTMLInputElement>) => {
        if (!files || files.length === 0 || !validity.valid) {
            return;
        }
        onChange(files[0]);
    };
    return (
        <Container className="flex items-center space-x-6">
            <div className="shrink-0">
                {value ? (
                    <img
                        className="object-cover w-16 h-16 rounded-full"
                        alt="profile photo"
                        src={value}
                    />
                ) : (
                    <Container className="w-16 h-16 rounded-full inline-flex justify-center items-center bg-indigo-100">
                        <Icon icon="profile" />
                    </Container>
                )}
            </div>
            <label className="block">
                <span className="sr-only">Choose File</span>
                <input
                    onChange={fileHandler}
                    type="file"
                    className="block w-full text-sm text-current file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
            </label>
        </Container>
    );
};

export default ImageInput;
