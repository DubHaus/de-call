import {ReactNode, useEffect, useMemo, useState} from 'react';
import {getDaysInMonth} from 'src/utils/date';
import Button from '../common/button';
import Container from '../common/container';
import Dropdown from '../common/dropdown';
import Flex from '../common/flex';
import Select, {SelectOption} from '../common/select/select';
import Text from '../common/typography/text';
import styles from './calendar.module.scss';

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
    date: Date;
    onChange?: (date: Date) => void;
};

const Calendar = ({date, onChange}: Props) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    const years = useMemo(() => {
        const years = Array.from(Array(100).keys()).map(idx => ({
            value: `${idx + currentYear - 10}`,
            title: `${idx + currentYear - 10}`,
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

        const prevMonthDays = currentMonthDays[0].weekDay
            ? Array.from(Array(currentMonthDays[0].weekDay).keys())
                  .reverse()
                  .map(idx => {
                      if (hasPrevMonth) {
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
                      } else return {};
                  })
            : [];

        const nextMonthDays = hasNextMonth
            ? Array.from(
                  Array(
                      7 -
                          currentMonthDays[currentMonthDays.length - 1]
                              .weekDay -
                          1
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
        <Container className={styles.container} gap={25}>
            <Flex gap={10}>
                <Button type="ghost" icon="left" />
                <Select
                    onChange={month => {
                        onChange &&
                            onChange(
                                new Date(
                                    `${
                                        Number(month) + 1
                                    }.${currentDate}.${currentYear}`
                                )
                            );
                    }}
                    options={months}
                    value={`${currentMonth}`}
                />
                <Select
                    onChange={year => {
                        onChange &&
                            onChange(
                                new Date(
                                    `${currentMonth + 1}.${currentDate}.${year}`
                                )
                            );
                    }}
                    options={years}
                    value={`${currentYear}`}
                />
                <Button type="ghost" icon="right" />
            </Flex>
            <Container className={styles.calendar}>
                {weekDays.map(day => (
                    <Container className={styles.weekDayName}>
                        <Text light>{day}</Text>
                    </Container>
                ))}
                {days.map(({day, currentMonth}) => (
                    <Container
                        className={`${
                            styles[
                                currentMonth ? 'currentMonth' : 'otherMonths'
                            ]
                        } ${styles.day} ${!day && styles.empty}`}>
                        <Text className={styles.dayText}>{day}</Text>
                    </Container>
                ))}
            </Container>
        </Container>
    );
};

export default Calendar;
