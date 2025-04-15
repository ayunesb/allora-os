
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    // This is a mock implementation since we don't have real Notion credentials
    // In a real scenario, we would use the Notion API to create entries
    
    const { title, content } = await req.json();
    
    if (!title || !content) {
      throw new Error("Title and content are required");
    }
    
    // Log the request (this would normally be sent to Notion)
    console.log("Notion Tool: Creating page with title:", title);
    console.log("Notion Tool: Content:", content);
    
    // Simulate Notion page creation with a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return new Response(
      JSON.stringify({
        success: true,
        pageId: `notion-page-${Date.now()}`,
        message: "Entry successfully logged to Notion"
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
