import moment from 'moment-timezone';

const now = new Date();

export { now as today };
export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
export const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
export const currentMonth = now.getMonth();
export const currentYear = now.getFullYear();
export const previousYear = (now.getFullYear() - 1);
export const nextYear = (now.getFullYear() + 1);
export const startOfYear = currentMonth < 6 ? previousYear : currentYear;
export const endOfYear = currentMonth < 6 ? currentYear : nextYear;

// eslint-disable-next-line no-restricted-globals, no-unneeded-ternary
export const isValidDate = date => (isNaN(new Date(date)) ? false : true);

export const momentObjectOrStringToISODate = input => {
    if (!isValidDate(input)) return null;
    return input._isAMomentObject ?
        input.toISOString().substr(0, 10)
    :
        new Date(input).toISOString().substr(0, 10);
};

export const momentObjectOrStringToISODateTime = input => (
    input._isAMomentObject ?
        input.toISOString()
    :
        new Date(`${input} UTC`).toISOString()
);

export const academicYear = (year) => {
    // If passed a valid year, assume it's the start of the academic year
    if (parseInt(year)) {
        return `${year}-${year + 1}`;
    }

    // Otherwise, assume the current year
    if (currentMonth < 6) {
        return `${previousYear}-${currentYear}`;
    }
    return `${currentYear}-${nextYear}`;
};

export const tabroomAcademicYear = (targetDate) => {
    // Without a passed object just assume we are here & now
    if (typeof targetDate !== 'object' || Object.prototype.toString.call(targetDate) !== '[object Date]') {
        targetDate = new Date();
    }

    let startYear = targetDate.getFullYear();

    if (targetDate.getMonth() < 7) {
        // eslint-disable-next-line no-plusplus
        startYear--;
    }

    const endYear = startYear + 1;

    return `${startYear}-${endYear}`;
};

export const condenseDateRange = (start, end) => {
    const startMoment = moment(start || null);
    const endMoment = moment(end || null);

    let dates = '';
    if (startMoment.isValid() && endMoment.isValid()) {
        if (startMoment.isSame(endMoment, 'day')) {
            dates = `${startMoment.format('l')}`;
        } else {
            dates = `${startMoment.local().format('l')} - ${endMoment.local().format('l')}`;
        }
    }
    return dates;
}

export const showDateTime = (
    sqlDT,
    options = { locale: 'en-us', tz: 'UTC' }
) => {
    // Split timestamp into [ Y, M, D, h, m, s ]
    let dt;

    if (typeof sqlDT === 'string') {
        const dtString = sqlDT.split(/[- :]/);

        // Apply each element to the Date function
        dt = new Date(Date.UTC(
            dtString[0],
            dtString[1] - 1,
            dtString[2],
            dtString[3],
            dtString[4],
            dtString[5]
        ));
    } else {
        dt = sqlDT;
    }

    let dateFormat = {};
    let chopped = {};

    switch (options.format) {
        case 'full':
            dateFormat = {
                timeZone: options.tz,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
            };
            break;

        case 'long':
            dateFormat = {
                timeZone: options.tz,
                weekday: 'short',
                month: 'long',
                year: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
            };
            break;

        case 'medium':
            dateFormat = {
                timeZone: options.tz,
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
            };
            break;

        case 'short':
            dateFormat = {
                timeZone: options.tz,
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            };
            break;

        case 'daytime':
            dateFormat = {
                timeZone: options.tz,
                weekday: 'short',
                hour: 'numeric',
                minute: 'numeric',
            };
            break;

        case 'sortable':
            chopped = new Intl.DateTimeFormat(
                options.locale,
                {
                    timeZone: options.tz,
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                }
            )
            .formatToParts(dt)
            .map(component => {
                return component.reduce((dtString, comp) => {
                    if (comp.type !== 'literal') {
                        dtString[comp.type] = comp.value;
                    }
                    return comp.value;
                });
            });

            return `${chopped.year}-${chopped.month}-${chopped.day} ${chopped.hour}-${chopped.minute}`;

        default:
            return dt;
    }

    if (options.dateOnly) {
        delete dateFormat.hour;
        delete dateFormat.minute;
        delete dateFormat.timeZoneName;
    }

    if (options.timeOnly) {
        delete dateFormat.year;
        delete dateFormat.month;
        delete dateFormat.day;
        delete dateFormat.timeZoneName;
    }

    return new Intl.DateTimeFormat(
        options.locale,
        dateFormat
    ).format(dt);
};

export const ordinalize = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const escapeCSV = (string, excludeComma) => {
    if (!string) { return `\\N${!excludeComma ? ',' : ''}`; }
    /* eslint-disable prefer-regex-literals */
    return `"${string
        .replace(new RegExp('"', 'g'), '')
        .replace(new RegExp(/\\/, 'g'), '')
        .trim()}"${!excludeComma ? ',' : ''}`;
};

export const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const affName = (eventName) => {
    if (eventName === 'pf') { return 'Pro'; }
    return 'Aff';
};
export const negName = (eventName) => {
    if (eventName === 'pf') { return 'Con'; }
    return 'Neg';
};
export const normalizeSide = (side) => {
    switch (side) {
        case 'A': return 'A';
        case 'Aff': return 'A';
        case 'Pro': return 'A';
        case 'N': return 'N';
        case 'Neg': return 'N';
        case 'Con': return 'N';
        default: return side;
    }
};
export const displaySide = (side, event) => {
    if (['A', 'Aff', 'Pro'].indexOf(side) > -1) {
        return event === 'pf' ? 'Pro' : 'Aff';
    }
    if (['N', 'Neg', 'Con'].indexOf(side) > -1) {
        return event === 'pf' ? 'Con' : 'Neg';
    }
    return side;
};

export const roundName = (round) => {
    if (parseInt(round)) { return `Round ${round}`; }
    return round;
};

export default null;

export { default as fetch } from './fetch.js';

export { default as randomPhrase } from './randomPhrase.js';
