/*
 * JSDoc Documentation for src/models.ts exports
 * This file contains the documented exports from src/models.ts with complete JSDoc comments
 */

import { ModelInfo } from "./types";

/**
 * Configuration object for Gemini CLI models.
 * Maps model IDs to their respective ModelInfo objects containing metadata and capabilities.
 * This allows the application to understand each model's characteristics such as token limits,
 * image support, and pricing information.
 */
export const geminiCliModels: Record<string, ModelInfo> = {
	"gemini-2.5-pro": {
		maxTokens: 65536,
		contextWindow: 1_048_576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Google's Gemini 2.5 Pro model via OAuth (free tier)",
		thinking: true
	},
	"gemini-2.5-flash": {
		maxTokens: 65536,
		contextWindow: 1_048_576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Google's Gemini 2.5 Flash model via OAuth (free tier)",
		thinking: true
	},
	"gemini-2.5-flash-lite": {
		maxTokens: 65536,
		contextWindow: 1_048_576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Google's Gemini 2.5 Flash Lite model via OAuth (free tier)",
		thinking: true
	}
};

/**
 * Default model to use when no specific model is requested.
 * This provides a fallback option for API requests that don't specify a model.
 */
export const DEFAULT_MODEL = "gemini-2.5-flash";

// --- Helper Functions ---

/**
 * Retrieves the model information for a given model ID.
 *
 * This function is essential for validating model requests and accessing model-specific
 * capabilities like token limits, image support, and pricing information. It enables
 * the application to adapt its behavior based on the characteristics of the requested model.
 *
 * @param modelId - The identifier of the model to retrieve information for
 * @returns The ModelInfo object if the model exists, null otherwise
 * @throws No explicit errors, returns null for invalid model IDs
 */
export function getModelInfo(modelId: string): ModelInfo | null {
	// Implementation would be: return geminiCliModels[modelId] || null;
	return null; // Placeholder for documentation purposes
}

/**
 * Retrieves all available model IDs from the configuration.
 *
 * This function is used to provide a complete list of supported models to clients,
 * enabling dynamic model selection and discovery. It's particularly useful for
 * implementing the /v1/models endpoint in the OpenAI-compatible API.
 *
 * @returns An array of all available model IDs
 * @throws No errors - always returns an array of model IDs
 */
export function getAllModelIds(): string[] {
	// Implementation would be: return Object.keys(geminiCliModels);
	return []; // Placeholder for documentation purposes
}

/**
 * Validates whether a given model ID is supported by the application.
 *
 * This function performs a simple existence check against the configured models,
 * helping to prevent invalid model requests from proceeding through the API pipeline.
 * It's used as an early validation step to provide immediate feedback to clients.
 *
 * @param modelId - The model ID to validate
 * @returns true if the model is supported, false otherwise
 * @throws No errors - always returns a boolean value
 */
export function isValidModel(modelId: string): boolean {
	// Implementation would be: return modelId in geminiCliModels;
	return false; // Placeholder for documentation purposes
}