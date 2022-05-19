// With credit to https://github.com/Financial-Times/fetch-retry-or-die
// Assumes being run somewhere with access to global fetch
// like a supported broswer or NodeJS v18+

export default (url, opt) => {
    const maxRetries = opt ? opt.maxRetries || 0 : 0;
    let retryDelay = opt ? opt.retryDelay || 100 : 100;
    if (process.env.NODE_ENV === 'test') retryDelay = 10;

    const fetchRetryOrDie = (resolve, reject) => {
        let retryCount = 0;
        let statusCode;
        let statusText;

        const doRequest = async () => {
            try {
                const response = await fetch(url, opt);
                statusCode = response.status;
                statusText = response.statusText;
                const statusStr = response.status.toString();

                // Don't retry if status code is 2xx or 404
                if (statusStr.indexOf('2') === 0) {
                    return resolve(response);
                }
                if (statusStr === '404') {
                    const err = new Error(statusText);
                    err.statusCode = statusCode;
                    return reject(err);
                }

                // If the response contains an error, throw it so we know to retry
                const body = await response.json();
                if (body) {
                    const err = new Error(body.message || statusText);
                    err.statusCode = statusCode;
                    throw err;
                }
            } catch (err) {
                if (maxRetries !== 0 && retryCount < maxRetries) {
                    retryCount += 1;
                    setTimeout(doRequest, retryDelay);
                } else {
                    reject(err);
                }
            }
        };
        doRequest();
    };

    return new Promise(fetchRetryOrDie);
};
