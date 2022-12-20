import Button from '@components/common/button';
import Container from '@components/common/container';
import {ReactNode} from 'react';

export type TAlertType = 'error' | 'warning'

type Props = {
    children: ReactNode;
    close: () => void;
    type?: TAlertType;
};

const Alert = ({children, close, type = 'warning'}: Props) => (
    <Container
        className={`z-10 fixed max-w-[300px] top-5 right-5 bg-slate-50 shadow p-4 ${
            type === 'error' ? 'bg-red-200' : 'bg-orange-200'
        } `}>
        <Container className="flex justify-between">
            <Container>{children}</Container>
            <Button size="xs" icon="close" onClick={close} />
        </Container>
    </Container>
);

export default Alert;
