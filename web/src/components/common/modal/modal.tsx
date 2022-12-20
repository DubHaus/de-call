import {useOutsideClick} from 'src/hooks/utilsHooks';
import {ReactNode, useRef} from 'react';
import Container from '../container';
import Button from '../button';
import Title from '../typography/title';

type Props = {
    children: ReactNode;
    close: () => void;
    width?: number | 'min-content' | 'fit-content';
    title?: string;
    buttons?: ReactNode;
};

const Modal = ({
    children,
    close,
    width = 'min-content',
    title,
    buttons = null,
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, close);

    return (
        <Container className="z-10 fixed w-full h-full top-0 left-0 bg-opacity-20 bg-gray-400">
            <Container className="w-[400px] bg-slate-50 rounded absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4">
                <Container className="flex justify-between">
                    <Title level="h3">{title}</Title>
                    <Button size="sm" icon="close" />
                </Container>
                <Container className="mt-5">{children}</Container>
                <Container className="mt-5 flex justify-end ">
                    {buttons}
                </Container>
            </Container>
        </Container>
    );
};

export default Modal;
