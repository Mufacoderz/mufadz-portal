"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transcriptions = void 0;
const resource_1 = require("../../core/resource.js");
const uploads_1 = require("../../internal/uploads.js");
class Transcriptions extends resource_1.APIResource {
    /**
     * Transcribes audio into the input language.
     *
     * @example
     * ```ts
     * const transcription =
     *   await client.audio.transcriptions.create({
     *     model: 'whisper-large-v3-turbo',
     *   });
     * ```
     */
    create(body, options) {
        return this._client.post('/openai/v1/audio/transcriptions', (0, uploads_1.multipartFormRequestOptions)({ body, ...options }, this._client));
    }
}
exports.Transcriptions = Transcriptions;
//# sourceMappingURL=transcriptions.js.map