import { APIResource } from "../../core/resource.mjs";
import * as SpeechAPI from "./speech.mjs";
import { Speech, SpeechCreateParams } from "./speech.mjs";
import * as TranscriptionsAPI from "./transcriptions.mjs";
import { Transcription, TranscriptionCreateParams, Transcriptions } from "./transcriptions.mjs";
import * as TranslationsAPI from "./translations.mjs";
import { Translation, TranslationCreateParams, Translations } from "./translations.mjs";
export declare class Audio extends APIResource {
    speech: SpeechAPI.Speech;
    transcriptions: TranscriptionsAPI.Transcriptions;
    translations: TranslationsAPI.Translations;
}
export declare namespace Audio {
    export { Speech as Speech, type SpeechCreateParams as SpeechCreateParams };
    export { Transcriptions as Transcriptions, type Transcription as Transcription, type TranscriptionCreateParams as TranscriptionCreateParams, };
    export { Translations as Translations, type Translation as Translation, type TranslationCreateParams as TranslationCreateParams, };
}
//# sourceMappingURL=audio.d.mts.map