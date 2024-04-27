import { assert } from 'chai';
import { vi } from 'vitest';
import { yesterday, tomorrow, startOfYear, endOfYear, academicYear, condenseDateRange, } from './datetime.js';
describe('Date constant helpers', () => {
    it('should return the correct values for date constants', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2017, 8, 1));
        assert.strictEqual(startOfYear(), 2017, 'Correct start of year in fall');
        assert.strictEqual(endOfYear(), 2018, 'Correct end of year in fall');
        assert.strictEqual(yesterday().toLocaleDateString(), '8/31/2017', 'Correct yesterday');
        assert.strictEqual(tomorrow().toLocaleDateString(), '9/2/2017', 'Correct tomorrow');
        vi.setSystemTime(new Date(2017, 0, 1));
        assert.strictEqual(startOfYear(), 2016, 'Correct start of year in spring');
        assert.strictEqual(endOfYear(), 2017, 'Correct end of year in spring');
        vi.useRealTimers();
    });
});
describe('Academic Year helper', () => {
    it('should return the correct academic year', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2017, 8, 1));
        assert.strictEqual(academicYear(), '2017-2018', 'Correct date in fall');
        vi.setSystemTime(new Date(2017, 0, 1));
        assert.strictEqual(academicYear(), '2016-2017', 'Correct date in spring');
        vi.useRealTimers();
    });
    it('should return the academic year for a specified year', () => {
        assert.strictEqual(academicYear(2017), '2017-2018', 'Correct date for number');
        assert.strictEqual(academicYear('2017'), '2017-2018', 'Correct date for string');
    });
});
describe('Condense date range helper', () => {
    it('should return a single date for the same day', () => {
        assert.strictEqual(condenseDateRange('2017-08-01 08:00:00', '2017-08-01 08:00:00'), '8/1/2017', 'Correct single date');
    });
    it('should return the range for different days', () => {
        assert.strictEqual(condenseDateRange('2017-08-01 08:00:00', '2017-08-02 08:00:00'), '8/1/2017 - 8/2/2017', 'Correct date range');
    });
    it('should return nothing for invalid dates', () => {
        assert.strictEqual(condenseDateRange('', ''), '', 'Correct date range');
    });
});
