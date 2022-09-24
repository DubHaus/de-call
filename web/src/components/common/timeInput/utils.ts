export const generateTimeFromIdx = (idx: number, step: number) => {
    const hoursInStep = 60 / step;

    const hours = Math.floor(idx / hoursInStep);
    const minutes = (idx / hoursInStep - Math.floor(idx / hoursInStep)) * 60;

    return `${hours}:${minutes}`.padEnd(hours >= 10 ? 5 : 4, '0');
};

export const generateIdxFromTime = (time: string, step: number) => {
    const [hours, minutes] = time.split(':');

    return Number(hours) * (60 / step) + Number(minutes) / step;
};
