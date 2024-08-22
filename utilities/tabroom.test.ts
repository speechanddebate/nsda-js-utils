import { assert } from 'chai';
import { tabroomAcademicYear, showDateTime } from './tabroom.js';

describe('Tabroom Academic Year helper', () => {
	it('Returns the correct Tabroom academic year given a Date object', () => {
		let tick = new Date(2017, 9, 1);
		assert.strictEqual(
			tabroomAcademicYear(tick),
			'2017-2018',
			'Correct date in fall',
		);
		tick = new Date(2018, 2, 1);
		assert.strictEqual(
			tabroomAcademicYear(tick),
			'2017-2018',
			'Correct date in spring',
		);
		tick = new Date(2019, 2, 1);
		assert.strictEqual(
			tabroomAcademicYear(tick),
			'2018-2019',
			'Correct date in following year',
		);
		tick = new Date(2019, 6, 30);
		assert.strictEqual(
			tabroomAcademicYear(tick),
			'2018-2019',
			'Correct date just under edge',
		);
		tick = new Date(2019, 7, 1);
		assert.strictEqual(
			tabroomAcademicYear(tick),
			'2019-2020',
			'Correct date just over edge',
		);
	});
});

describe('DateTime Formatter', () => {
	const dateSample = '2020-11-07 16:30:00';

	it('Returns a Date object if given a MySQL Date string and no other options', () => {
		const dtObject = showDateTime(dateSample) as Date;
		assert.instanceOf(dtObject, Date, 'Object is a date');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		assert.equal(dtObject.getFullYear(), 2020, 'Year is correct');
	});

	it('Returns a US formatted EDT date given locale & options', () => {
		const dtString = showDateTime(dateSample, {
			locale: 'en-us',
			tz: 'America/New_York',
			format: 'long',
			dateOnly: false,
			timeOnly: false,
		});

		assert.typeOf(dtString, 'string', 'Return a string');

		assert.equal(
			dtString,
			'Sat, November 7, 2020 at 11:30 AM EST',
			'String format is correct',
		);
	});
});
