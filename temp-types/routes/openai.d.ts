import { Hono } from "hono";
import { Env } from "../types";
/**
 * OpenAI-compatible API routes for models and chat completions.
 */
export declare const OpenAIRoute: Hono<{
    Bindings: Env;
}, import("hono/types").BlankSchema, "/">;
