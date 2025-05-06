import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl =
  Deno.env.get("SUPABASE_URL") || "https://tnfqzklfdwknmplrygag.supabase.co";
const supabaseKey =
  Deno.env.get("SUPABASE_ANON_KEY") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A";

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { template_id, user_id, upvote = true } = await req.json();

    if (!template_id || !user_id) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: template_id or user_id",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // First check if a vote already exists for this user and template
    const { data: existingVote, error: fetchError } = await supabase
      .from("strategy_template_votes")
      .select("*")
      .eq("template_id", template_id)
      .eq("user_id", user_id)
      .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    let result;
    if (existingVote) {
      // If vote exists but with different value, update it
      if (existingVote.upvote !== upvote) {
        result = await supabase
          .from("strategy_template_votes")
          .update({ upvote })
          .eq("id", existingVote.id);
      } else {
        // Vote is the same, so we'll return early
        return new Response(
          JSON.stringify({ success: true, message: "Vote already recorded" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      }
    } else {
      // No existing vote, insert new one
      result = await supabase
        .from("strategy_template_votes")
        .insert({ template_id, user_id, upvote });
    }

    if (result.error) {
      throw result.error;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Vote recorded successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error recording vote:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
