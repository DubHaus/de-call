import {Response} from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('rto', token, {httpOnly: true}); // refresh refresh token
};
