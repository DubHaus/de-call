import {useOutsideClick} from 'src/hooks/utilsHooks';
import {ReactNode, useRef} from 'react';
import Container from '../container';
import Button from '../button';
import Title from '../typography/title';

type Props = {
    children: ReactNode;
    close: () => void;
    className?: string;
    title?: string;
    buttons?: ReactNode;
    closeOutside?: boolean;
};

const Modal = ({
    children,
    close,
    className,
    title,
    buttons = null,
    closeOutside,
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, close);

    return (
        <Container className="z-10">
            <Container className="fixed w-full h-full top-0 left-0 bg-opacity-20 bg-gray-400" />
            <Container className="fixed w-full h-full top-0 left-0 overflow-auto">
                <Container
                    ref={closeOutside ? ref : null}
                    className={`${className} absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  max-h-[80%]`}>
                    <Container className="bg-slate-50 p-4 rounded">
                        <Container className="flex justify-between">
                            <Title level="h3">{title}</Title>
                            <Button size="sm" icon="close" onClick={close} />
                        </Container>
                        {children}
                        <Container className="mt-5 flex justify-end">
                            {buttons}
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
};

export default Modal;
