// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { path } from "../internal/utils/path.mjs";
export class Batches extends APIResource {
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
        return this._client.get(path `/openai/v1/batches/${batchID}`, options);
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
        return this._client.post(path `/openai/v1/batches/${batchID}/cancel`, options);
    }
}
//# sourceMappingURL=batches.mjs.map