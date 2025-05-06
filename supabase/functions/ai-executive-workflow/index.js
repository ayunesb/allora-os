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
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
// Main function to handle requests
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Create Supabase client
        const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
        const supabase = createClient(supabaseUrl, supabaseKey);
        // Get OpenAI API key
        const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not set");
        }
        // Parse request body
        const { action, companyProfile, strategies } = yield req.json();
        // Choose action based on request
        switch (action) {
            case "generate_strategies":
                return yield generateStrategies(companyProfile, OPENAI_API_KEY);
            case "generate_campaigns":
                return yield generateCampaigns(companyProfile, OPENAI_API_KEY);
            case "generate_scripts":
                return yield generateScripts(companyProfile, OPENAI_API_KEY);
            case "simulate_debate":
                return yield simulateDebate(companyProfile, strategies || [], OPENAI_API_KEY);
            case "generate_all":
                return yield generateAllContent(companyProfile, OPENAI_API_KEY);
            case "refresh_strategies":
                return yield refreshStrategies(companyProfile, OPENAI_API_KEY);
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    }
    catch (error) {
        console.error("Error in ai-executive-workflow function:", error);
        return new Response(JSON.stringify({
            error: error.message,
            success: false,
        }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
// Generate business strategies based on company profile
function generateStrategies(companyProfile, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        // Create a prompt for generating strategies
        const prompt = `
    You are a team of executive-level business advisors tasked with generating strategic business recommendations.
    
    Company Details:
    - Name: ${companyProfile.companyName || "Unknown"}
    - Industry: ${companyProfile.industry || "Unknown"}
    - Size: ${companyProfile.companySize || "Unknown"}
    - Target Markets: ${((_a = companyProfile.targetMarkets) === null || _a === void 0 ? void 0 : _a.join(", ")) || "Unknown"}
    - Risk Appetite: ${companyProfile.riskAppetite || "medium"}
    - Goals: ${((_b = companyProfile.topGoals) === null || _b === void 0 ? void 0 : _b.join(", ")) || "Growth and profitability"}
    
    Based on this information, generate 3 strategic business recommendations.
    For each strategy, provide:
    1. A concise title
    2. A summary of the strategy
    3. The expected outcome
    4. Which executive proposed it (CEO, CFO, CMO, COO, or CTO)
    5. Why it matters to the company
    6. A risk level assessment (Low Risk, Medium Risk, or High Risk)
    
    Format your response as a JSON array with the following structure:
    [
      {
        "title": "Strategy Title",
        "summary": "Strategy summary",
        "expectedOutcome": "Expected outcome",
        "proposedBy": "Executive title",
        "why": "Why this strategy matters",
        "riskLevel": "Risk level"
      }
    ]
  `;
        // Call OpenAI API
        const response = yield callOpenAI(prompt, apiKey);
        try {
            // Parse the strategies from the response
            const strategies = JSON.parse(response);
            return new Response(JSON.stringify({
                strategies,
                success: true,
            }), { headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }) });
        }
        catch (error) {
            console.error("Error parsing strategy response:", error);
            throw new Error("Failed to parse strategy data from AI response");
        }
    });
}
// Generate marketing campaigns based on company profile
function generateCampaigns(companyProfile, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Create a prompt for generating campaigns
        const prompt = `
    You are a marketing expert team tasked with generating marketing campaign ideas.
    
    Company Details:
    - Name: ${companyProfile.companyName || "Unknown"}
    - Industry: ${companyProfile.industry || "Unknown"}
    - Target Markets: ${((_a = companyProfile.targetMarkets) === null || _a === void 0 ? void 0 : _a.join(", ")) || "Unknown"}
    - Marketing Budget: ${companyProfile.marketingBudget || "Unknown"}
    
    Based on this information, generate 3 marketing campaign ideas.
    For each campaign, provide:
    1. The marketing platform (Facebook, LinkedIn, Google, Email, etc.)
    2. The campaign objective
    3. The target audience
    4. A sample script/copy for the campaign
    5. Who recommended this campaign (CMO, Marketing Director, Social Media Expert)
    
    Format your response as a JSON array with the following structure:
    [
      {
        "platform": "Platform name",
        "objective": "Campaign objective",
        "targetAudience": "Target audience description",
        "script": "Sample script/copy",
        "recommendedBy": "Executive/expert title"
      }
    ]
  `;
        // Call OpenAI API
        const response = yield callOpenAI(prompt, apiKey);
        try {
            // Parse the campaigns from the response
            const campaigns = JSON.parse(response);
            return new Response(JSON.stringify({
                campaigns,
                success: true,
            }), { headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }) });
        }
        catch (error) {
            console.error("Error parsing campaign response:", error);
            throw new Error("Failed to parse campaign data from AI response");
        }
    });
}
// Generate communication scripts based on company profile
function generateScripts(companyProfile, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Create a prompt for generating scripts
        const prompt = `
    You are a communication expert team tasked with generating effective communication scripts.
    
    Company Details:
    - Name: ${companyProfile.companyName || "Unknown"}
    - Industry: ${companyProfile.industry || "Unknown"}
    - Communication Methods: ${((_a = companyProfile.communicationMethods) === null || _a === void 0 ? void 0 : _a.join(", ")) || "Email, Phone, Meeting"}
    
    Based on this information, generate 3 communication scripts for different scenarios.
    For each script, provide:
    1. The type of script (Sales call, Customer follow-up, Meeting agenda, etc.)
    2. The actual script content
    3. Who created this script (Sales Director, Customer Success Manager, Communication Expert)
    
    Format your response as a JSON array with the following structure:
    [
      {
        "type": "Script type",
        "script": "Actual script content",
        "attributedTo": "Creator title"
      }
    ]
  `;
        // Call OpenAI API
        const response = yield callOpenAI(prompt, apiKey);
        try {
            // Parse the scripts from the response
            const scripts = JSON.parse(response);
            return new Response(JSON.stringify({
                scripts,
                success: true,
            }), { headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }) });
        }
        catch (error) {
            console.error("Error parsing script response:", error);
            throw new Error("Failed to parse script data from AI response");
        }
    });
}
// Simulate a debate among executives based on company profile
function simulateDebate(companyProfile, strategies, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a prompt for generating an executive debate
        const prompt = `
    You are a virtual boardroom with different executives debating business strategies.
    
    Company Details:
    - Name: ${companyProfile.companyName || "Unknown"}
    - Industry: ${companyProfile.industry || "Unknown"}
    - Risk Appetite: ${companyProfile.riskAppetite || "medium"}
    
    ${strategies.length > 0
            ? `
    Strategies being discussed:
    ${strategies
                .map((s, i) => `
    Strategy ${i + 1}: ${s.title}
    Summary: ${s.summary}
    Proposed by: ${s.proposedBy}
    Risk level: ${s.riskLevel}
    `)
                .join("\n")}
    `
            : "The executives are discussing general business strategies."}
    
    Simulate a debate among the following executives:
    - CEO (focused on overall vision and growth)
    - CFO (focused on financial implications and ROI)
    - CMO (focused on market positioning and customer acquisition)
    - COO (focused on operational feasibility and implementation)
    - CTO (focused on technological aspects and innovation)
    
    Each executive should make at least one statement, expressing their perspective.
    Also provide a brief summary of the conclusion reached after the debate.
    
    Format your response as a JSON object with the following structure:
    {
      "debate": [
        {
          "executive": "Executive title",
          "statement": "Statement made during the debate",
          "position": "supportive/cautious/critical"
        }
      ],
      "summary": "Brief summary of the conclusion"
    }
  `;
        // Call OpenAI API
        const response = yield callOpenAI(prompt, apiKey);
        try {
            // Parse the debate from the response
            const debateData = JSON.parse(response);
            return new Response(JSON.stringify({
                debate: debateData.debate,
                summary: debateData.summary,
                success: true,
            }), { headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }) });
        }
        catch (error) {
            console.error("Error parsing debate response:", error);
            throw new Error("Failed to parse debate data from AI response");
        }
    });
}
// Generate all content in one request
function generateAllContent(companyProfile, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            // Create a prompt for generating all content
            const prompt = `
      You are an AI executive advisor team tasked with generating a comprehensive business plan.
      
      Company Details:
      - Name: ${companyProfile.companyName || "Unknown"}
      - Industry: ${companyProfile.industry || "Unknown"}
      - Size: ${companyProfile.companySize || "Unknown"}
      - Target Markets: ${((_a = companyProfile.targetMarkets) === null || _a === void 0 ? void 0 : _a.join(", ")) || "Unknown"}
      - Risk Appetite: ${companyProfile.riskAppetite || "medium"}
      - Goals: ${((_b = companyProfile.topGoals) === null || _b === void 0 ? void 0 : _b.join(", ")) || "Growth and profitability"}
      - Marketing Budget: ${companyProfile.marketingBudget || "Unknown"}
      
      Please generate the following content:
      
      1. THREE strategic business recommendations
      2. THREE marketing campaign ideas
      3. THREE communication scripts for different scenarios
      4. A simulated debate among executives (CEO, CFO, CMO, COO, CTO) about these strategies
      
      Format your response as a JSON object with the following structure:
      {
        "strategies": [
          {
            "title": "Strategy Title",
            "summary": "Strategy summary",
            "expectedOutcome": "Expected outcome",
            "proposedBy": "Executive title",
            "why": "Why this strategy matters",
            "riskLevel": "Risk level"
          }
        ],
        "campaigns": [
          {
            "platform": "Platform name",
            "objective": "Campaign objective",
            "targetAudience": "Target audience description",
            "script": "Sample script/copy",
            "recommendedBy": "Executive/expert title"
          }
        ],
        "scripts": [
          {
            "type": "Script type",
            "script": "Actual script content",
            "attributedTo": "Creator title"
          }
        ],
        "debate": [
          {
            "executive": "Executive title",
            "statement": "Statement made during the debate",
            "position": "supportive/cautious/critical"
          }
        ],
        "debateSummary": "Brief summary of the conclusion"
      }
    `;
            // Call OpenAI API
            const response = yield callOpenAI(prompt, apiKey);
            // Parse the content from the response
            const content = JSON.parse(response);
            return new Response(JSON.stringify(Object.assign(Object.assign({}, content), { success: true })), { headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }) });
        }
        catch (error) {
            console.error("Error generating all content:", error);
            throw error;
        }
    });
}
// Refresh strategies based on company profile
function refreshStrategies(companyProfile, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use the existing function with a specific prompt
        return yield generateStrategies(companyProfile, apiKey);
    });
}
// Helper function to call OpenAI API
function callOpenAI(prompt, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "You are an AI executive advisor that generates business strategies, marketing campaigns, and communication scripts.",
                        },
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 2000,
                }),
            });
            const data = yield response.json();
            if (data.error) {
                console.error("OpenAI API error:", data.error);
                throw new Error(`OpenAI API error: ${data.error.message}`);
            }
            return data.choices[0].message.content;
        }
        catch (error) {
            console.error("Error calling OpenAI:", error);
            throw error;
        }
    });
}
