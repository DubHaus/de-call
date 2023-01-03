import {ReactNode} from 'react';
import Container from '../container';
import Text from '../typography/text';

interface Props {
    loading?: boolean;
    children?: ReactNode;
}

const Loader = ({loading = true, children = null}: Props) => (
    <Container>{loading ? <Text>Loading...</Text> : children}</Container>
);

export default Loader;
