import { Env } from "./types";
interface TokenCacheInfo {
    cached: boolean;
    cached_at?: string;
    expires_at?: string;
    time_until_expiry_seconds?: number;
    is_expired?: boolean;
    message?: string;
    error?: string;
}
/**
 * Handles OAuth2 authentication and Google Code Assist API communication.
 * Manages token caching, refresh, and API calls.
 */
export declare class AuthManager {
    private env;
    private accessToken;
    constructor(env: Env);
    /**
     * Initializes authentication using OAuth2 credentials with KV storage caching.
     */
    initializeAuth(): Promise<void>;
    /**
     * Refresh the OAuth token and cache it in KV storage.
     */
    private refreshAndCacheToken;
    /**
     * Cache the access token in KV storage.
     */
    private cacheTokenInKV;
    /**
     * Clear cached token from KV storage.
     */
    clearTokenCache(): Promise<void>;
    /**
     * Get cached token info from KV storage.
     */
    getCachedTokenInfo(): Promise<TokenCacheInfo>;
    /**
     * A generic method to call a Code Assist API endpoint.
     */
    callEndpoint(method: string, body: Record<string, unknown>, isRetry?: boolean): Promise<unknown>;
    /**
     * Get the current access token.
     */
    getAccessToken(): string | null;
}
export {};
