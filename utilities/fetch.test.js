import { jest } from '@jest/globals';
import { assert } from 'chai';
import fetchRetry from './fetch';

global.fetch = jest.fn(() => Promise.resolve(
    {
        json: () => ({}),
        status: () => 400,
    }
));

describe('Fetch retry helper', () => {
    it('should retry 3 times', async () => {
        try {
            const result = await fetchRetry('http://test.com', { maxRetries: 3, retryDelay: 0 });
            assert.isNull(result, 'No result');
        } catch (err) {
            assert.isNotNull(err, 'Throws an error when retry fails');
            assert.strictEqual(fetch.mock.calls.length, 4, 'Fetched 4 times');
        }
    });
});
