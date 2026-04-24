// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { buildHeaders } from "../internal/headers.mjs";
import { multipartFormRequestOptions } from "../internal/uploads.mjs";
import { path } from "../internal/utils/path.mjs";
export class Files extends APIResource {
    /**
     * Upload a file that can be used across various endpoints.
     *
     * The Batch API only supports `.jsonl` files up to 100 MB in size. The input also
     * has a specific required [format](/docs/batch).
     *
     * Please contact us if you need to increase these storage limits.
     */
    create(body, options) {
        return this._client.post('/openai/v1/files', multipartFormRequestOptions({ body, ...options }, this._client));
    }
    /**
     * Returns a list of files.
     */
    list(options) {
        return this._client.get('/openai/v1/files', options);
    }
    /**
     * Delete a file.
     */
    delete(fileID, options) {
        return this._client.delete(path `/openai/v1/files/${fileID}`, options);
    }
    /**
     * Returns the contents of the specified file.
     */
    content(fileID, options) {
        return this._client.get(path `/openai/v1/files/${fileID}/content`, {
            ...options,
            headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
            __binaryResponse: true,
        });
    }
    /**
     * Returns information about a file.
     */
    info(fileID, options) {
        return this._client.get(path `/openai/v1/files/${fileID}`, options);
    }
}
//# sourceMappingURL=files.mjs.map