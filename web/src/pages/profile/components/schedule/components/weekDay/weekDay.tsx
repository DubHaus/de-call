import {useState} from 'react';
import Button from 'src/components/common/button';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import TimeInput from 'src/components/common/timeInput';
import Text from 'src/components/common/typography/text';
import styles from './weekDay.module.scss';

type Props = {
    day: string;
};

const WeekDay = ({day}: Props) => {
    const [timeFrom, setTimeFrom] = useState('');
    const [timeUntil, setTimeUntil] = useState('');

    return (
        <Container className={styles.weekday}>
            <Flex justify="end" gap={15}>
                <Text className={styles.dayName}>{day}</Text>
                <Flex gap={15}>
                    <TimeInput
                        from="9:00"
                        altBackground
                        compact
                        value={timeFrom}
                        onChange={setTimeFrom}
                    />
                    <TimeInput
                        from="12:00"
                        altBackground
                        compact
                        value={timeUntil}
                        onChange={setTimeUntil}
                    />
                </Flex>
                <Button compact icon="plus" />
            </Flex>
        </Container>
    );
};

export default WeekDay;
