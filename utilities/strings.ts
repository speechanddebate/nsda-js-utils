export const ordinalize = (n: number): string => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const escapeCSV = (string: string, excludeComma: boolean): string => {
    if (!string) { return `\\N${!excludeComma ? ',' : ''}`; }
    /* eslint-disable prefer-regex-literals */
    return `"${string
        .replace(new RegExp('"', 'g'), '')
        .replace(new RegExp(/\\/, 'g'), '')
        .trim()}"${!excludeComma ? ',' : ''}`;
};

export const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const affName = (eventName: string): string => {
    if (eventName === 'pf') { return 'Pro'; }
    return 'Aff';
};
export const negName = (eventName: string): string => {
    if (eventName === 'pf') { return 'Con'; }
    return 'Neg';
};
export const normalizeSide = (side: string): string => {
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
export const displaySide = (side: string, event: string): string => {
    if (['A', 'Aff', 'Pro'].indexOf(side) > -1) {
        return event === 'pf' ? 'Pro' : 'Aff';
    }
    if (['N', 'Neg', 'Con'].indexOf(side) > -1) {
        return event === 'pf' ? 'Con' : 'Neg';
    }
    return side;
};

export const roundName = (round: number | string): string | number => {
    if (parseInt(round.toString())) { return `Round ${round}`; }
    return round;
};

export default null;
