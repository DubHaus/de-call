import {ReactNode, useMemo} from 'react';
import {getDaysInMonth} from 'src/utils/date';
import Button from '../common/button';
import Container from '../common/container';
import Dropdown from '../common/dropdown';
import Flex from '../common/flex';
import Select, {SelectOption} from '../common/select/select';
import Text from '../common/typography/text';
import styles from './bigCalendar.module.scss';

const months = [
    {title: 'January', value: '0'},
    {title: 'February', value: '1'},
    {title: 'March', value: '2'},
    {title: 'April', value: '3'},
    {title: 'May', value: '4'},
    {title: 'June', value: '5'},
    {title: 'Jule', value: '6'},
    {title: 'August', value: '7'},
    {title: 'September', value: '8'},
    {title: 'October', value: '9'},
    {title: 'Noverber', value: '10'},
    {title: 'December', value: '11'},
] as SelectOption[];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type Props = {
    date?: Date;
    headerRight?: ReactNode;
};

const BigCalendar = ({date = new Date(), headerRight}: Props) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const years = useMemo(() => {
        const years = Array.from(Array(10).keys()).map(idx => ({
            value: `${idx + currentYear}`,
            title: `${idx + currentYear}`,
        })) as SelectOption[];
        return years;
    }, [currentYear]);

    const days = useMemo(() => {
        const currentMonthDaysCount = getDaysInMonth(currentMonth, currentYear);
        const hasPrevMonth = currentMonth > 0;
        const hasNextMonth = currentMonth < 11;
        const prevMonthDaysCount = hasPrevMonth
            ? getDaysInMonth(currentMonth - 1, currentYear)
            : 0;

        const currentMonthDays = Array.from(
            Array(currentMonthDaysCount).keys()
        ).map(idx => {
            const date = new Date(
                `${currentMonth + 1}.${idx + 1}.${currentYear}`
            );
            return {
                date,
                day: date.getDate(),
                weekDay: date.getDay(),
                currentMonth: true,
            };
        });

        const prevMonthDays = hasPrevMonth
            ? Array.from(Array(currentMonthDays[0].weekDay - 1).keys())
                  .reverse()
                  .map(idx => {
                      const date = new Date(
                          `${currentMonth}.${
                              prevMonthDaysCount - idx
                          }.${currentYear}`
                      );
                      return {
                          date,
                          day: date.getDate(),
                          weekDay: date.getDay(),
                          currentMonth: false,
                      };
                  })
            : [];

        const nextMonthDays = hasNextMonth
            ? Array.from(
                  Array(
                      7 - currentMonthDays[currentMonthDays.length - 1].weekDay
                  ).keys()
              ).map(idx => {
                  const date = new Date(
                      `${currentMonth + 2}.${idx + 1}.${currentYear}`
                  );
                  return {
                      date,
                      day: date.getDate(),
                      weekDay: date.getDay(),
                      currentMonth: false,
                  };
              })
            : [];

        return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    }, [currentYear, currentMonth]);

    return (
        <Container gap={25}>
            <Flex justify="between">
                <Flex gap={30}>
                    <Button type="ghost" icon="left" />
                    <Select options={months} value={`${currentMonth}`} />
                    <Select options={years} value={`${currentYear}`} />
                    <Button type="ghost" icon="right" />
                </Flex>
                {headerRight}
            </Flex>
            <Container className={styles.container}>
                {weekDays.map(day => (
                    <Container key={day} className={styles.weekDayName}>
                        <Text light>{day}</Text>
                    </Container>
                ))}
                {days.map(({day, currentMonth}) => (
                    <Container
                        key={`${day}-${currentMonth}`}
                        className={`${
                            styles[
                                currentMonth ? 'currentMonth' : 'otherMonths'
                            ]
                        } ${styles.day}`}>
                        <Text className={styles.dayText} bold>
                            {day}
                        </Text>
                        {currentMonth ? (
                            <Container>
                                <Text
                                    className={styles.plannedDate}
                                    light
                                    compact>
                                    9:30 - 14:00
                                </Text>
                                <Text
                                    className={styles.plannedDate}
                                    light
                                    compact>
                                    15:20 - 18:00
                                </Text>
                            </Container>
                        ) : null}
                    </Container>
                ))}
            </Container>
        </Container>
    );
};

export default BigCalendar;
