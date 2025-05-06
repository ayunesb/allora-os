import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers for the response
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Strategy generation prompt
const SYSTEM_PROMPT = `You are an expert business strategy advisor with expertise across multiple industries.
Your task is to analyze business information and generate THREE distinct strategic options.
Each strategy should be tailored to the company's industry, size, goals, and risk tolerance.

For each strategy, provide:
1. A clear and concise title
2. A detailed description (1-2 paragraphs)
3. 3-5 pros
4. 3-5 cons
5. Estimated ROI (percentage range or value description)
6. Risk level (Low, Medium, or High)
7. Timeline in months
8. 5-7 implementation steps

Adjust strategies based on:
- Risk tolerance: Higher values should include more innovative but risky strategies
- Time horizon: Short (3-6 months), Medium (6-12 months), Long (1-3 years)
- Company size: Tailor to available resources
- Revenue: Scale appropriately with financial capacity

Return structured JSON with the three strategies.`;

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the OpenAI API key from environment variables
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY environment variable not set");
    }

    // Get request body
    const {
      industry,
      companySize,
      revenue,
      goals,
      riskTolerance,
      timeHorizon,
      challenges,
      userId,
      companyId,
      companyName,
    }: {
      industry: string;
      companySize: number;
      revenue: number;
      goals: string;
      riskTolerance: number;
      timeHorizon: string;
      challenges?: string;
      userId?: string;
      companyId?: string;
      companyName?: string;
    } = await req.json();

    // Validate required fields
    if (!industry || !goals || !timeHorizon) {
      throw new Error("Missing required parameters");
    }

    // Construct the user prompt with the business details
    const userPrompt = `
    Please generate three strategic options for my business with these details:

    Company: ${companyName || "My company"}
    Industry: ${industry}
    Company Size: ${companySize} employees
    Annual Revenue: ${revenue}
    Business Goals: ${goals}
    Risk Tolerance: ${riskTolerance}/10 (higher = more aggressive)
    Time Horizon: ${timeHorizon}
    ${challenges ? `Current Challenges: ${challenges}` : ""}

    Please provide three distinct strategies that vary in their approach and risk level. Structure your response as valid JSON with this format:
    {
      "strategies": [
        {
          "title": "Strategy 1 Title",
          "description": "Detailed description...",
          "pros": ["Pro 1", "Pro 2", "Pro 3"],
          "cons": ["Con 1", "Con 2", "Con 3"],
          "estimatedROI": "Expected ROI range or description",
          "riskLevel": "Low/Medium/High",
          "timeline": "X months",
          "implementationSteps": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]
        },
        // Strategy 2 and 3 with the same structure
      ]
    }`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data: { choices: { message: { content: string } }[] } =
      await response.json();
    const strategiesContent = data.choices[0].message.content;

    // Parse the response to ensure it's valid JSON
    let strategies;
    try {
      strategies = JSON.parse(strategiesContent);
    } catch (error) {
      throw new Error("Failed to parse AI response. Invalid JSON format.");
    }

    // Log the strategy generation in the database if we have user and company IDs
    if (userId && companyId) {
      try {
        // Create PostgreSQL client
        const { createClient } = await import(
          "https://esm.sh/@supabase/supabase-js@2.39.6"
        );
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Save the strategy generation to the database
        await supabase.from("ai_strategy_logs").insert({
          user_id: userId,
          company_id: companyId,
          industry,
          risk_tolerance: riskTolerance,
          time_horizon: timeHorizon,
          parameters: {
            industry,
            companySize,
            revenue,
            goals,
            riskTolerance,
            timeHorizon,
            challenges,
          },
          strategies: strategies.strategies,
        });
      } catch (dbError) {
        // Log but don't fail if database logging fails
      }
    }

    // Return the strategies
    return new Response(JSON.stringify(strategies.strategies || []), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
