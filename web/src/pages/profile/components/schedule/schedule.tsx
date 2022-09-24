import {useState} from 'react';
import Button from 'src/components/common/button';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import TimeInput from 'src/components/common/timeInput';
import Text from 'src/components/common/typography/text';
import styles from './schedule.module.scss';

const Schedule = () => {
    const [timeFrom, setTimeFrom] = useState('');
    const [timeUntil, setTimeUntil] = useState('');
    return (
        <Container>
        <Container gap={20}>
            <Container className={styles.weekday}>
                <Flex gap={15}>
                    <Text>Sunday</Text>
                    <Text>Unavalible</Text>
                    <Button icon="plus" />
                </Flex>
            </Container>

            <Container className={styles.weekday}>
                <Flex gap={15}>
                    <Text>Monday</Text>
                    <Flex gap={15}>
                        <TimeInput
                            from="9:00"
                            altBackground
                            value={timeFrom}
                            onChange={setTimeFrom}
                        />
                        <TimeInput
                            from="12:00"
                            altBackground
                            value={timeUntil}
                            onChange={setTimeUntil}
                        />
                    </Flex>
                    <Button icon="plus" />
                </Flex>
            </Container>
            {/* <Container className={styles.weekday}>
                <Flex>
                    <Text>Tuesday</Text>
                    <Flex gap={15}>
                        <TimeInput
                            from="9:00"
                            value={timeFrom}
                            onChange={setTimeFrom}
                        />
                        <TimeInput
                            from="12:00"
                            value={timeUntil}
                            onChange={setTimeUntil}
                        />
                    </Flex>
                    <Button icon="plus" />
                </Flex>
            </Container>
            <Container className={styles.weekday}>
                <Flex>
                    <Text>Wednesday</Text>
                    <Flex gap={15}>
                        <TimeInput
                            from="9:00"
                            value={timeFrom}
                            onChange={setTimeFrom}
                        />
                        <TimeInput
                            from="12:00"
                            value={timeUntil}
                            onChange={setTimeUntil}
                        />
                    </Flex>
                    <Button icon="plus" />
                </Flex>
            </Container>
            <Container className={styles.weekday}>
                <Flex>
                    <Text>Thuesday</Text>
                    <Flex gap={15}>
                        <TimeInput
                            from="9:00"
                            value={timeFrom}
                            onChange={setTimeFrom}
                        />
                        <TimeInput
                            from="12:00"
                            value={timeUntil}
                            onChange={setTimeUntil}
                        />
                    </Flex>
                    <Button icon="plus" />
                </Flex>
            </Container>
            <Container className={styles.weekday}>
                <Flex>
                    <Text>Friday</Text>
                    <Flex gap={15}>
                        <TimeInput
                            from="9:00"
                            value={timeFrom}
                            onChange={setTimeFrom}
                        />
                        <TimeInput
                            from="12:00"
                            value={timeUntil}
                            onChange={setTimeUntil}
                        />
                    </Flex>
                    <Button icon="plus" />
                </Flex>
            </Container>
            <Container className={styles.weekday}>
                <Flex gap={15}>
                    <Text>Saturday</Text>
                    <Flex gap={15}>
                        <TimeInput
                            altBackground
                            from="9:00"
                            value={timeFrom}
                            onChange={setTimeFrom}
                        />
                        <TimeInput
                            altBackground
                            from="12:00"
                            value={timeUntil}
                            onChange={setTimeUntil}
                        />
                    </Flex>
                    <Button icon="plus" />
                </Flex>
            </Container> */}
        </Container>
        <Container>
            
        </Container>

        </Container>
    );
};

export default Schedule;
