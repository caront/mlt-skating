import dayjs, { Dayjs } from "dayjs"

export const DateFormat = (date: string | null) => {
    if (date === null) return 'N/a';
    const today = dayjs();

    const dateToFormat = dayjs(date);

    const isSameDay = today.isSame(dateToFormat, 'day');
    const isYesterday = today.isSame(dateToFormat.add(1, 'day'), 'day');

    return isSameDay ? `Today at ${dateToFormat.format('HH:mm')}` : isYesterday ? `Yesterday at ${dateToFormat.format('HH:mm')}` : dateToFormat.format('DD/MM/YYYY');
}
