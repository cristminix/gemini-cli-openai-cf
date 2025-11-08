import { GroundingMetadata, NativeToolResponse } from "../types/native-tools";
import { GeminiPart } from "../gemini-client";
/**
 * Processes response parts from the Gemini API that are related to native tools.
 * This includes grounding metadata, and URL context.
 */
export declare class NativeToolsResponseProcessor {
    /**
     * Processes a single part from the Gemini API response and returns a
     * structured native tool response if the part is a native tool output.
     */
    processNativeToolResponse(part: GeminiPart): NativeToolResponse | null;
    /**
     * Processes grounding metadata from the Gemini API response.
     */
    processGroundingMetadata(metadata: GroundingMetadata): NativeToolResponse;
}
