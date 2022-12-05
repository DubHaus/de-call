export const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
