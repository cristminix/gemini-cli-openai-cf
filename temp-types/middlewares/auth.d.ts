import { MiddlewareHandler } from "hono";
import { Env } from "../types";
/**
 * Middleware to enforce OpenAI-style API key authentication if OPENAI_API_KEY is set in the environment.
 * Checks for 'Authorization: Bearer <key>' header on protected routes.
 */
export declare const openAIApiKeyAuth: MiddlewareHandler<{
    Bindings: Env;
}>;
