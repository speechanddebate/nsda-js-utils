import { assert } from 'chai';
import sinon from 'sinon';
import {
    academicYear,
    tabroomAcademicYear,
    condenseDateRange,
    showDateTime,
    ordinalize,
    escapeCSV,
    emailValidator,
    affName,
    negName,
    normalizeSide,
    displaySide,
    roundName,
} from './index';

describe.skip('Academic Year helper', () => {
    it.skip('should return the correct academic year', async () => {
        let clock;
        clock = sinon.useFakeTimers(new Date(2017, 8, 1).getTime());
        assert.strictEqual(academicYear(), '2017-2018', 'Correct date in fall');
        clock = sinon.useFakeTimers(new Date(2018, 0, 1).getTime());
        assert.strictEqual(academicYear(), '2017-2018', 'Correct date in spring');
        clock = sinon.useFakeTimers(new Date(2018, 8, 1).getTime());
        assert.strictEqual(academicYear(), '2018-2019', 'Correct date in following year');
        clock.restore();
    });

    it('should return the academic year for a specified year', async () => {
        assert.strictEqual(academicYear(2017), '2017-2018', 'Correct date');
    });

    it.skip('Returns the correct Tabroom academic year given a Date object', async () => {
        let tick = new Date(2017, 9, 1);
        assert.strictEqual(tabroomAcademicYear(tick), '2017-2018', 'Correct date in fall');
        tick = new Date(2018, 2, 1);
        assert.strictEqual(tabroomAcademicYear(tick), '2017-2018', 'Correct date in spring');
        tick = new Date(2019, 2, 1);
        assert.strictEqual(tabroomAcademicYear(tick), '2018-2019', 'Correct date in following year');
        tick = new Date(2019, 6, 30);
        assert.strictEqual(tabroomAcademicYear(tick), '2018-2019', 'Correct date just under edge');
        tick = new Date(2019, 7, 1);
        assert.strictEqual(tabroomAcademicYear(tick), '2019-2020', 'Correct date just over edge');
    });
});

describe('Condense date range helper', () => {
    it('should return a single date for the same day', async () => {
        assert.strictEqual(condenseDateRange('2017-08-01 08:00:00', '2017-08-01 08:00:00'),
            '8/1/2017',
            'Correct single date'
        );
    });

    it('should return the range for different days', async () => {
        assert.strictEqual(condenseDateRange('2017-08-01 08:00:00', '2017-08-02 08:00:00'),
            '8/1/2017 - 8/2/2017',
            'Correct date range'
        );
    });

    it('should return nothing for invalid dates', async () => {
        assert.strictEqual(condenseDateRange('', ''),
            '',
            'Correct date range'
        );
    });
});

describe('Ordinalize helper', () => {
    it('should return the correct ordinal strings', async () => {
        assert.strictEqual(ordinalize(1), '1st');
        assert.strictEqual(ordinalize(2), '2nd');
        assert.strictEqual(ordinalize(3), '3rd');
        assert.strictEqual(ordinalize(4), '4th');
        assert.strictEqual(ordinalize(5), '5th');
        assert.strictEqual(ordinalize(6), '6th');
        assert.strictEqual(ordinalize(7), '7th');
        assert.strictEqual(ordinalize(8), '8th');
        assert.strictEqual(ordinalize(9), '9th');
        assert.strictEqual(ordinalize(10), '10th');
        assert.strictEqual(ordinalize(11), '11th');
        assert.strictEqual(ordinalize(12), '12th');
        assert.strictEqual(ordinalize(13), '13th');
        assert.strictEqual(ordinalize(14), '14th');
        assert.strictEqual(ordinalize(15), '15th');
        assert.strictEqual(ordinalize(100), '100th');
        assert.strictEqual(ordinalize(101), '101st');
        assert.strictEqual(ordinalize(102), '102nd');
        assert.strictEqual(ordinalize(103), '103rd');
        assert.strictEqual(ordinalize(104), '104th');
    });
});

describe('escapeCSV helper', () => {
    it('should return the correct escaped string', async () => {
        assert.strictEqual(escapeCSV('Test, "test"'), '"Test, test",');
        assert.strictEqual(escapeCSV('Test\\'), '"Test",');
        assert.strictEqual(escapeCSV(''), '\\N,');
        assert.strictEqual(escapeCSV(null), '\\N,');
        assert.strictEqual(escapeCSV(undefined), '\\N,');
        assert.strictEqual(escapeCSV(false), '\\N,');

        // Exclude trailing comma
        assert.strictEqual(escapeCSV('test', true), '"test"');
    });
});

describe('emailValidator helper', () => {
    it('should return email validation', async () => {
        assert.isOk(emailValidator.test('test@test.com'));
        assert.isNotOk(emailValidator.test('test'));
        assert.isNotOk(emailValidator.test('test@'));
        assert.isNotOk(emailValidator.test('test test@test.com'));
    });
});

describe('Side helpers', () => {
    it('should return the correct sides', async () => {
        assert.strictEqual(affName(), 'Aff', 'Correct aff name');
        assert.strictEqual(affName('pf'), 'Pro', 'Correct aff name for pf');
        assert.strictEqual(negName(), 'Neg', 'Correct neg name');
        assert.strictEqual(negName('pf'), 'Con', 'Correct neg name for pf');

        assert.strictEqual(normalizeSide('A'), 'A', 'Correct aff name');
        assert.strictEqual(normalizeSide('Aff'), 'A', 'Correct aff name');
        assert.strictEqual(normalizeSide('Pro'), 'A', 'Correct aff name');
        assert.strictEqual(normalizeSide('N'), 'N', 'Correct neg name');
        assert.strictEqual(normalizeSide('Neg'), 'N', 'Correct neg name');
        assert.strictEqual(normalizeSide('Con'), 'N', 'Correct neg name');

        assert.strictEqual(displaySide('Aff', 'cx'), 'Aff', 'Correct aff name');
        assert.strictEqual(displaySide('A', 'pf'), 'Pro', 'Correct aff name');
        assert.strictEqual(displaySide('Neg', 'cx'), 'Neg', 'Correct neg name');
        assert.strictEqual(displaySide('N', 'pf'), 'Con', 'Correct neg name');

        assert.strictEqual(roundName(1), 'Round 1', 'Correct round name');
        assert.strictEqual(roundName('1'), 'Round 1', 'Correct round name');
        assert.strictEqual(roundName('Doubles'), 'Doubles', 'Correct round name');
    });
});

describe('DateTime Formatter', () => {
    const dateSample = '2020-11-07 16:30:00';

    it('Returns a Date object if given a MySQL Date string and no other options', async () => {
        const dtObject = showDateTime(dateSample);
        assert.instanceOf(dtObject, Date, 'Object is a date');
        assert.equal(dtObject.getFullYear(), '2020', 'Year is correct');
    });

    it('Returns a US formatted EDT date given locale & options', async () => {
        const dtString = showDateTime(dateSample, {
            locale: 'en-us',
            tz: 'America/New_York',
            format: 'long',
        });

        assert.typeOf(dtString, 'string', 'Return a string');

        assert.equal(
            dtString,
            'Sat, November 7, 2020 at 11:30 AM EST',
            'String format is correct'
        );
    });
});
