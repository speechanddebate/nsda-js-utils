export interface FetchOptions extends RequestInit {
    maxRetries?: number;
    retryDelay?: number;
    // method?: string;
    // credentials?: string;
    // headers?: Record<string, string>;
    // body?: string | Record<string, unknown> | Record<string, unknown>[];
}

export interface ResponseError extends Error {
    statusCode?: number;
}

export default null;
