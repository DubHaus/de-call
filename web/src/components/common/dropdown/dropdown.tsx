import {useMemo, useRef, useState} from 'react';
import Container from '../container';
import Icon from '../icon';
import {useOutsideClick} from 'src/hooks/utilsHooks';
import Text from '../typography/text';
import styles from './dropdown.module.scss';
import Flex from '../flex';

export type DropdownOption = {
    value: string;
    title: string;
};

type Props = {
    value?: string;
    label?: string;
    name?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    options: DropdownOption[];
    className?: string;
    hideIndicator?: boolean;
    altBackground?: boolean;
};

const Dropdown = ({
    value = '',
    label,
    name,
    className,
    placeholder = '',
    onChange,
    options,
    altBackground,
    hideIndicator = false,
}: Props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const onSelect = (option: string) => {
        setShowDropdown(false);
        onChange && onChange(option);
    };

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setShowDropdown(false));

    const valueText = useMemo(
        () => options.find(el => el.value === value)?.title,
        [options, value]
    );

    return (
        <Container ref={ref} className={`${styles.container} ${className}`}>
            <Container
                onClick={() => setShowDropdown(!showDropdown)}
                className={styles.value}>
                <Flex gap={10}>
                    <Text>{valueText}</Text>
                    {!hideIndicator ? (
                        <Icon
                            onClick={() => setShowDropdown(!showDropdown)}
                            className={`${styles.icon} ${
                                showDropdown && styles.rotate
                            }`}
                            icon="down"
                        />
                    ) : null}
                </Flex>
            </Container>
            {showDropdown ? (
                <Container className={styles.options}>
                    {options.map(({title, value: option}) => (
                        <Container
                            onClick={() => onSelect(option)}
                            className={`${styles.option} ${
                                value === option && styles.active
                            }`}>
                            {title}
                        </Container>
                    ))}
                </Container>
            ) : null}
        </Container>
    );
};

export default Dropdown;
