import {ReactNode} from 'react';
import {Omit} from 'src/types/utils';

type Props = {
    children: ReactNode;
    onSubmit: () => void;
};

const Form = ({
    children,
    onSubmit,
    ...rest
}: Props & Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'>) => (
    <form
        {...rest}
        onSubmit={e => {
            e.preventDefault();
            onSubmit();
        }}>
        {children}
    </form>
);

export default Form;
