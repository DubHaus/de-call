import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Header from 'src/components/header';
import Menu from 'src/components/menu';
import {ReactNode, useState} from 'react';

type Props = {
    children: ReactNode;
    title?: string;
    alt?: boolean;
};

const Layout = ({children, title, alt}: Props) => {
    const [open, setOpen] = useState(false);
    return alt ? (
        <Container className='min-h-screen' >
            <Header title={title} className="sticky top-0" />
            {children}
        </Container>
    ) : (
        <Flex className="h-screen w-screen" align="stretch">
            <Menu toggle={setOpen} open={open} />

            <Container className="overflow-y-scroll w-full">
                <Header title={title} className="sticky top-0" />
                {children}
            </Container>
        </Flex>
    );
};

export default Layout;
