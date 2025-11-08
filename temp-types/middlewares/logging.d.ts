import { Context, Next } from "hono";
import { Env } from "../types";
/**
 * Logging middleware for request/response tracking
 *
 * Logs:
 * - Request start with method, path, and body (for POST/PUT/PATCH)
 * - Request completion with status code and duration
 * - Masks sensitive data in request bodies
 */
export declare const loggingMiddleware: (c: Context<{
    Bindings: Env;
}>, next: Next) => Promise<void>;
