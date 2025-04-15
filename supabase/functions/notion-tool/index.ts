
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { Client } from "npm:@notionhq/client";

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
    // Get environment variables
    const notionApiKey = Deno.env.get("NOTION_API_KEY");
    const notionDbId = Deno.env.get("NOTION_DB_ID");

    if (!notionApiKey) {
      throw new Error("NOTION_API_KEY environment variable not set");
    }

    if (!notionDbId) {
      throw new Error("NOTION_DB_ID environment variable not set");
    }

    // Initialize Notion client
    const notion = new Client({ auth: notionApiKey });
    
    // Get the request body
    const { title, content } = await req.json();
    
    if (!title || !content) {
      throw new Error("Title and content are required");
    }
    
    // Create page in Notion
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
    
    console.log("Successfully created Notion page");
    
    return new Response(
      JSON.stringify({
        success: true,
        pageId: response.id
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in notion-tool function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
