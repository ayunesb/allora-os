
// Supabase Edge Function for LangChain Agent
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { initializeAgentExecutorWithOptions } from "npm:langchain/agents";
import { ChatOpenAI } from "npm:@langchain/openai";
import { DynamicTool } from "npm:langchain/tools";
import { OpenAI } from "npm:langchain/llms/openai";

// CORS headers for the response
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { query, context = {} } = await req.json();
    console.log("Received query:", query);
    console.log("Context:", JSON.stringify(context));

    // Initialize OpenAI model
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAIApiKey) {
      throw new Error("OPENAI_API_KEY environment variable not set");
    }

    const model = new ChatOpenAI({ 
      modelName: "gpt-4o-mini", 
      temperature: 0, 
      openAIApiKey 
    });

    // Define the tools the agent can use
    const tools = [
      new DynamicTool({
        name: "get-company-data",
        description: "Get data about the user's company",
        func: async (input: string) => {
          console.log("Running get-company-data tool with input:", input);
          // Mock implementation - in a real scenario this would query your database
          return JSON.stringify({
            name: "Allora AI",
            industry: "Technology",
            employees: 52,
            annualRevenue: "$5.2M",
            founded: 2023
          });
        },
      }),
      new DynamicTool({
        name: "search-leads",
        description: "Search for leads in the system",
        func: async (input: string) => {
          console.log("Running search-leads tool with input:", input);
          // Mock implementation
          return JSON.stringify([
            { id: "1", name: "Acme Corp", status: "Qualified", value: 15000 },
            { id: "2", name: "Globex Industries", status: "Prospect", value: 25000 },
            { id: "3", name: "Wayne Enterprises", status: "Customer", value: 100000 }
          ]);
        },
      }),
      new DynamicTool({
        name: "analyze-campaign",
        description: "Analyze marketing campaign performance",
        func: async (input: string) => {
          console.log("Running analyze-campaign tool with input:", input);
          // Mock implementation
          return JSON.stringify({
            name: "Q1 Product Launch",
            status: "Active",
            budget: 50000,
            spent: 32500,
            leads: 120,
            conversions: 22,
            roi: 2.8
          });
        },
      }),
    ];

    // Record tool calls for reporting
    const toolCalls: Array<{ tool: string; input: any; output: any }> = [];
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "chat-zero-shot-react-description",
      verbose: true,
      handleToolError: true,
      returnIntermediateSteps: true,
    });

    console.log("Running agent with query:", query);
    const response = await executor.invoke({ 
      input: query,
      context: JSON.stringify(context)
    });

    // Extract tool calls from the intermediate steps
    if (response.intermediateSteps) {
      for (const step of response.intermediateSteps) {
        if (step.action && step.observation) {
          toolCalls.push({
            tool: step.action.tool,
            input: step.action.toolInput,
            output: step.observation
          });
        }
      }
    }

    console.log("Agent execution complete");
    return new Response(
      JSON.stringify({
        result: response.output,
        toolCalls
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in langchain-agent function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
