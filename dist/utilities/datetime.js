const now = () => new Date();
export { now as today };
export const yesterday = () => new Date(new Date().setDate(new Date().getDate() - 1));
export const tomorrow = () => new Date(new Date().setDate(new Date().getDate() + 1));
export const currentMonth = () => now().getMonth();
export const currentYear = () => now().getFullYear();
export const previousYear = () => now().getFullYear() - 1;
export const nextYear = () => now().getFullYear() + 1;
export const startOfYear = () => currentMonth() < 6 ? previousYear() : currentYear();
export const endOfYear = () => currentMonth() < 6 ? currentYear() : nextYear();
export const isValidDate = (date) => !Number.isNaN(Date.parse(date));
export const academicYear = (year) => {
    // If passed a valid year, assume it's the start of the academic year
    if (year && parseInt(year.toString())) {
        const endYear = parseInt(year.toString()) + 1;
        return `${year.toString()}-${endYear.toString()}`;
    }
    // Otherwise, assume the current year
    if (currentMonth() < 6) {
        return `${previousYear().toString()}-${currentYear().toString()}`;
    }
    return `${currentYear().toString()}-${nextYear().toString()}`;
};
const parseCalendarDate = (input) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(input);
    if (!match)
        return null;
    const [, y, m, d] = match;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return Number.isNaN(date.getTime()) ? null : date;
};
export const condenseDateRange = (start, end) => {
    const startDate = parseCalendarDate(start);
    const endDate = parseCalendarDate(end);
    if (!startDate || !endDate)
        return '';
    if (startDate.toDateString() === endDate.toDateString()) {
        return startDate.toLocaleDateString();
    }
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};
export default null;
