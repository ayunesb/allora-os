
// Supabase Edge Function for LangChain Agent
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { initializeAgentExecutorWithOptions } from "npm:langchain/agents";
import { ChatOpenAI } from "npm:@langchain/openai";
import { DynamicTool } from "npm:langchain/tools";
import { OpenAI } from "npm:langchain/llms/openai";
import { Client } from "npm:@notionhq/client";
import Stripe from "npm:stripe";

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

    // Add Notion tool if environment variables are set
    const notionApiKey = Deno.env.get("NOTION_API_KEY");
    const notionDbId = Deno.env.get("NOTION_DB_ID");
    
    if (notionApiKey && notionDbId) {
      const notion = new Client({ auth: notionApiKey });
      
      tools.push(
        new DynamicTool({
          name: "NotionMemory",
          description: "Save a strategy or decision log into Notion with title and content. The input should be formatted with a title on the first line followed by content.",
          func: async (input: string) => {
            try {
              console.log("Running Notion tool with input:", input);
              const [titleLine, ...bodyLines] = input.split('\n');
              const title = titleLine.trim();
              const content = bodyLines.join('\n').trim();

              const response = await notion.pages.create({
                parent: { database_id: notionDbId },
                properties: {
                  Name: {
                    title: [{ text: { content: title } }]
                  }
                },
                children: [
                  {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                      rich_text: [{ type: 'text', text: { content } }]
                    }
                  }
                ]
              });

              return `Successfully logged to Notion: ${title}`;
            } catch (err) {
              console.error('NotionTool error:', err);
              return `Failed to log to Notion: ${err instanceof Error ? err.message : String(err)}`;
            }
          },
        })
      );
    }
    
    // Add Stripe tool if environment variable is set
    const stripeApiKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (stripeApiKey) {
      const stripe = new Stripe(stripeApiKey, {
        apiVersion: "2023-10-16",
      });
      
      tools.push(
        new DynamicTool({
          name: "StripeAnalytics",
          description: "Use this to retrieve payment info, revenue totals, or subscription status from Stripe.",
          func: async (input: string) => {
            try {
              console.log("Running Stripe tool with input:", input);
              const normalized = input.toLowerCase();

              // Total revenue in the past 30 days
              if (normalized.includes('total revenue')) {
                const now = Math.floor(Date.now() / 1000);
                const thirtyDaysAgo = now - 30 * 24 * 60 * 60;

                const charges = await stripe.charges.list({
                  limit: 100,
                  created: { gte: thirtyDaysAgo }
                });

                const total = charges.data.reduce((sum, charge) => {
                  return charge.paid && !charge.refunded ? sum + charge.amount : sum;
                }, 0);

                return `Total revenue in last 30 days: $${(total / 100).toFixed(2)}`;
              }

              // List active subscriptions
              if (normalized.includes('active subscriptions')) {
                const subs = await stripe.subscriptions.list({ status: 'active', limit: 10 });
                if (subs.data.length === 0) {
                  return "No active subscriptions found.";
                }
                
                const names = subs.data.map(sub => 
                  `• ${sub.customer} (${sub.items.data[0].price.nickname || 'Default Plan'})`
                ).join('\n');
                
                return `Active subscriptions:\n${names}`;
              }

              // Check for refunds in the past week
              if (normalized.includes('refunds')) {
                const now = Math.floor(Date.now() / 1000);
                const oneWeekAgo = now - 7 * 24 * 60 * 60;

                const refunds = await stripe.refunds.list({
                  limit: 20,
                  created: { gte: oneWeekAgo }
                });

                if (refunds.data.length === 0) {
                  return "No refunds in the past week.";
                }

                const total = refunds.data.reduce((sum, refund) => sum + refund.amount, 0);
                
                return `Refunds in the past week: ${refunds.data.length} totaling $${(total / 100).toFixed(2)}`;
              }

              // Default fallback
              return 'Specify what you want from Stripe (e.g., "total revenue", "active subscriptions", "refunds this week").';
            } catch (err) {
              console.error('StripeAnalytics tool error:', err);
              return `Failed to retrieve data from Stripe: ${err instanceof Error ? err.message : String(err)}`;
            }
          }
        })
      );
    }

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
