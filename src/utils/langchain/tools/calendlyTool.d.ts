import { DynamicTool } from "langchain/tools";
/**
 * Initialize the Calendly client with API key and user URI
 */
export declare function initCalendlyClient(
  apiKey: string,
  userUri: string,
): void;
/**
 * Create a Calendly tool for LangChain that can check availability and schedule meetings
 */
export declare function createCalendlyTool(): DynamicTool;
