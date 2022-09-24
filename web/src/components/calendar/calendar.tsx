import {useMemo} from 'react';
import {getDaysInMonth} from 'src/utils/date';
import Button from '../common/button';
import Container from '../common/container';
import Flex from '../common/flex';
import Select from '../common/select';
import {SelectOption} from '../common/select/select';

const months = [
    {title: 'January', value: 'january'},
    {title: 'February', value: 'february'},
    {title: 'March', value: 'march'},
    {title: 'April', value: 'april'},
    {title: 'May', value: 'may'},
    {title: 'June', value: 'june'},
    {title: 'Jule', value: 'july'},
    {title: 'August', value: 'august'},
    {title: 'September', value: 'September'},
    {title: 'October', value: 'October'},
    {title: 'Noverber', value: 'November'},
    {title: 'December', value: 'december'},
] as SelectOption[];

const Calendar = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentMonthDaysCount = getDaysInMonth(currentMonth, currentYear);
    console.log({currentYear, currentMonth, currentMonthDaysCount});
    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const years = Array.from(Array(10).keys()).map(idx => ({
            value: `${idx + currentYear}`,
            title: `${idx + currentYear}`,
        })) as SelectOption[];
        return years;
    }, []);

    const days = useMemo(() => {
        

    }, [currentMonthDaysCount])

    return (
        <Container>
            <Flex>
                <Button icon="left" />
                <Select options={months} value="september" />
                <Select options={years} value={`${currentYear}`} />
                <Button icon="right" />
            </Flex>
            <Container></Container>
        </Container>
    );
};

export default Calendar;
