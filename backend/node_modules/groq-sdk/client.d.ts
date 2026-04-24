import type { RequestInit, RequestInfo } from "./internal/builtin-types.js";
import type { PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from "./internal/types.js";
export type { Logger, LogLevel } from "./internal/utils/log.js";
import * as Opts from "./internal/request-options.js";
import * as Errors from "./core/error.js";
import * as Uploads from "./core/uploads.js";
import * as API from "./resources/index.js";
import { APIPromise } from "./core/api-promise.js";
import { BatchCancelResponse, BatchCreateParams, BatchCreateResponse, BatchListResponse, BatchRetrieveResponse, Batches } from "./resources/batches.js";
import { CompletionUsage, Completions } from "./resources/completions.js";
import { CreateEmbeddingResponse, Embedding, EmbeddingCreateParams, Embeddings } from "./resources/embeddings.js";
import { FileCreateParams, FileCreateResponse, FileDeleteResponse, FileInfoResponse, FileListResponse, Files } from "./resources/files.js";
import { Model, ModelDeleted, ModelListResponse, Models } from "./resources/models.js";
import { Audio } from "./resources/audio/audio.js";
import { Chat } from "./resources/chat/chat.js";
import { type Fetch } from "./internal/builtin-types.js";
import { HeadersLike, NullableHeaders } from "./internal/headers.js";
import { FinalRequestOptions, RequestOptions } from "./internal/request-options.js";
import { type LogLevel, type Logger } from "./internal/utils/log.js";
export interface ClientOptions {
    /**
     * Defaults to process.env['GROQ_API_KEY'].
     */
    apiKey?: string | undefined;
    /**
     * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
     *
     * Defaults to process.env['GROQ_BASE_URL'].
     */
    baseURL?: string | null | undefined;
    /**
     * The maximum amount of time (in milliseconds) that the client should wait for a response
     * from the server before timing out a single request.
     *
     * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
     * much longer than this timeout before the promise succeeds or fails.
     *
     * @unit milliseconds
     */
    timeout?: number | undefined;
    /**
     * Additional `RequestInit` options to be passed to `fetch` calls.
     * Properties will be overridden by per-request `fetchOptions`.
     */
    fetchOptions?: MergedRequestInit | undefined;
    /**
     * Specify a custom `fetch` function implementation.
     *
     * If not provided, we expect that `fetch` is defined globally.
     */
    fetch?: Fetch | undefined;
    /**
     * The maximum number of times that the client will retry a request in case of a
     * temporary failure, like a network error or a 5XX error from the server.
     *
     * @default 2
     */
    maxRetries?: number | undefined;
    /**
     * Default headers to include with every request to the API.
     *
     * These can be removed in individual requests by explicitly setting the
     * header to `null` in request options.
     */
    defaultHeaders?: HeadersLike | undefined;
    /**
     * Default query parameters to include with every request to the API.
     *
     * These can be removed in individual requests by explicitly setting the
     * param to `undefined` in request options.
     */
    defaultQuery?: Record<string, string | undefined> | undefined;
    /**
     * By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     * Only set this option to `true` if you understand the risks and have appropriate mitigations in place.
     */
    dangerouslyAllowBrowser?: boolean | undefined;
    /**
     * Set the log level.
     *
     * Defaults to process.env['GROQ_LOG'] or 'warn' if it isn't set.
     */
    logLevel?: LogLevel | undefined;
    /**
     * Set the logger.
     *
     * Defaults to globalThis.console.
     */
    logger?: Logger | undefined;
}
/**
 * API Client for interfacing with the Groq API.
 */
export declare class Groq {
    #private;
    apiKey: string;
    baseURL: string;
    maxRetries: number;
    timeout: number;
    logger: Logger;
    logLevel: LogLevel | undefined;
    fetchOptions: MergedRequestInit | undefined;
    private fetch;
    protected idempotencyHeader?: string;
    private _options;
    /**
     * API Client for interfacing with the Groq API.
     *
     * @param {string | undefined} [opts.apiKey=process.env['GROQ_API_KEY'] ?? undefined]
     * @param {string} [opts.baseURL=process.env['GROQ_BASE_URL'] ?? https://api.groq.com] - Override the default base URL for the API.
     * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
     * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
     * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     */
    constructor({ baseURL, apiKey, ...opts }?: ClientOptions);
    /**
     * Create a new client instance re-using the same options given to the current client with optional overriding.
     */
    withOptions(options: Partial<ClientOptions>): this;
    protected defaultQuery(): Record<string, string | undefined> | undefined;
    protected validateHeaders({ values, nulls }: NullableHeaders): void;
    protected authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined>;
    /**
     * Basic re-implementation of `qs.stringify` for primitive types.
     */
    protected stringifyQuery(query: object | Record<string, unknown>): string;
    private getUserAgent;
    protected defaultIdempotencyKey(): string;
    protected makeStatusError(status: number, error: Object, message: string | undefined, headers: Headers): Errors.APIError;
    buildURL(path: string, query: Record<string, unknown> | null | undefined, defaultBaseURL?: string | undefined): string;
    /**
     * Used as a callback for mutating the given `FinalRequestOptions` object.
     */
    protected prepareOptions(options: FinalRequestOptions): Promise<void>;
    /**
     * Used as a callback for mutating the given `RequestInit` object.
     *
     * This is useful for cases where you want to add certain headers based off of
     * the request properties, e.g. `method` or `url`.
     */
    protected prepareRequest(request: RequestInit, { url, options }: {
        url: string;
        options: FinalRequestOptions;
    }): Promise<void>;
    get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp>;
    post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp>;
    patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp>;
    put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp>;
    delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp>;
    private methodRequest;
    request<Rsp>(options: PromiseOrValue<FinalRequestOptions>, remainingRetries?: number | null): APIPromise<Rsp>;
    private makeRequest;
    fetchWithTimeout(url: RequestInfo, init: RequestInit | undefined, ms: number, controller: AbortController): Promise<Response>;
    private shouldRetry;
    private retryRequest;
    private calculateDefaultRetryTimeoutMillis;
    buildRequest(inputOptions: FinalRequestOptions, { retryCount }?: {
        retryCount?: number;
    }): Promise<{
        req: FinalizedRequestInit;
        url: string;
        timeout: number;
    }>;
    private buildHeaders;
    private _makeAbort;
    private buildBody;
    static Groq: typeof Groq;
    static DEFAULT_TIMEOUT: number;
    static GroqError: typeof Errors.GroqError;
    static APIError: typeof Errors.APIError;
    static APIConnectionError: typeof Errors.APIConnectionError;
    static APIConnectionTimeoutError: typeof Errors.APIConnectionTimeoutError;
    static APIUserAbortError: typeof Errors.APIUserAbortError;
    static NotFoundError: typeof Errors.NotFoundError;
    static ConflictError: typeof Errors.ConflictError;
    static RateLimitError: typeof Errors.RateLimitError;
    static BadRequestError: typeof Errors.BadRequestError;
    static AuthenticationError: typeof Errors.AuthenticationError;
    static InternalServerError: typeof Errors.InternalServerError;
    static PermissionDeniedError: typeof Errors.PermissionDeniedError;
    static UnprocessableEntityError: typeof Errors.UnprocessableEntityError;
    static toFile: typeof Uploads.toFile;
    completions: API.Completions;
    chat: API.Chat;
    embeddings: API.Embeddings;
    audio: API.Audio;
    models: API.Models;
    batches: API.Batches;
    files: API.Files;
}
export declare namespace Groq {
    export type RequestOptions = Opts.RequestOptions;
    export { Completions as Completions, type CompletionUsage as CompletionUsage };
    export { Chat as Chat };
    export { Embeddings as Embeddings, type CreateEmbeddingResponse as CreateEmbeddingResponse, type Embedding as Embedding, type EmbeddingCreateParams as EmbeddingCreateParams, };
    export { Audio as Audio };
    export { Models as Models, type Model as Model, type ModelDeleted as ModelDeleted, type ModelListResponse as ModelListResponse, };
    export { Batches as Batches, type BatchCreateResponse as BatchCreateResponse, type BatchRetrieveResponse as BatchRetrieveResponse, type BatchListResponse as BatchListResponse, type BatchCancelResponse as BatchCancelResponse, type BatchCreateParams as BatchCreateParams, };
    export { Files as Files, type FileCreateResponse as FileCreateResponse, type FileListResponse as FileListResponse, type FileDeleteResponse as FileDeleteResponse, type FileInfoResponse as FileInfoResponse, type FileCreateParams as FileCreateParams, };
    export type ErrorObject = API.ErrorObject;
    export type FunctionDefinition = API.FunctionDefinition;
    export type FunctionParameters = API.FunctionParameters;
}
//# sourceMappingURL=client.d.ts.map