var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DynamicTool } from "langchain/tools";
const g = global;
/**
 * Initialize the Plaid client with API credentials
 */
export function initPlaidClient(clientId, secret, accessToken, env = "sandbox") {
    if (!clientId || !secret) {
        console.error("Plaid client ID and secret are required");
        return;
    }
    g.PLAID_CLIENT_ID = clientId;
    g.PLAID_SECRET = secret;
    g.PLAID_ACCESS_TOKEN = accessToken;
    g.PLAID_ENV = env;
}
/**
 * Create a Plaid finance tool for LangChain that can retrieve account balances and transaction data
 */
export function createPlaidTool() {
    return new DynamicTool({
        name: "PlaidFinance",
        description: "Use this to retrieve business cashflow, transactions, and account balances via Plaid.",
        func: (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clientId = g.PLAID_CLIENT_ID;
                const secret = g.PLAID_SECRET;
                const accessToken = g.PLAID_ACCESS_TOKEN;
                if (!clientId || !secret || !accessToken) {
                    return "Plaid client not initialized. Please set PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_ACCESS_TOKEN first.";
                }
                const query = input.toLowerCase();
                // Get cash balance
                if (query.includes("balance") || query.includes("cash")) {
                    const response = yield fetch(`https://api.plaid.com/accounts/balance/get`, {
                        method: "POST",
                        headers: {
                            "PLAID-CLIENT-ID": clientId,
                            "PLAID-SECRET": secret,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ access_token: accessToken }),
                    });
                    if (!response.ok) {
                        return "Failed to fetch account balances.";
                    }
                    const data = yield response.json();
                    const summary = data.accounts
                        .map((acc) => `• ${acc.name}: $${acc.balances.current}`)
                        .join("\n");
                    return `Current account balances:\n${summary}`;
                }
                // Get recent transactions
                if (query.includes("transaction") || query.includes("expenses")) {
                    const now = new Date().toISOString().split("T")[0];
                    const past = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0];
                    const response = yield fetch(`https://api.plaid.com/transactions/get`, {
                        method: "POST",
                        headers: {
                            "PLAID-CLIENT-ID": clientId,
                            "PLAID-SECRET": secret,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            access_token: accessToken,
                            start_date: past,
                            end_date: now,
                        }),
                    });
                    if (!response.ok) {
                        return "Failed to fetch transactions.";
                    }
                    const data = yield response.json();
                    const topTx = data.transactions
                        .slice(0, 5)
                        .map((tx) => `• $${tx.amount} at ${tx.name}`)
                        .join("\n");
                    return `Top 5 expenses in the last 7 days:\n${topTx}`;
                }
                return 'You can ask for "balance" or "recent transactions".';
            }
            catch (err) {
                console.error("PlaidTool error:", err);
                return `Failed to process Plaid request: ${err instanceof Error ? err.message : String(err)}`;
            }
        }),
    });
}
