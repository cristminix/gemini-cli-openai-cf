/**
 * Constants for the Gemini CLI OpenAI Worker
 */
export declare const REASONING_MESSAGES: string[];
export declare const REASONING_CHUNK_DELAY = 100;
export declare const THINKING_CONTENT_CHUNK_SIZE = 15;
export declare const DEFAULT_THINKING_BUDGET = -1;
export declare const DISABLED_THINKING_BUDGET = 0;
export declare const DEFAULT_TEMPERATURE = 0.7;
export declare const AUTO_SWITCH_MODEL_MAP: {
    readonly "gemini-2.5-pro": "gemini-2.5-flash";
};
export declare const RATE_LIMIT_STATUS_CODES: readonly [429, 503];
export declare const REASONING_EFFORT_BUDGETS: {
    readonly none: 0;
    readonly low: 1024;
    readonly medium: {
        readonly flash: 12288;
        readonly default: 16384;
    };
    readonly high: {
        readonly flash: 24576;
        readonly default: 32768;
    };
};
export declare const GEMINI_SAFETY_CATEGORIES: {
    readonly HARASSMENT: "HARM_CATEGORY_HARASSMENT";
    readonly HATE_SPEECH: "HARM_CATEGORY_HATE_SPEECH";
    readonly SEXUALLY_EXPLICIT: "HARM_CATEGORY_SEXUALLY_EXPLICIT";
    readonly DANGEROUS_CONTENT: "HARM_CATEGORY_DANGEROUS_CONTENT";
};
export declare const NATIVE_TOOLS_DEFAULTS: {
    readonly ENABLE_GEMINI_NATIVE_TOOLS: false;
    readonly ENABLE_GOOGLE_SEARCH: false;
    readonly ENABLE_URL_CONTEXT: false;
    readonly GEMINI_TOOLS_PRIORITY: "native_first";
    readonly DEFAULT_TO_NATIVE_TOOLS: true;
    readonly ALLOW_REQUEST_TOOL_CONTROL: true;
    readonly ENABLE_INLINE_CITATIONS: false;
    readonly INCLUDE_GROUNDING_METADATA: true;
    readonly INCLUDE_SEARCH_ENTRY_POINT: false;
};
