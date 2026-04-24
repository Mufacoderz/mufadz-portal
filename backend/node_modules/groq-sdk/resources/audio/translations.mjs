// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../../core/resource.mjs";
import { multipartFormRequestOptions } from "../../internal/uploads.mjs";
export class Translations extends APIResource {
    /**
     * Translates audio into English.
     *
     * @example
     * ```ts
     * const translation = await client.audio.translations.create({
     *   model: 'whisper-large-v3-turbo',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/openai/v1/audio/translations', multipartFormRequestOptions({ body, ...options }, this._client));
    }
}
//# sourceMappingURL=translations.mjs.map