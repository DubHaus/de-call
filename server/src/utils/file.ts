import fs, {ReadStream, unlink} from 'fs';
import {join} from 'path';

type Args = {
    stream: ReadStream;
    filename: string;
};

export const storeFS = ({stream, filename}: Args): Promise<string> => {
    const path = join(__dirname, '../../images', filename);
    return new Promise((resolve, reject) =>
        stream
            .on('error', (error: any) => reject(error))
            .pipe(fs.createWriteStream(path))
            .on('error', (error: any) => reject(error))
            .on('finish', () => resolve(path))
    );
};

export const deleteFile = (path: string): Promise<void> =>
    new Promise((res, rej) => {
        unlink(path, err => {
            if (err) rej(err);
            console.log(`${path} was deleted`);
            res();
        });
    });

export const splitImageExt = (filename: string) => {
    const matches = [
        ...filename.matchAll(/(.*)\.(gif|jpe?g|tiff?|png|webp|bmp)$/gi),
    ][0];
    return [matches[1], matches[2]];
};
