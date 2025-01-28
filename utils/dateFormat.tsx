import dayjs, { Dayjs } from "dayjs"
import i18next from "i18next";

export const DateFormat = (date: string | null) => {

    if (date === null) return 'N/a';
    const today = dayjs();

    const dateToFormat = dayjs(date);

    const isSameDay = today.isSame(dateToFormat, 'day');
    const isYesterday = today.isSame(dateToFormat.add(1, 'day'), 'day');

    if (isSameDay) return i18next.t('date_format.today_at', { time: dateToFormat.format(i18next.t('date_format.time')) });
    if (isYesterday) return i18next.t('date_format.yesterday_at', { time: dateToFormat.format(i18next.t('date_format.time')) });
    return dateToFormat.format(i18next.t('date_format.date'));
}
