import { DynamicTool } from "langchain/tools";
/**
 * Initialize the Plaid client with API credentials
 */
export declare function initPlaidClient(
  clientId: string,
  secret: string,
  accessToken: string,
  env?: string,
): void;
/**
 * Create a Plaid finance tool for LangChain that can retrieve account balances and transaction data
 */
export declare function createPlaidTool(): DynamicTool;
