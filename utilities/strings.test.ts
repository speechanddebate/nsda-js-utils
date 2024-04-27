import { assert } from 'chai';
import {
    ordinalize,
    escapeCSV,
    emailValidator,
    affName,
    negName,
    normalizeSide,
    displaySide,
    roundName,
} from './strings.js';

describe('Ordinalize helper', () => {
    it('should return the correct ordinal strings', () => {
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
    it('should return the correct escaped string', () => {
        assert.strictEqual(escapeCSV('Test, "test"'), '"Test, test",');
        assert.strictEqual(escapeCSV('Test\\'), '"Test",');
        assert.strictEqual(escapeCSV(''), '\\N,');

        // Exclude trailing comma
        assert.strictEqual(escapeCSV('', true), '\\N');
        assert.strictEqual(escapeCSV('test', true), '"test"');
    });
});

describe('emailValidator helper', () => {
    it('should return email validation', () => {
        assert.isOk(emailValidator.test('test@test.com'));
        assert.isNotOk(emailValidator.test('test'));
        assert.isNotOk(emailValidator.test('test@'));
        assert.isNotOk(emailValidator.test('test test@test.com'));
    });
});

describe('Side helpers', () => {
    it('should return the correct sides', () => {
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
        assert.strictEqual(
            normalizeSide('Other'),
            'Other',
            'Correct other name',
        );

        assert.strictEqual(displaySide('Aff', 'cx'), 'Aff', 'Correct aff name');
        assert.strictEqual(displaySide('A', 'pf'), 'Pro', 'Correct aff name');
        assert.strictEqual(displaySide('Neg', 'cx'), 'Neg', 'Correct neg name');
        assert.strictEqual(displaySide('N', 'pf'), 'Con', 'Correct neg name');
        assert.strictEqual(displaySide('Other'), 'Other', 'Correct other name');

        assert.strictEqual(roundName(1), 'Round 1', 'Correct round name');
        assert.strictEqual(roundName('1'), 'Round 1', 'Correct round name');
        assert.strictEqual(
            roundName('Doubles'),
            'Doubles',
            'Correct round name',
        );
    });
});
