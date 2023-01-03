import Button from 'src/components/common/button';
import Container from '../../../common/container';

const Login = () => {
    return (
        <Container>
            <Button href="/signup" className="mr-5" type="secondary">
                Sign up
            </Button>
            <Button href="/login">Login</Button>
        </Container>
    );
};

export default Login;
