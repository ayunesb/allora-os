var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Supabase Edge Function for Plaid API
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
// CORS headers for the response
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Get the request body
        const { action, days = 7 } = yield req.json();
        console.log(`Received Plaid action: ${action}`);
        // Get the Plaid API key from environment
        const plaidClientId = Deno.env.get("PLAID_CLIENT_ID");
        const plaidSecret = Deno.env.get("PLAID_SECRET");
        const plaidAccessToken = Deno.env.get("PLAID_ACCESS_TOKEN");
        const plaidEnv = Deno.env.get("PLAID_ENV") || "sandbox";
        if (!plaidClientId || !plaidSecret || !plaidAccessToken) {
            throw new Error("Plaid API configuration missing. Please set PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_ACCESS_TOKEN.");
        }
        let result;
        const apiEndpoint = `https://${plaidEnv === "production" ? "production" : "sandbox"}.plaid.com`;
        // Perform the appropriate action
        if (action === "get_balances") {
            // Get account balances
            const response = yield fetch(`${apiEndpoint}/accounts/balance/get`, {
                method: "POST",
                headers: {
                    "PLAID-CLIENT-ID": plaidClientId,
                    "PLAID-SECRET": plaidSecret,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token: plaidAccessToken }),
            });
            if (!response.ok) {
                throw new Error(`Plaid API error: ${response.statusText}`);
            }
            const data = yield response.json();
            result = data.accounts.map((acc) => ({
                name: acc.name,
                type: acc.type,
                balance: acc.balances.current,
                currency: acc.balances.iso_currency_code,
            }));
        }
        else if (action === "get_transactions") {
            // Get recent transactions
            const now = new Date().toISOString().split("T")[0];
            const past = new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0];
            const response = yield fetch(`${apiEndpoint}/transactions/get`, {
                method: "POST",
                headers: {
                    "PLAID-CLIENT-ID": plaidClientId,
                    "PLAID-SECRET": plaidSecret,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    access_token: plaidAccessToken,
                    start_date: past,
                    end_date: now,
                }),
            });
            if (!response.ok) {
                throw new Error(`Plaid API error: ${response.statusText}`);
            }
            const data = yield response.json();
            result = data.transactions.slice(0, 10).map((tx) => ({
                date: tx.date,
                name: tx.name,
                amount: tx.amount,
                category: tx.category,
            }));
        }
        else {
            throw new Error("Invalid action. Must be 'get_balances' or 'get_transactions'");
        }
        console.log("Plaid request completed successfully");
        return new Response(JSON.stringify({ result }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in plaid-tool function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
