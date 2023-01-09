import Button from 'src/components/common/button';
import Container from '../../../common/container';

const Login = () => {
    return (
        <Container>
            <Button size="sm" href="/signup" className="mr-5" type="secondary">
                Sign up
            </Button>
            <Button size="sm" href="/login">Login</Button>
        </Container>
    );
};

export default Login;
