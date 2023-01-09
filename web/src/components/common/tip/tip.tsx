import {ReactNode, useState} from 'react';
import Container from '../container';

type Props = {
    children: ReactNode;
    content: ReactNode;
};

const Tip = ({children, content}: Props) => {
    const [show, setShow] = useState(false);
    return (
        <Container
            onHover={() => setShow(true)}
            onBlur={() => setShow(false)}
            className="relative">
            {show ? (
                <Container className="absolute left-[20%] top-[80%] w-40 p-1 rounded bg-indigo-600/70 text-slate-50 text-sm">
                    {content}
                </Container>
            ) : null}
            {children}
        </Container>
    );
};

export default Tip;
