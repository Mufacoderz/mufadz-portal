"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batches = void 0;
const resource_1 = require("../core/resource.js");
const path_1 = require("../internal/utils/path.js");
class Batches extends resource_1.APIResource {
    /**
     * Creates and executes a batch from an uploaded file of requests.
     * [Learn more](/docs/batch).
     */
    create(body, options) {
        return this._client.post('/openai/v1/batches', { body, ...options });
    }
    /**
     * Retrieves a batch.
     */
    retrieve(batchID, options) {
        return this._client.get((0, path_1.path) `/openai/v1/batches/${batchID}`, options);
    }
    /**
     * List your organization's batches.
     */
    list(options) {
        return this._client.get('/openai/v1/batches', options);
    }
    /**
     * Cancels a batch.
     */
    cancel(batchID, options) {
        return this._client.post((0, path_1.path) `/openai/v1/batches/${batchID}/cancel`, options);
    }
}
exports.Batches = Batches;
//# sourceMappingURL=batches.js.map