import { NativeToolResponse } from "./types/native-tools";
export type SafetyThreshold = "BLOCK_NONE" | "BLOCK_FEW" | "BLOCK_SOME" | "BLOCK_ONLY_HIGH" | "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
export interface Env {
    GCP_SERVICE_ACCOUNT: string;
    GEMINI_PROJECT_ID?: string;
    GEMINI_CLI_KV: KVNamespace;
    OPENAI_API_KEY?: string;
    ENABLE_FAKE_THINKING?: string;
    ENABLE_REAL_THINKING?: string;
    STREAM_THINKING_AS_CONTENT?: string;
    ENABLE_AUTO_MODEL_SWITCHING?: string;
    GEMINI_MODERATION_HARASSMENT_THRESHOLD?: SafetyThreshold;
    GEMINI_MODERATION_HATE_SPEECH_THRESHOLD?: SafetyThreshold;
    GEMINI_MODERATION_SEXUALLY_EXPLICIT_THRESHOLD?: SafetyThreshold;
    GEMINI_MODERATION_DANGEROUS_CONTENT_THRESHOLD?: SafetyThreshold;
    ENABLE_GEMINI_NATIVE_TOOLS?: string;
    ENABLE_GOOGLE_SEARCH?: string;
    ENABLE_URL_CONTEXT?: string;
    GEMINI_TOOLS_PRIORITY?: string;
    DEFAULT_TO_NATIVE_TOOLS?: string;
    ALLOW_REQUEST_TOOL_CONTROL?: string;
    ENABLE_INLINE_CITATIONS?: string;
    INCLUDE_GROUNDING_METADATA?: string;
    INCLUDE_SEARCH_ENTRY_POINT?: string;
}
export interface OAuth2Credentials {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
    expiry_date: number;
}
export interface ModelInfo {
    maxTokens: number;
    contextWindow: number;
    supportsImages: boolean;
    supportsPromptCache: boolean;
    inputPrice: number;
    outputPrice: number;
    description: string;
    thinking: boolean;
}
export type EffortLevel = "none" | "low" | "medium" | "high";
export interface Tool {
    type: "function";
    function: {
        name: string;
        description?: string;
        parameters?: Record<string, unknown>;
    };
}
export type ToolChoice = "none" | "auto" | {
    type: "function";
    function: {
        name: string;
    };
};
export interface ChatCompletionRequest {
    model: string;
    messages: ChatMessage[];
    stream?: boolean;
    thinking_budget?: number;
    reasoning_effort?: EffortLevel;
    tools?: Tool[];
    tool_choice?: ToolChoice;
    extra_body?: {
        reasoning_effort?: EffortLevel;
        enable_search?: boolean;
        enable_url_context?: boolean;
        enable_native_tools?: boolean;
        native_tools_priority?: "native" | "custom" | "mixed";
    };
    model_params?: {
        reasoning_effort?: EffortLevel;
        enable_search?: boolean;
        enable_url_context?: boolean;
        enable_native_tools?: boolean;
        native_tools_priority?: "native" | "custom" | "mixed";
    };
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
    enable_search?: boolean;
    enable_url_context?: boolean;
    enable_native_tools?: boolean;
    native_tools_priority?: "native" | "custom" | "mixed";
}
export interface ToolCall {
    id: string;
    type: "function";
    function: {
        name: string;
        arguments: string;
    };
}
export interface ChatMessage {
    role: string;
    content: string | MessageContent[];
    tool_calls?: ToolCall[];
    tool_call_id?: string;
}
export interface MessageContent {
    type: "text" | "image_url";
    text?: string;
    image_url?: {
        url: string;
        detail?: "low" | "high" | "auto";
    };
}
export interface ChatCompletionResponse {
    id: string;
    object: "chat.completion";
    created: number;
    model: string;
    choices: ChatCompletionChoice[];
    usage?: ChatCompletionUsage;
}
export interface ChatCompletionChoice {
    index: number;
    message: ChatCompletionMessage;
    finish_reason: "stop" | "length" | "tool_calls" | "content_filter" | null;
}
export interface ChatCompletionMessage {
    role: "assistant";
    content: string | null;
    tool_calls?: ToolCall[];
}
export interface ChatCompletionUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
export interface GeminiFunctionCall {
    name: string;
    args: object;
}
export interface UsageData {
    inputTokens: number;
    outputTokens: number;
}
export interface ReasoningData {
    reasoning: string;
    toolCode?: string;
}
export interface StreamChunk {
    type: "text" | "usage" | "reasoning" | "thinking_content" | "real_thinking" | "tool_code" | "native_tool" | "grounding_metadata";
    data: string | UsageData | ReasoningData | GeminiFunctionCall | NativeToolResponse;
}
