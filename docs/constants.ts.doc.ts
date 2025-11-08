/*
 * JSDoc Documentation for src/constants.ts exports
 * This file contains the documented exports from src/constants.ts with complete JSDoc comments
 */

/**
 * Static reasoning messages used for thinking models.
 * These messages provide visible feedback to users during the thinking/analysis process,
 * creating a more interactive experience by showing the AI's thought process.
 */
export const REASONING_MESSAGES = [
	'🔍 **Analyzing the request: "{requestPreview}"**\n\n',
	"🤔 Let me think about this step by step... ",
	"💭 I need to consider the context and provide a comprehensive response. ",
	"🎯 Based on my understanding, I should address the key points while being accurate and helpful. ",
	"✨ Let me formulate a clear and structured answer.\n\n"
];

/**
 * Default reasoning delay between chunks (in milliseconds).
 * This controls the timing between sending reasoning/thinking messages to create a more
 * natural flow of thought during the AI's processing of requests.
 */
export const REASONING_CHUNK_DELAY = 100;

/**
 * Default chunk size for streaming thinking content (in characters).
 * This controls how many characters are sent per chunk when streaming thinking content.
 * Smaller values create smoother streaming but more network requests.
 */
export const THINKING_CONTENT_CHUNK_SIZE = 15;

/**
 * Default thinking budget value.
 * A value of -1 means dynamic allocation by Gemini (recommended), allowing the model
 * to determine its own thinking time based on the complexity of the request.
 */
export const DEFAULT_THINKING_BUDGET = -1; // -1 means dynamic allocation by Gemini (recommended)

/**
 * Disabled thinking budget value.
 * A value of 0 disables thinking entirely, which can be used to turn off the thinking
 * process when it's not needed or desired.
 */
export const DISABLED_THINKING_BUDGET = 0; // 0 disables thinking entirely

/**
 * Default temperature setting for generation configuration.
 * This controls the randomness of the model's responses, with higher values
 * producing more diverse outputs and lower values producing more deterministic ones.
 */
export const DEFAULT_TEMPERATURE = 0.7;

/**
 * Auto model switching configuration mapping.
 * Defines which models should fall back to alternative models when rate limits occur.
 * This helps maintain service availability by automatically switching to less constrained models.
 */
export const AUTO_SWITCH_MODEL_MAP = {
	"gemini-2.5-pro": "gemini-2.5-flash"
} as const;

/**
 * HTTP status codes that indicate rate limiting.
 * These codes are used to detect when API requests are being rate-limited,
 * triggering fallback mechanisms or retry logic.
 */
export const RATE_LIMIT_STATUS_CODES = [429, 503] as const;

/**
 * Reasoning effort mapping to thinking budgets.
 * Defines different budget levels for reasoning effort, allowing control over
 * how much processing time is allocated for thinking based on the requested effort level.
 */
export const REASONING_EFFORT_BUDGETS = {
	none: 0,
	low: 1024,
	medium: {
		flash: 12288,
		default: 16384
	},
	high: {
		flash: 24576,
		default: 32768
	}
} as const;

/**
 * Gemini safety categories for content moderation.
 * These categories define the different types of harmful content that the safety
 * filters are designed to detect and moderate.
 */
export const GEMINI_SAFETY_CATEGORIES = {
	HARASSMENT: "HARM_CATEGORY_HARASSMENT",
	HATE_SPEECH: "HARM_CATEGORY_HATE_SPEECH",
	SEXUALLY_EXPLICIT: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
	DANGEROUS_CONTENT: "HARM_CATEGORY_DANGEROUS_CONTENT"
} as const;

/**
 * Default configuration for native tools.
 * These settings control the behavior and availability of various native tools
 * that can be used with the Gemini API, such as search and URL context.
 */
export const NATIVE_TOOLS_DEFAULTS = {
	ENABLE_GEMINI_NATIVE_TOOLS: false,
	ENABLE_GOOGLE_SEARCH: false,
	ENABLE_URL_CONTEXT: false,
	GEMINI_TOOLS_PRIORITY: "native_first",
	DEFAULT_TO_NATIVE_TOOLS: true,
	ALLOW_REQUEST_TOOL_CONTROL: true,
	ENABLE_INLINE_CITATIONS: false,
	INCLUDE_GROUNDING_METADATA: true,
	INCLUDE_SEARCH_ENTRY_POINT: false
} as const;