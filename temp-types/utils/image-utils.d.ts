/**
 * Utility functions for image processing and validation
 */
export interface ImageValidationResult {
    isValid: boolean;
    error?: string;
    mimeType?: string;
    format?: string;
}
export interface DataUrlComponents {
    mimeType: string;
    data: string;
}
export interface ModelInfo {
    supportsImages?: boolean;
}
export type ModelRegistry = Record<string, ModelInfo>;
/**
 * Validates an image URL or base64 data URL
 */
export declare function validateImageUrl(imageUrl: string): ImageValidationResult;
/**
 * Extracts image information from a data URL
 */
export declare function parseDataUrl(dataUrl: string): DataUrlComponents | null;
/**
 * Validates if a model supports image inputs
 */
export declare function modelSupportsImages(modelId: string, models: ModelRegistry): boolean;
/**
 * Estimates the token count for an image (rough approximation)
 * This is a simplified estimation - actual token usage may vary
 */
export declare function estimateImageTokens(imageUrl: string, detail?: "low" | "high" | "auto"): number;
