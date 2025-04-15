
import { DynamicTool } from "langchain/tools";

/**
 * Initialize the Plaid client with API credentials
 */
export function initPlaidClient(clientId: string, secret: string, accessToken: string, env = 'sandbox'): void {
  if (!clientId || !secret) {
    console.error("Plaid client ID and secret are required");
    return;
  }
  
  global.PLAID_CLIENT_ID = clientId;
  global.PLAID_SECRET = secret;
  global.PLAID_ACCESS_TOKEN = accessToken;
  global.PLAID_ENV = env;
}

/**
 * Create a Plaid finance tool for LangChain that can retrieve account balances and transaction data
 */
export function createPlaidTool() {
  return new DynamicTool({
    name: "PlaidFinance",
    description: "Use this to retrieve business cashflow, transactions, and account balances via Plaid.",
    func: async (input: string) => {
      try {
        const clientId = global.PLAID_CLIENT_ID;
        const secret = global.PLAID_SECRET;
        const accessToken = global.PLAID_ACCESS_TOKEN;
        
        if (!clientId || !secret || !accessToken) {
          return "Plaid client not initialized. Please set PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_ACCESS_TOKEN first.";
        }
        
        const query = input.toLowerCase();
        
        // Get cash balance
        if (query.includes('balance') || query.includes('cash')) {
          const response = await fetch(`https://api.plaid.com/accounts/balance/get`, {
            method: 'POST',
            headers: {
              'PLAID-CLIENT-ID': clientId,
              'PLAID-SECRET': secret,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ access_token: accessToken })
          });

          if (!response.ok) {
            return "Failed to fetch account balances.";
          }

          const data = await response.json();
          const summary = data.accounts.map((acc: any) => 
            `• ${acc.name}: $${acc.balances.current}`).join('\n');
          
          return `Current account balances:\n${summary}`;
        }

        // Get recent transactions
        if (query.includes('transaction') || query.includes('expenses')) {
          const now = new Date().toISOString().split('T')[0];
          const past = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          
          const response = await fetch(`https://api.plaid.com/transactions/get`, {
            method: 'POST',
            headers: {
              'PLAID-CLIENT-ID': clientId,
              'PLAID-SECRET': secret,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              access_token: accessToken,
              start_date: past,
              end_date: now
            })
          });

          if (!response.ok) {
            return "Failed to fetch transactions.";
          }

          const data = await response.json();
          const topTx = data.transactions.slice(0, 5).map((tx: any) => 
            `• $${tx.amount} at ${tx.name}`).join('\n');
          
          return `Top 5 expenses in the last 7 days:\n${topTx}`;
        }

        return 'You can ask for "balance" or "recent transactions".';
      } catch (err) {
        console.error('PlaidTool error:', err);
        return `Failed to process Plaid request: ${err instanceof Error ? err.message : String(err)}`;
      }
    }
  });
}
