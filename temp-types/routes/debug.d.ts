import { Hono } from "hono";
import { Env } from "../types";
/**
 * Debug and testing routes for troubleshooting authentication and API functionality.
 */
export declare const DebugRoute: Hono<{
    Bindings: Env;
}, import("hono/types").BlankSchema, "/">;
