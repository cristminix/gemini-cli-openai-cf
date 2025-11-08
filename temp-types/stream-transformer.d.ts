import { StreamChunk } from "./types";
/**
 * Creates a TransformStream to convert Gemini's output chunks
 * into OpenAI-compatible server-sent events.
 */
export declare function createOpenAIStreamTransformer(model: string): TransformStream<StreamChunk, Uint8Array>;
