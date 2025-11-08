# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare Worker that provides OpenAI-compatible API endpoints for Google's Gemini models using OAuth2 authentication. It acts as a translation layer between OpenAI API calls and Google's Code Assist API, enabling access to Gemini models through familiar OpenAI patterns.

## Architecture

### Core Components

1. **Main Entry Point** (`src/index.ts`): Hono-based Cloudflare Worker with CORS, logging, and authentication middleware
2. **OpenAI Routes** (`src/routes/openai.ts`): Handles `/v1/models` and `/v1/chat/completions` endpoints
3. **Debug Routes** (`src/routes/debug.ts`): Provides token cache inspection and testing endpoints
4. **Authentication Manager** (`src/auth.ts`): OAuth2 token management with KV caching and refresh logic
5. **Gemini Client** (`src/gemini-client.ts`): Handles communication with Google's Code Assist API
6. **Stream Transformer** (`src/stream-transformer.ts`): Converts Gemini API responses to OpenAI-compatible format

### Key Features

- **OAuth2 Authentication**: Uses Google account credentials without API keys
- **Token Caching**: Smart token management with Cloudflare KV storage
- **Streaming Support**: Server-sent events for real-time responses
- **Thinking/Reasoning**: Support for Gemini's reasoning capabilities with effort controls
- **Vision Models**: Multi-modal support for images (base64 and URLs)
- **Tool Calling**: OpenAI-compatible function calling with Gemini integration
- **Auto Model Switching**: Fallback from pro to flash models on rate limits
- **Content Safety**: Configurable moderation thresholds

### Data Flow

```
Client Request → Cloudflare Worker → Auth Manager (KV Cache Check) → Token Validation/Refresh → Gemini API → Response Transformation → OpenAI Format → Client Response
```

## Development Commands

### Build and Deploy
```bash
# Install dependencies
pnpm install

# Run locally for development
pnpm run dev

# Deploy to Cloudflare Workers
pnpm run deploy

# Build for production (dry run)
pnpm run build
```

### Docker Commands
```bash
# Build and start Docker container
pnpm run docker:dev

# Build Docker image
pnpm run docker:build

# Start existing container
pnpm run docker:start

# Stop containers
pnpm run docker:stop

# Clean Docker environment
pnpm run docker:clean

# View container logs
pnpm run docker:logs

# Access container shell
pnpm run docker:shell
```

### Code Quality
```bash
# Format code with Prettier
pnpm run format

# Check formatting
pnpm run format:check

# Lint code
pnpm run lint

# Fix lint issues
pnpm run lint:fix

# Type check
pnpm run tsc
```

## Environment Configuration

### Required Variables
- `GCP_SERVICE_ACCOUNT`: OAuth2 credentials JSON string from Gemini CLI
- `GEMINI_PROJECT_ID`: Google Cloud Project ID (auto-discovered if not set)
- `OPENAI_API_KEY`: Optional API key for authentication (public if not set)

### Thinking & Reasoning Variables
- `ENABLE_FAKE_THINKING`: Enable synthetic thinking output for testing
- `ENABLE_REAL_THINKING`: Enable real Gemini thinking output
- `STREAM_THINKING_AS_CONTENT`: Stream thinking as content with `<thinking>` tags

### Feature Flags
- `ENABLE_AUTO_MODEL_SWITCHING`: Auto fallback from pro to flash on rate limits
- `ENABLE_GEMINI_NATIVE_TOOLS`: Enable native tools support
- `ENABLE_GOOGLE_SEARCH`: Enable Google Search native tool
- `ENABLE_URL_CONTEXT`: Enable URL Context native tool

### Content Safety Variables
- `GEMINI_MODERATION_HARASSMENT_THRESHOLD`: Harassment content threshold
- `GEMINI_MODERATION_HATE_SPEECH_THRESHOLD`: Hate speech threshold
- `GEMINI_MODERATION_SEXUALLY_EXPLICIT_THRESHOLD`: Explicit content threshold
- `GEMINI_MODERATION_DANGEROUS_CONTENT_THRESHOLD`: Dangerous content threshold

## Testing Endpoints

### API Endpoints
- `GET /v1/models`: List available Gemini models
- `POST /v1/chat/completions`: Chat completions with streaming support
- `GET /v1/debug/cache`: Check token cache status
- `POST /v1/token-test`: Test authentication only
- `POST /v1/test`: Full flow test
- `GET /health`: Health check endpoint

### Authentication
When `OPENAI_API_KEY` is set, all `/v1/*` endpoints require: `Authorization: Bearer <your-api-key>`

## Key Files and Directories

- `src/index.ts`: Main Hono application setup
- `src/routes/openai.ts`: OpenAI-compatible API endpoints
- `src/auth.ts`: OAuth2 authentication and token management
- `src/gemini-client.ts`: Gemini API communication layer
- `src/stream-transformer.ts`: Response format conversion
- `src/types.ts`: Type definitions for the entire project
- `src/models.ts`: Available Gemini model definitions
- `src/config.ts`: API endpoints and OAuth configuration
- `src/constants.ts`: Default values and configuration constants
- `src/helpers/`: Utility classes for generation config, auto switching, etc.
- `src/middlewares/`: Authentication and logging middleware
- `src/utils/`: Utility functions (image validation, etc.)
- `wrangler.toml`: Cloudflare Worker configuration
- `Dockerfile`: Docker container configuration
- `docker-compose.yml`: Docker Compose setup for local development

## Testing

### Single Test Run
```bash
# Test a specific endpoint
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-secret-api-key" \
  -d '{
    "model": "gemini-2.5-flash",
    "messages": [
      {"role": "user", "content": "Hello, world!"}
    ]
  }'
```

### Debugging
- Check token cache: `GET /v1/debug/cache`
- Test authentication: `POST /v1/token-test`
- Full flow test: `POST /v1/test`
- Health check: `GET /health`

## Security Considerations

- OAuth2 tokens are cached in Cloudflare KV with automatic refresh
- All API calls are retried once on 401 errors with token refresh
- Content safety filters are configurable via environment variables
- Authentication can be enforced with optional API keys
- Uses secure OAuth2 client credentials