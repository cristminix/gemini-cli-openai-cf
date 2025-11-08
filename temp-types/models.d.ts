import { ModelInfo } from "./types";
export declare const geminiCliModels: Record<string, ModelInfo>;
export declare const DEFAULT_MODEL = "gemini-2.5-flash";
export declare function getModelInfo(modelId: string): ModelInfo | null;
export declare function getAllModelIds(): string[];
export declare function isValidModel(modelId: string): boolean;
