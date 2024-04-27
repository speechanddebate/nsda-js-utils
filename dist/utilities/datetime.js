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
export const condenseDateRange = (start, end) => {
    let dates = '';
    if (isValidDate(start) && isValidDate(end)) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (startDate.toDateString() === endDate.toDateString()) {
            dates = startDate.toLocaleDateString();
        }
        else {
            dates = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
        }
    }
    return dates;
};
export default null;
