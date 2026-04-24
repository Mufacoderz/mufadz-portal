"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translations = void 0;
const resource_1 = require("../../core/resource.js");
const uploads_1 = require("../../internal/uploads.js");
class Translations extends resource_1.APIResource {
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
        return this._client.post('/openai/v1/audio/translations', (0, uploads_1.multipartFormRequestOptions)({ body, ...options }, this._client));
    }
}
exports.Translations = Translations;
//# sourceMappingURL=translations.js.map