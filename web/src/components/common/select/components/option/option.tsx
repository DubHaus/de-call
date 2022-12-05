import {useEffect, useRef} from 'react';
import Container from 'src/components/common/container';
import styles from './option.module.scss';

export type SelectOption = {
    value: string;
    title: string;
};

type Props = {
    select: (value: SelectOption['value']) => void;
    selected?: boolean;
} & SelectOption;

const Option = ({select, value, title, selected}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        selected &&
            ref.current?.scrollIntoView({
                block: 'center',
                inline: 'start',
            });
    }, [ref, selected]);

    return (
        <Container
            ref={ref}
            onClick={() => select(value)}
            className={`${styles.option} ${selected && styles.active}`}>
            {title}
        </Container>
    );
};

export default Option;
