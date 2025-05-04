import { DynamicTool } from "langchain/tools";
/**
 * Initialize the Clearbit client with API key
 */
export declare function initClearbitClient(apiKey: string): void;
/**
 * Create a Clearbit tool for LangChain that can look up company and person information
 */
export declare function createClearbitTool(): DynamicTool;
