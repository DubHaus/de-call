import {ReactNode} from 'react';
import Container from '../container';
import Text from '../typography/text';

interface Props {
    loading?: boolean;
    children?: ReactNode;
}

const Loader = ({loading = true, children = null}: Props) =>
    loading ? <Text>Loading...</Text> : <>{children}</>;

export default Loader;
