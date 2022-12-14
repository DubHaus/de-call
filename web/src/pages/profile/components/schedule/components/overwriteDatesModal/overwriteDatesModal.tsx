import {useState} from 'react';
import Calendar from 'src/components/calendar';
import Button from 'src/components/common/button';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Input from 'src/components/common/input';
import Modal from 'src/components/common/modal';
import TimeInput from 'src/components/common/timeInput';
import Title from 'src/components/common/typography/title';
import WeekDay from '../weekDay';
import styles from './overwriteDatesModal.module.scss';

type Props = {
    setShowModal: (show: boolean) => void;
};

const OverwriteDatesModal = ({setShowModal}: Props) => {
    const [date, setDate] = useState<Date>(new Date());

    return (
        <Modal
            title="Select the date(s) you want to assign specific hours"
            buttons={
                <>
                    <Button type="alt">Cancel</Button>
                    <Button>Overwrite dates</Button>
                </>
            }
            close={() => setShowModal(false)}>
            <Container gap={30}>
                <Container className={styles.calendar}>
                    <Calendar date={date} onChange={setDate} />
                </Container>
                <Container gap={20}>
                    <Flex justify="between">
                        <Title level="h4">Choose available hours</Title>
                        <Button icon="plus" compact />
                    </Flex>
                    <Container>
                        <Container gap={20}>
                            <Flex justify="between" gap={20}>
                                <Flex gap={20}>
                                    <TimeInput
                                        from="9:00"
                                        altBackground
                                        compact
                                        value={'14:00'}
                                    />
                                    <TimeInput
                                        from="12:00"
                                        altBackground
                                        compact
                                        value={'18:00'}
                                    />
                                </Flex>
                                <Button icon="delete" type="ghost" />
                            </Flex>
                            <Flex justify="between" gap={20}>
                                <Flex gap={20}>
                                    <TimeInput
                                        from="9:00"
                                        altBackground
                                        compact
                                        value={'14:00'}
                                    />
                                    <TimeInput
                                        from="12:00"
                                        altBackground
                                        compact
                                        value={'18:00'}
                                    />
                                </Flex>
                                <Button icon="delete" type="ghost" />
                            </Flex>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Modal>
    );
};

export default OverwriteDatesModal;
