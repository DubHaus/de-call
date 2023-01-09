import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

export const getTimeForEvent = (date: any) => {
    const dateobj = dayjs(date);
    return `${dateobj.fromNow()} ${dateobj.format('MM.DD HH:MM')}`;
};
