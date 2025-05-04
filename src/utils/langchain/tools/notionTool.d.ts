import { DynamicTool } from "langchain/tools";
/**
 * Initialize the Notion client with API key
 */
export declare function initNotionClient(apiKey: string): void;
/**
 * Create a Notion tool for LangChain that can save content to a Notion database
 */
export declare function createNotionTool(databaseId: string): DynamicTool;
