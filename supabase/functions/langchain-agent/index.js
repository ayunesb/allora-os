var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
// Tool detection utility
const detectToolTrigger = (text) => {
    const toolPatterns = {
        stripe: /(revenue|payment|subscription|invoice|charge|refund|mrr|arr)/i,
        plaid: /(bank|account|balance|transaction|financial|cashflow)/i,
        calendly: /(meeting|schedule|appointment|calendar|availability)/i,
        clearbit: /(lead|company info|prospect|enrich|domain lookup)/i,
        notion: /(note|document|write|log|save to notion|store in notion)/i,
    };
    for (const [tool, pattern] of Object.entries(toolPatterns)) {
        if (pattern.test(text)) {
            return tool;
        }
    }
    return null;
};
// Execute the appropriate tool based on detection
const executeToolAction = (tool, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Executing ${tool} with input:`, input);
    switch (tool) {
        case "stripe":
            return yield handleStripeAction(input, context);
        case "plaid":
            return yield handlePlaidAction(input, context);
        case "calendly":
            return yield handleCalendlyAction(input, context);
        case "clearbit":
            return yield handleClearbitAction(input, context);
        case "notion":
            return yield handleNotionAction(input, context);
        default:
            return { result: "No specific tool action detected" };
    }
});
// Tool action handlers
const handleStripeAction = (input, context) => __awaiter(void 0, void 0, void 0, function* () {
    // This would normally call Stripe API
    return {
        result: "Retrieved financial data from Stripe",
        data: {
            mrr: "$12,500",
            activeSubscriptions: 125,
            recentTransactions: [
                { amount: 199, customer: "Acme Inc.", date: "2025-04-10" },
            ],
        },
    };
});
const handlePlaidAction = (input, context) => __awaiter(void 0, void 0, void 0, function* () {
    // This would normally call Plaid API
    return {
        result: "Retrieved banking data from Plaid",
        data: {
            balance: "$45,230.15",
            accounts: [
                { name: "Business Checking", balance: "$32,450.25" },
                { name: "Business Savings", balance: "$12,779.90" },
            ],
        },
    };
});
const handleCalendlyAction = (input, context) => __awaiter(void 0, void 0, void 0, function* () {
    // This would normally call Calendly API
    return {
        result: "Retrieved schedule from Calendly",
        data: {
            availableSlots: [
                { date: "2025-04-16", time: "10:00 AM" },
                { date: "2025-04-16", time: "2:00 PM" },
                { date: "2025-04-17", time: "11:00 AM" },
            ],
        },
    };
});
const handleClearbitAction = (input, context) => __awaiter(void 0, void 0, void 0, function* () {
    // This would normally call Clearbit API
    return {
        result: "Enriched lead data with Clearbit",
        data: {
            company: "TechCorp Solutions",
            size: "51-200 employees",
            industry: "Software",
            location: "San Francisco, CA",
        },
    };
});
const handleNotionAction = (input, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Log to Notion (simulation)
        const title = `Executive Decision: ${context.executive || "AI Executive"}`;
        const content = input.query || "No content provided";
        console.log(`Logging to Notion: ${title}`);
        // This would normally call the Notion API
        return {
            result: "Successfully logged to Notion",
            data: {
                pageId: "notion-page-id-12345",
                title: title,
                timestamp: new Date().toISOString(),
            },
        };
    }
    catch (error) {
        console.error("Notion logging error:", error);
        return { result: `Failed to log to Notion: ${error.message}` };
    }
});
// Execute LangChain agent (simulated)
const runLangChainAgent = (query, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Running agent with query: ${query}`);
    // Detect which tool to use
    const detectedTool = detectToolTrigger(query);
    if (!detectedTool) {
        return {
            result: "I've analyzed your request, but I don't see any specific data that needs to be retrieved. Please provide more details about what business information you need.",
            toolCalls: [],
        };
    }
    // Execute the appropriate tool
    const toolResult = yield executeToolAction(detectedTool, { query }, context);
    // Log the execution
    console.log(`Tool ${detectedTool} execution result:`, toolResult);
    return {
        result: toolResult.result,
        toolCalls: [
            {
                tool: detectedTool,
                input: { query },
                output: toolResult.data || {},
            },
        ],
    };
});
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        const { query, context = {} } = yield req.json();
        if (!query) {
            throw new Error("Query is required");
        }
        // Run the LangChain agent
        const result = yield runLangChainAgent(query, context);
        return new Response(JSON.stringify(result), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in langchain-agent function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
