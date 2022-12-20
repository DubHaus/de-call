import {GetServerSidePropsContext} from 'next';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const AccountCreationPages = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace('account-creation/page-1');
    });
    return null;
};

export const getServerSideProps = async ({res}: GetServerSidePropsContext) => {
    res.setHeader('location', `/account-creation/page-1`);

    res.statusCode = 302;
    res.end();

    return {props: {}};
};

export default AccountCreationPages;
