export const ordinalize = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n.toString() + (s[(v - 20) % 10] || s[v] || s[0]);
};
export const escapeCSV = (string, excludeComma) => {
    if (!string) {
        return `\\N${!excludeComma ? ',' : ''}`;
    }
    /* eslint-disable prefer-regex-literals */
    return `"${string
        .replace(new RegExp('"', 'g'), '')
        .replace(new RegExp(/\\/, 'g'), '')
        .trim()}"${!excludeComma ? ',' : ''}`;
};
export const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const affName = (eventName) => {
    if (eventName === 'pf') {
        return 'Pro';
    }
    return 'Aff';
};
export const negName = (eventName) => {
    if (eventName === 'pf') {
        return 'Con';
    }
    return 'Neg';
};
export const normalizeSide = (side) => {
    switch (side) {
        case 'A':
            return 'A';
        case 'Aff':
            return 'A';
        case 'Pro':
            return 'A';
        case 'N':
            return 'N';
        case 'Neg':
            return 'N';
        case 'Con':
            return 'N';
        default:
            return side;
    }
};
export const displaySide = (side, event) => {
    if (['A', 'Aff', 'Pro'].includes(side)) {
        return event === 'pf' ? 'Pro' : 'Aff';
    }
    if (['N', 'Neg', 'Con'].includes(side)) {
        return event === 'pf' ? 'Con' : 'Neg';
    }
    return side;
};
export const roundName = (round) => {
    if (parseInt(round.toString())) {
        return `Round ${round.toString()}`;
    }
    return round;
};
export default null;
