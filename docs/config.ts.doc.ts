/*
 * JSDoc Documentation for src/config.ts exports
 * This file contains the documented exports from src/config.ts with complete JSDoc comments
 */

/**
 * Base URL for the Google Code Assist API endpoint.
 * This is the primary endpoint used to communicate with Google's Gemini API service.
 * It provides the foundation for all API requests made to the Gemini service.
 */
export const CODE_ASSIST_ENDPOINT = "https://cloudcode-pa.googleapis.com";

/**
 * API version for the Google Code Assist API.
 * Specifies the version of the API to use for requests. This ensures compatibility
 * with the expected API format and features.
 */
export const CODE_ASSIST_API_VERSION = "v1internal";

/**
 * OAuth2 client ID for authenticating with Google's OAuth service.
 * This identifier is used to establish the application's identity when requesting
 * access tokens from Google's authentication service.
 */
export const OAUTH_CLIENT_ID = "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com";

/**
 * OAuth2 client secret for authenticating with Google's OAuth service.
 * This secret is used together with the client ID to authenticate the application
 * when requesting access tokens from Google's authentication service.
 */
export const OAUTH_CLIENT_SECRET = "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";

/**
 * URL endpoint for refreshing OAuth2 access tokens.
 * This endpoint is used when existing access tokens expire and need to be refreshed
 * using the refresh token mechanism provided by Google's OAuth service.
 */
export const OAUTH_REFRESH_URL = "https://oauth2.googleapis.com/token";

/**
 * Buffer time for token expiration (in milliseconds).
 * This defines how early before token expiration the system should refresh the token.
 * The default value of 5 minutes ensures that requests don't fail due to token expiration.
 */
export const TOKEN_BUFFER_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Key name for storing OAuth tokens in Cloudflare KV storage.
 * This constant defines the key under which OAuth tokens are cached in the KV store
 * to avoid repeated authentication requests and improve performance.
 */
export const KV_TOKEN_KEY = "oauth_token_cache";

/**
 * Object type identifier for OpenAI chat completion responses.
 * This constant defines the expected object type in OpenAI API responses,
 * ensuring compatibility with OpenAI's API format expectations.
 */
export const OPENAI_CHAT_COMPLETION_OBJECT = "chat.completion.chunk";

/**
 * Owner identifier for OpenAI model responses.
 * This constant specifies the owner field value for model responses,
 * helping to identify the source of the model in OpenAI-compatible responses.
 */
export const OPENAI_MODEL_OWNER = "google-gemini-cli";