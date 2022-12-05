import {useState} from 'react';
import BigCalendar from 'src/components/bigCalendar/bigCalendar';
import Calendar from 'src/components/calendar';
import Button from 'src/components/common/button';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Modal from 'src/components/common/modal';
import Title from 'src/components/common/typography/title';
import Overwrite from './components/overwrite';
import OverwriteDatesModal from './components/overwriteDatesModal';
import WeekDay from './components/weekDay';
import styles from './schedule.module.scss';

const Schedule = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Flex align="start" justify="between" gap={20}>
            <Container>
                <Container className={styles.fieldsContainer}>
                    <Container className={styles.fieldHeader}>
                        <Title className={styles.title} level="h3">
                            Weekdays
                        </Title>
                    </Container>
                    <Container gap={20}>
                        <WeekDay day="Sunday" />
                        <WeekDay day="Monday" />
                        <WeekDay day="Tuesday" />
                        <WeekDay day="Wednesday" />
                        <WeekDay day="Thursday" />
                        <WeekDay day="Friday" />
                        <WeekDay day="Saturday" />
                    </Container>
                </Container>
                <Container className={styles.fieldsContainer}>
                    <Container className={styles.fieldHeader}>
                        <Flex align="center" justify="between">
                            <Title className={styles.title} level="h3">
                                Date overwrites
                            </Title>
                            <Flex gap={10}>
                                <Button compact icon="plus" />
                                <Button transparentBg icon="delete" />
                            </Flex>
                        </Flex>
                    </Container>
                    <Overwrite />
                </Container>
            </Container>
            <Container>
                <BigCalendar
                    headerRight={
                        <Button onClick={() => setShowModal(true)}>
                            Add a date overwrite
                        </Button>
                    }
                />
            </Container>
            {showModal ? (
                <OverwriteDatesModal setShowModal={setShowModal} />
            ) : null}
        </Flex>
    );
};

export default Schedule;
