
// Supabase Edge Function for Calendly API
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
    // Get the request body
    const { action } = await req.json();
    console.log(`Received Calendly action: ${action}`);

    // Get the Calendly API key from environment
    const calendlyApiKey = Deno.env.get("CALENDLY_API_KEY");
    const calendlyUserUri = Deno.env.get("CALENDLY_USER_URI");
    
    if (!calendlyApiKey || !calendlyUserUri) {
      throw new Error("Calendly API configuration missing. Please set CALENDLY_API_KEY and CALENDLY_USER_URI.");
    }

    let result;
    
    // Perform the appropriate action
    if (action === 'check_availability') {
      // Get available scheduling links
      const response = await fetch(`https://api.calendly.com/scheduling_links`, {
        headers: {
          Authorization: `Bearer ${calendlyApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Calendly API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      result = data.collection.map((link: any) => ({
        name: link.name,
        url: link.booking_url,
      }));
    } else if (action === 'get_meeting_types') {
      // Get available event types
      const response = await fetch(`${calendlyUserUri}/event_types`, {
        headers: {
          Authorization: `Bearer ${calendlyApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Calendly API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      result = data.collection.map((event: any) => ({
        name: event.name,
        duration: event.duration,
        url: event.scheduling_url,
      }));
    } else {
      throw new Error("Invalid action. Must be 'check_availability' or 'get_meeting_types'");
    }

    console.log("Calendly request completed successfully");
    return new Response(
      JSON.stringify({ result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in calendly-tool function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
