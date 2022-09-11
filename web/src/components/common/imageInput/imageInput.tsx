import Image from 'next/image';
import {ChangeEvent, useEffect, useState} from 'react';
import Container from '../container';
import Icon from '../icon';
import styles from './style.module.scss';

type Props = {};

const ImageInput = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const fileHandler = ({target: {files}}: ChangeEvent<HTMLInputElement>) => {
        if (!files || files.length === 0) {
            return;
        }
        setFile(files[0]);
    };

    useEffect(() => {
        if (file) {
            // create the preview
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    return (
        <Container className={`${styles.container} ${!file && styles.empty}`}>
            <label>
                <input type="file" onChange={fileHandler} />
                {preview ? <Image src={preview} layout="fill" /> : null}
                <Container className={styles.imageForeground}>
                    <Container className={styles.iconBackground}>
                        <Icon className={styles.icon} icon="add-photo" />
                    </Container>
                </Container>
            </label>
        </Container>
    );
};

export default ImageInput;
