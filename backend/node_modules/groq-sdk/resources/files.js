"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const resource_1 = require("../core/resource.js");
const headers_1 = require("../internal/headers.js");
const uploads_1 = require("../internal/uploads.js");
const path_1 = require("../internal/utils/path.js");
class Files extends resource_1.APIResource {
    /**
     * Upload a file that can be used across various endpoints.
     *
     * The Batch API only supports `.jsonl` files up to 100 MB in size. The input also
     * has a specific required [format](/docs/batch).
     *
     * Please contact us if you need to increase these storage limits.
     */
    create(body, options) {
        return this._client.post('/openai/v1/files', (0, uploads_1.multipartFormRequestOptions)({ body, ...options }, this._client));
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
        return this._client.delete((0, path_1.path) `/openai/v1/files/${fileID}`, options);
    }
    /**
     * Returns the contents of the specified file.
     */
    content(fileID, options) {
        return this._client.get((0, path_1.path) `/openai/v1/files/${fileID}/content`, {
            ...options,
            headers: (0, headers_1.buildHeaders)([{ Accept: 'application/octet-stream' }, options?.headers]),
            __binaryResponse: true,
        });
    }
    /**
     * Returns information about a file.
     */
    info(fileID, options) {
        return this._client.get((0, path_1.path) `/openai/v1/files/${fileID}`, options);
    }
}
exports.Files = Files;
//# sourceMappingURL=files.js.map