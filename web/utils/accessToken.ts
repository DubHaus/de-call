import jwtDecode from 'jwt-decode';

let accesToken = '';

export const getAccessToken = () => accesToken;

export const setAccessToken = (token: string) => (accesToken = token);

export const validateAccessToken = (token: string) => {
    try {
        const data = jwtDecode(token) as {exp?: number};
        if (data.exp && Date.now() >= data?.exp * 1000) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;
    }
};

export const refreshAccessToken = async () =>
    fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include',
    }).then(async res => {
        const {accessToken} = await res.json();
        setAccessToken(accessToken);
    });
