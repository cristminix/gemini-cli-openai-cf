import { ChatCompletionRequest, Env, EffortLevel, SafetyThreshold } from "../types";
import { NativeToolsConfiguration } from "../types/native-tools";
/**
 * Helper class to validate and correct generation configurations for different Gemini models.
 * Handles model-specific limitations and provides sensible defaults.
 */
export declare class GenerationConfigValidator {
    /**
     * Maps reasoning effort to thinking budget based on model type.
     * @param effort - The reasoning effort level
     * @param modelId - The model ID to determine if it's a flash model
     * @returns The corresponding thinking budget
     */
    static mapEffortToThinkingBudget(effort: EffortLevel, modelId: string): number;
    /**
     * Type guard to check if a value is a valid EffortLevel.
     * @param value - The value to check
     * @returns True if the value is a valid EffortLevel
     */
    static isValidEffortLevel(value: unknown): value is EffortLevel;
    /**
     * Creates safety settings configuration for Gemini API.
     * @param env - Environment variables containing safety thresholds
     * @returns Safety settings configuration
     */
    static createSafetySettings(env: Env): Array<{
        category: string;
        threshold: SafetyThreshold;
    }>;
    /**
     * Validates and corrects the thinking budget for a specific model.
     * @param modelId - The Gemini model ID
     * @param thinkingBudget - The requested thinking budget
     * @returns The corrected thinking budget
     */
    static validateThinkingBudget(modelId: string, thinkingBudget: number): number;
    /**
     * Creates a validated generation config for a specific model.
     * @param modelId - The Gemini model ID
     * @param options - Generation options including thinking budget and OpenAI parameters
     * @param isRealThinkingEnabled - Whether real thinking is enabled
     * @param includeReasoning - Whether to include reasoning in response
     * @param env - Environment variables for safety settings
     * @returns Validated generation configuration
     */
    static createValidatedConfig(modelId: string, options: Partial<ChatCompletionRequest>, isRealThinkingEnabled: boolean, includeReasoning: boolean): Record<string, unknown>;
    static createValidateTools(options?: Partial<ChatCompletionRequest>): {
        tools: any[];
        toolConfig: {};
    };
    static createFinalToolConfiguration(config: NativeToolsConfiguration, options?: Partial<ChatCompletionRequest>): {
        tools: unknown[] | undefined;
        toolConfig: unknown | undefined;
    };
}
