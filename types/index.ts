export interface FetchOptions extends RequestInit {
	maxRetries?: number;
	retryDelay?: number;
}

export interface ResponseError extends Error {
	statusCode?: number;
}

export default null;
