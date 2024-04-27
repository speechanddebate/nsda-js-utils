import { assert } from 'chai';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import fetch from './fetch.js';

describe('Fetch retry helper', () => {
    const server = setupServer();

    beforeAll(() => {
        server.listen({ onUnhandledRequest: 'error' });
    });

    it('should not retry and return an HTTP response on a 200 JSON response', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.json({ test: 'Test' }, { status: 200 });
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const response = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.strictEqual(callCount, 1, 'Fetched 1 times');
            const json = (await response.json()) as Record<string, unknown>;
            assert.deepEqual(json, { test: 'Test' }, 'Response is correct');
        } catch (err) {
            assert.isUndefined(err, 'Does not error');
        }
    });

    it('should handle fetching with default fetch options', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.json({ test: 'Test' }, { status: 200 });
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const response = await fetch('http://test.com', {});
            assert.strictEqual(callCount, 1, 'Fetched 1 times');
            const json = (await response.json()) as Record<string, unknown>;
            assert.deepEqual(json, { test: 'Test' }, 'Response is correct');
        } catch (err) {
            assert.isUndefined(err, 'Does not error');
        }
    });

    it('should not retry and return an HTTP response on a 200 text response', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.text('test', { status: 200 });
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const response = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.strictEqual(callCount, 1, 'Fetched 1 times');
            const text = await response.text();
            assert.strictEqual(text, 'test', 'Response is correct');
        } catch (err) {
            assert.isUndefined(err, 'Does not error');
        }
    });

    it('should retry 3 times and error with the status text on a 400 with an empty body', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.text('', { status: 400 });
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            const error = err as Error;
            assert.exists(error, 'Throws an error when retry fails');
            assert.strictEqual(error.message, 'Bad Request', 'Correct message');
            assert.strictEqual(callCount, 3, 'Fetched 3 times');
        }
    });

    it('should retry 3 times and error on a 400 JSON response with a message string', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.json(
                    { message: 'Test Error' },
                    { status: 400 },
                );
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            const error = err as Error;
            assert.exists(error, 'Throws an error when retry fails');
            assert.strictEqual(error.message, 'Test Error', 'Correct message');
            assert.strictEqual(callCount, 3, 'Fetched 3 times');
        }
    });

    it('should retry 3 times and error on a 400 JSON response with a message JSON', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.json(
                    { message: { test: 'Test Error' } },
                    { status: 400 },
                );
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            const error = err as Error;
            assert.exists(error, 'Throws an error when retry fails');
            assert.strictEqual(
                error.message,
                '{"test":"Test Error"}',
                'Correct message',
            );
            assert.strictEqual(callCount, 3, 'Fetched 3 times');
        }
    });

    it('should retry 3 times and error on a 400 JSON response with an error string', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.json(
                    { error: 'Test Error' },
                    { status: 400 },
                );
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            const error = err as Error;
            assert.exists(error, 'Throws an error when retry fails');
            assert.strictEqual(error.message, 'Test Error', 'Correct message');
            assert.strictEqual(callCount, 3, 'Fetched 3 times');
        }
    });

    it('should retry 3 times and error on a 400 JSON response with an error JSON', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.json(
                    { error: { test: 'Test Error' } },
                    { status: 400 },
                );
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            const error = err as Error;
            assert.exists(error, 'Throws an error when retry fails');
            assert.strictEqual(
                error.message,
                '{"test":"Test Error"}',
                'Correct message',
            );
            assert.strictEqual(callCount, 3, 'Fetched 3 times');
        }
    });

    it('should retry 3 times and error on a 400 JSON response with other body', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.json(
                    { test: 'Test Error' },
                    { status: 400 },
                );
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            const error = err as Error;
            assert.exists(error, 'Throws an error when retry fails');
            assert.strictEqual(
                error.message,
                '{"test":"Test Error"}',
                'Correct message',
            );
            assert.strictEqual(callCount, 3, 'Fetched 3 times');
        }
    });

    it('should retry 3 times and error on a 400 text response', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.text('Test Error', { status: 400 });
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            const error = err as Error;
            assert.exists(error, 'Throws an error when retry fails');
            assert.strictEqual(error.message, 'Test Error', 'Correct message');
            assert.strictEqual(callCount, 3, 'Fetched 3 times');
        }
    });

    it('should retry on 500 errors', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.text('Test Error', { status: 500 });
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            assert.exists(err, 'Throws an error when retry fails');
            assert.strictEqual(callCount, 3, 'Fetched 3 times');
        }
    });

    it('should retry the provided number of times', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.text('Test Error', { status: 400 });
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            const result = await fetch('http://test.com', {
                maxRetries: 1,
                retryDelay: 0,
            });
            assert.isNull(result, 'No result');
        } catch (err) {
            assert.exists(err, 'Throws an error when retry fails');
            assert.strictEqual(callCount, 1, 'Fetched 1 times');
        }
    });

    it('should not retry on a 404', async () => {
        let callCount = 0;
        server.use(
            http.get(`http://test.com`, () => {
                return HttpResponse.json({ test: 'Test' }, { status: 404 });
            }),
        );
        server.events.on('request:start', () => {
            callCount += 1;
        });

        try {
            await fetch('http://test.com', {
                maxRetries: 3,
                retryDelay: 0,
            });
        } catch (err) {
            assert.exists(err, 'Throws an error when retry fails');
            assert.strictEqual(callCount, 1, 'Fetched 1 times');
        }
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });
});
