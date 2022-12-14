import Button from 'src/components/common/button';
import Flex from 'src/components/common/flex';
import Input from 'src/components/common/input';
import Link from 'src/components/common/typography/link';
import Modal from 'src/components/common/modal';
import Title from 'src/components/common/typography/title';
import {useState} from 'react';
import styles from './login.module.scss';
import Container from '../common/container';

const Login = () => {
    return (
        <Container>
            <Button className='mr-5' type="secondary">Sign up</Button>
            <Button>Login</Button>
        </Container>
    );
};

export default Login;
