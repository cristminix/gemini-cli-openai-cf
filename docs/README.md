# Documentation for Gemini CLI OpenAI Worker

This documentation provides complete documentation for the exported functions and constants in the Gemini CLI OpenAI Worker project. Multiple documentation approaches have been implemented.

## Documentation Files Created

### 1. Manual JSDoc Documentation Files

Due to file modification restrictions in the environment, manual JSDoc documentation was created in separate files in the `docs/` directory:

#### docs/models.ts.doc.ts
Contains JSDoc documentation for all exports from `src/models.ts`:

- `geminiCliModels`: Configuration object mapping model IDs to their capabilities
- `DEFAULT_MODEL`: Default model to use when no specific model is requested
- `getModelInfo(modelId)`: Function to retrieve model information by ID
- `getAllModelIds()`: Function to retrieve all available model IDs
- `isValidModel(modelId)`: Function to validate if a model is supported

#### docs/config.ts.doc.ts
Contains JSDoc documentation for all exports from `src/config.ts`:

- `CODE_ASSIST_ENDPOINT`: Google Code Assist API endpoint
- `CODE_ASSIST_API_VERSION`: API version for Google Code Assist
- `OAUTH_CLIENT_ID`: OAuth2 client ID for Google authentication
- `OAUTH_CLIENT_SECRET`: OAuth2 client secret for Google authentication
- `OAUTH_REFRESH_URL`: URL for refreshing OAuth tokens
- `TOKEN_BUFFER_TIME`: Buffer time for token expiration
- `KV_TOKEN_KEY`: Key name for OAuth token storage in KV
- `OPENAI_CHAT_COMPLETION_OBJECT`: Object type for OpenAI responses
- `OPENAI_MODEL_OWNER`: Owner identifier for OpenAI model responses

#### docs/constants.ts.doc.ts
Contains JSDoc documentation for all exports from `src/constants.ts`:

- `REASONING_MESSAGES`: Static messages for thinking models
- `REASONING_CHUNK_DELAY`: Delay between reasoning chunks
- `THINKING_CONTENT_CHUNK_SIZE`: Chunk size for streaming thinking content
- `DEFAULT_THINKING_BUDGET`: Default thinking budget value
- `DISABLED_THINKING_BUDGET`: Value to disable thinking
- `DEFAULT_TEMPERATURE`: Default temperature for generation
- `AUTO_SWITCH_MODEL_MAP`: Model switching configuration
- `RATE_LIMIT_STATUS_CODES`: HTTP status codes for rate limiting
- `REASONING_EFFORT_BUDGETS`: Mapping of effort to thinking budgets
- `GEMINI_SAFETY_CATEGORIES`: Safety categories for content moderation
- `NATIVE_TOOLS_DEFAULTS`: Default configuration for native tools

#### Additional Manual Documentation Files

- `docs/generation-config-validator.doc.ts` - Documentation for generation config validator
- `docs/auto-model-switching.doc.ts` - Documentation for auto model switching
- `docs/image-utils.doc.ts` - Documentation for image utilities

### 2. Generated Documentation with Typedoc

A complete API documentation website has been generated using Typedoc, which properly handles TypeScript files:

- **Location**: `docs/typedoc/`
- **Access**: Open `docs/typedoc/index.html` in a web browser
- **Content**: Complete API documentation for all TypeScript files in the project
- **Features**: Searchable, hierarchical view of all classes, functions, interfaces, and types

## Purpose of Documentation

Each JSDoc comment includes:
- **Purpose**: Why the function/constant exists and what problem it solves
- **Parameters**: Types and descriptions for function parameters
- **Return Types**: Types and descriptions for function return values
- **Error Conditions**: When errors might occur or special behavior applies

This documentation helps developers understand the codebase better and provides clear guidance on how to use each exported function and constant effectively.