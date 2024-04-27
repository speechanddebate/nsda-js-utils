// This file isn't type safe yet - if Palmer wants it to be, he can rewrite it
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const tabroomAcademicYear = (targetDate: Date): string => {
    let date = targetDate;

    // Without a passed object just assume we are here & now
    if (
        typeof date !== 'object' ||
        Object.prototype.toString.call(date) !== '[object Date]'
    ) {
        date = new Date();
    }

    let startYear = date.getFullYear();

    if (date.getMonth() < 7) {
        // eslint-disable-next-line no-plusplus
        startYear--;
    }

    const endYear = startYear + 1;

    return `${startYear.toString()}-${endYear.toString()}`;
};

export const showDateTime = (
    sqlDT: string,
    options = {
        locale: 'en-us',
        tz: 'UTC',
        format: '',
        dateOnly: false,
        timeOnly: false,
    },
): string | Date => {
    // Split timestamp into [ Y, M, D, h, m, s ]
    let dt;

    if (typeof sqlDT === 'string') {
        const dtString = sqlDT.split(/[- :]/);

        // Apply each element to the Date function
        dt = new Date(
            Date.UTC(
                parseInt(dtString[0]),
                parseInt(dtString[1]) - 1,
                parseInt(dtString[2]),
                parseInt(dtString[3]),
                parseInt(dtString[4]),
                parseInt(dtString[5]),
            ),
        );
    } else {
        dt = sqlDT;
    }

    let dateFormat: Intl.DateTimeFormatOptions = {};
    let chopped: Intl.DateTimeFormat;

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
            chopped = new Intl.DateTimeFormat(options.locale, {
                timeZone: options.tz,
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })
                .formatToParts(dt)
                .map((component) => {
                    return component.reduce((dtString: string, comp) => {
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

    return new Intl.DateTimeFormat(options.locale, dateFormat).format(dt);
};

export default null;
