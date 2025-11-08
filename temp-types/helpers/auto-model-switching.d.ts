import { Env, ChatMessage, UsageData, StreamChunk } from "../types";
/**
 * Helper class for handling automatic model switching on rate limit errors.
 * Provides centralized logic for detecting rate limits and managing fallback models.
 */
export declare class AutoModelSwitchingHelper {
    private env;
    constructor(env: Env);
    /**
     * Checks if auto model switching is enabled via environment variable.
     */
    isEnabled(): boolean;
    /**
     * Gets the fallback model for the given original model.
     * Returns null if no fallback is configured for the model.
     */
    getFallbackModel(originalModel: string): string | null;
    /**
     * Checks if the error message indicates a rate limit error that should trigger auto switching.
     */
    isRateLimitError(error: unknown): boolean;
    /**
     * Checks if the HTTP status code indicates a rate limit error.
     */
    isRateLimitStatus(status: number): boolean;
    /**
     * Determines if fallback should be attempted for the given model and conditions.
     */
    shouldAttemptFallback(originalModel: string): boolean;
    /**
     * Creates a notification message for when a model switch occurs.
     */
    createSwitchNotification(originalModel: string, fallbackModel: string): string;
    /**
     * Handles rate limit fallback for non-streaming requests.
     * This method requires a stream content function to perform the actual retry.
     */
    handleNonStreamingFallback(originalModel: string, systemPrompt: string, messages: ChatMessage[], options: {
        includeReasoning?: boolean;
        thinkingBudget?: number;
    } | undefined, streamContentFn: (modelId: string, systemPrompt: string, messages: ChatMessage[], options?: {
        includeReasoning?: boolean;
        thinkingBudget?: number;
    }) => AsyncGenerator<StreamChunk>): Promise<{
        content: string;
        usage?: UsageData;
    } | null>;
}
