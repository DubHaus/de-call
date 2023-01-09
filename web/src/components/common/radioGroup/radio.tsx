import {ReactNode} from 'react';
import Container from '../container';

type Props = {
    children?: ReactNode;
    onChange?: (value: boolean) => void;
    value?: boolean;
    classNameName?: string;
};

const RadioGroup = ({children, onChange, value, classNameName = ''}: Props) => (
    <Container className="form-check">
    </Container>
);

export default RadioGroup;
