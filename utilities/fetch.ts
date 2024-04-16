/* eslint-disable no-await-in-loop */
import { FetchOptions, ResponseError } from '../types/index.js';

type Body = string | Record<string, unknown> | Record<string, unknown>[];

export default async (url: string, opt: FetchOptions): Promise<Response> => {
    const maxRetries = opt.maxRetries ?? 0;
    let retryDelay = opt.retryDelay ?? 100;
    if (process.env.NODE_ENV === 'test') retryDelay = 10;

    let statusCode;
    let statusText;
    let statusStr;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, opt);
            statusCode = response.status;
            statusText = response.statusText;
            statusStr = response.status.toString();

            // Just return if 2xx successful status code
            if (statusStr.startsWith('2')) {
                return response;
            }

            // Any other status code, the response was an error, so extract any error
            // message and rethrow. We parse as text first and then re-parse as JSON
            // because we can only read the response stream once
            let body: Body;
            const text = await response.text();
            try {
                const json = JSON.parse(text) as Body;
                body = json;
            } catch (err) {
                body = text || statusText;
            }

            let message = '';
            if (typeof body === 'object' && 'message' in body) {
                if (typeof body.message === 'string') {
                    message = body.message;
                } else {
                    message = JSON.stringify(body.message);
                }
            }

            let error;
            if (typeof body === 'object' && 'error' in body) {
                if (typeof body.error === 'string') {
                    error = body.error;
                } else {
                    error = JSON.stringify(body.error);
                }
            }

            const errorMessage = (message || error) ?? body;

            const err = new Error(
                JSON.stringify(errorMessage),
            ) as ResponseError;
            err.statusCode = statusCode;

            throw err;
        } catch (err) {
            // Don't retry on 404
            if (statusStr === '404') throw err;

            // If out of retries, just re-throw the error
            if (i === maxRetries - 1) throw err;

            // Wait before retrying
            await new Promise((resolve) => {
                setTimeout(resolve, retryDelay);
            });
        }
    }
    throw new Error('Error while fetching');
};
