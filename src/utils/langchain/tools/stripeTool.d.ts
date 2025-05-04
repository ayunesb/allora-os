import { DynamicTool } from "langchain/tools";
/**
 * Initialize the Stripe client with API key
 */
export declare function initStripeClient(apiKey: string): void;
/**
 * Create a Stripe tool for LangChain that can analyze payment data
 */
export declare function createStripeTool(): DynamicTool;
