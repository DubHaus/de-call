import {useRouter} from 'next/router';
import Button from 'src/components/common/button';
import Container from '../../../common/container';
import {setAccessToken} from 'src/utils/accessToken';
import { useLogoutMutation } from 'src/generated/graphql';

const Logout = () => {
    const router = useRouter();
    const [logout] = useLogoutMutation()
    return (
        <Container>
            <Button
                onClick={async () => {
                    await logout();
                    setAccessToken('');
                    router.reload();
                }}>
                Logout
            </Button>
        </Container>
    );
};

export default Logout;
