import { Env, StreamChunk, UsageData, ChatMessage, Tool, ToolChoice } from "./types";
import { AuthManager } from "./auth";
import { GeminiUrlContextMetadata, NativeToolsRequestParams } from "./types/native-tools";
export interface GeminiPart {
    text?: string;
    thought?: boolean;
    functionCall?: {
        name: string;
        args: object;
    };
    functionResponse?: {
        name: string;
        response: {
            result: string;
        };
    };
    inlineData?: {
        mimeType: string;
        data: string;
    };
    fileData?: {
        mimeType: string;
        fileUri: string;
    };
    url_context_metadata?: GeminiUrlContextMetadata;
}
/**
 * Handles communication with Google's Gemini API through the Code Assist endpoint.
 * Manages project discovery, streaming, and response parsing.
 */
export declare class GeminiApiClient {
    private env;
    private authManager;
    private projectId;
    private autoSwitchHelper;
    constructor(env: Env, authManager: AuthManager);
    /**
     * Discovers the Google Cloud project ID. Uses the environment variable if provided.
     */
    discoverProjectId(): Promise<string>;
    /**
     * Parses a server-sent event (SSE) stream from the Gemini API.
     */
    private parseSSEStream;
    /**
     * Converts a message to Gemini format, handling both text and image content.
     */
    private messageToGeminiFormat;
    /**
     * Validates if the model supports images.
     */
    private validateImageSupport;
    /**
     * Validates image content and format using the shared validation utility.
     */
    private validateImageContent;
    /**
     * Stream content from Gemini API.
     */
    streamContent(modelId: string, systemPrompt: string, messages: ChatMessage[], options?: {
        includeReasoning?: boolean;
        thinkingBudget?: number;
        tools?: Tool[];
        tool_choice?: ToolChoice;
        max_tokens?: number;
        temperature?: number;
        top_p?: number;
        stop?: string | string[];
        presence_penalty?: number;
        frequency_penalty?: number;
        seed?: number;
        response_format?: {
            type: "text" | "json_object";
        };
    } & NativeToolsRequestParams): AsyncGenerator<StreamChunk>;
    /**
     * Generates reasoning output for thinking models.
     */
    private generateReasoningOutput;
    /**
     * Performs the actual stream request with retry logic for 401 errors and auto model switching for rate limits.
     */
    private performStreamRequest;
    /**
     * Get a complete response from Gemini API (non-streaming).
     */
    getCompletion(modelId: string, systemPrompt: string, messages: ChatMessage[], options?: {
        includeReasoning?: boolean;
        thinkingBudget?: number;
        tools?: Tool[];
        tool_choice?: ToolChoice;
        max_tokens?: number;
        temperature?: number;
        top_p?: number;
        stop?: string | string[];
        presence_penalty?: number;
        frequency_penalty?: number;
        seed?: number;
        response_format?: {
            type: "text" | "json_object";
        };
    } & NativeToolsRequestParams): Promise<{
        content: string;
        usage?: UsageData;
        tool_calls?: Array<{
            id: string;
            type: "function";
            function: {
                name: string;
                arguments: string;
            };
        }>;
    }>;
    private extractNativeToolsParams;
    private extractBooleanParam;
    private extractStringParam;
}
