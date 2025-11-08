import { Env } from "../types";
import { GroundingMetadata, CitationSource } from "../types/native-tools";
/**
 * Processes grounding metadata to add inline citations to text responses.
 * Implements the citation logic as described in the Gemini API documentation.
 */
export declare class CitationsProcessor {
    private enableInlineCitations;
    constructor(env: Env);
    /**
     * Finds a "safe" insertion point for a citation to avoid breaking words or URLs.
     * It searches for the nearest whitespace or punctuation after the given index.
     */
    private findSafeInsertionPoint;
    processChunk(textChunk: string, metadata?: GroundingMetadata): string;
    /**
     * Extracts search queries that were used to generate the grounded response.
     */
    extractSearchQueries(groundingMetadata: GroundingMetadata): string[];
    /**
     * Extracts a structured list of sources with IDs, titles, and URIs.
     */
    extractSourceList(groundingMetadata: GroundingMetadata): CitationSource[];
    /**
     * Generates search entry point HTML if available and enabled.
     */
    getSearchEntryPoint(groundingMetadata: GroundingMetadata): string | null;
    /**
     * Creates a summary of the grounding information for debugging/logging.
     */
    createGroundingSummary(groundingMetadata: GroundingMetadata): {
        queryCount: number;
        sourceCount: number;
        supportCount: number;
        queries: string[];
        sources: CitationSource[];
    };
}
