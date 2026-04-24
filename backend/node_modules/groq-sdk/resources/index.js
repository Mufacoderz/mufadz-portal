"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = exports.Files = exports.Embeddings = exports.Completions = exports.Chat = exports.Batches = exports.Audio = void 0;
const tslib_1 = require("../internal/tslib.js");
tslib_1.__exportStar(require("./shared.js"), exports);
var audio_1 = require("./audio/audio.js");
Object.defineProperty(exports, "Audio", { enumerable: true, get: function () { return audio_1.Audio; } });
var batches_1 = require("./batches.js");
Object.defineProperty(exports, "Batches", { enumerable: true, get: function () { return batches_1.Batches; } });
var chat_1 = require("./chat/chat.js");
Object.defineProperty(exports, "Chat", { enumerable: true, get: function () { return chat_1.Chat; } });
var completions_1 = require("./completions.js");
Object.defineProperty(exports, "Completions", { enumerable: true, get: function () { return completions_1.Completions; } });
var embeddings_1 = require("./embeddings.js");
Object.defineProperty(exports, "Embeddings", { enumerable: true, get: function () { return embeddings_1.Embeddings; } });
var files_1 = require("./files.js");
Object.defineProperty(exports, "Files", { enumerable: true, get: function () { return files_1.Files; } });
var models_1 = require("./models.js");
Object.defineProperty(exports, "Models", { enumerable: true, get: function () { return models_1.Models; } });
//# sourceMappingURL=index.js.map