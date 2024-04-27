export interface FetchOptions extends RequestInit {
    maxRetries?: number;
    retryDelay?: number;
}
export interface ResponseError extends Error {
    statusCode?: number;
}
declare const _default: null;
export default _default;
