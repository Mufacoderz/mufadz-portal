// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { path } from "../internal/utils/path.mjs";
export class Models extends APIResource {
    /**
     * Get a specific model
     */
    retrieve(model, options) {
        return this._client.get(path `/openai/v1/models/${model}`, options);
    }
    /**
     * get all available models
     */
    list(options) {
        return this._client.get('/openai/v1/models', options);
    }
    /**
     * Delete a model
     */
    delete(model, options) {
        return this._client.delete(path `/openai/v1/models/${model}`, options);
    }
}
//# sourceMappingURL=models.mjs.map