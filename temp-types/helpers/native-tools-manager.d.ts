import { Env, Tool } from "../types";
import { GroundingMetadata, NativeTool, NativeToolsConfiguration, NativeToolsRequestParams } from "../types/native-tools";
/**
 * Manages the integration of native Gemini tools, including Google Search,
 * URL Context. Handles tool compatibility, priority,
 * and configuration based on environment settings and request parameters.
 */
export declare class NativeToolsManager {
    private envSettings;
    private citationsProcessor;
    constructor(env: Env);
    /**
     * Determines the final tool configuration based on environment settings,
     * request parameters, and tool compatibility rules.
     */
    determineToolConfiguration(customTools: Tool[], requestParams: NativeToolsRequestParams, modelId: string): NativeToolsConfiguration;
    /**
     * Creates the array of native tools to be sent to the Gemini API.
     */
    createNativeToolsArray(params: NativeToolsRequestParams, modelId: string): NativeTool[];
    /**
     * Processes text to add inline citations if enabled.
     */
    processCitationsInText(text: string, groundingMetadata?: GroundingMetadata): string;
    private createSearchAndUrlConfig;
    private createCustomOnlyConfig;
    private shouldEnableGoogleSearch;
    private shouldEnableUrlContext;
    private isLegacyModel;
    private parseEnvironmentSettings;
}
