// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../../core/resource.mjs";
import { multipartFormRequestOptions } from "../../internal/uploads.mjs";
export class Transcriptions extends APIResource {
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
        return this._client.post('/openai/v1/audio/transcriptions', multipartFormRequestOptions({ body, ...options }, this._client));
    }
}
//# sourceMappingURL=transcriptions.mjs.map