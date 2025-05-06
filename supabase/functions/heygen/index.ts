import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const HEYGEN_API_KEY = Deno.env.get("HEYGEN_API_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "No authorization header" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        Authorization: authHeader,
      },
    },
  });

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const {
      action,
      text,
      avatarId,
      voiceId,
      campaignId,
      strategyId,
      companyName,
    } = await req.json();

    if (action === "generate-video") {
      if (!text || !avatarId || !voiceId) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      const heygenResponse = await fetch(
        "https://api.heygen.com/v1/video/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": HEYGEN_API_KEY,
          },
          body: JSON.stringify({
            avatar: {
              avatar_id: avatarId,
            },
            voice: {
              voice_id: voiceId,
            },
            background: {
              type: "color",
              value: "#ffffff",
            },
            caption: false,
            text: text,
          }),
        },
      );

      const heygenResult = await heygenResponse.json();

      if (!heygenResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to generate video",
            details: heygenResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      const { data: videoData, error: videoError } = await supabase
        .from("generated_videos")
        .insert([
          {
            user_id: user.id,
            video_id: heygenResult.data.video_id,
            campaign_id: campaignId || null,
            strategy_id: strategyId || null,
            text_content: text,
            status: "processing",
            avatar_id: avatarId,
            voice_id: voiceId,
            company_name: companyName || null,
          },
        ])
        .select()
        .single();

      if (videoError) {
        console.error("Error storing video information:", videoError);
      }

      return new Response(
        JSON.stringify({
          success: true,
          videoId: heygenResult.data.video_id,
          status: "processing",
          dbRecordId: videoData?.id || null,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "get-video-status") {
      if (!text) {
        return new Response(JSON.stringify({ error: "Missing video ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const heygenResponse = await fetch(
        `https://api.heygen.com/v1/video/status?video_id=${text}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": HEYGEN_API_KEY,
          },
        },
      );

      const heygenResult = await heygenResponse.json();

      if (!heygenResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to get video status",
            details: heygenResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      if (heygenResult.data.status === "completed") {
        const { error: updateError } = await supabase
          .from("generated_videos")
          .update({
            status: "completed",
            video_url: heygenResult.data.video_url,
          })
          .eq("video_id", text);

        if (updateError) {
          console.error("Error updating video status:", updateError);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          status: heygenResult.data.status,
          videoUrl: heygenResult.data.video_url || null,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "list-avatars") {
      const heygenResponse = await fetch("https://api.heygen.com/v1/avatar", {
        method: "GET",
        headers: {
          "X-Api-Key": HEYGEN_API_KEY,
        },
      });

      const heygenResult = await heygenResponse.json();

      if (!heygenResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to list avatars",
            details: heygenResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          avatars: heygenResult.data,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "list-voices") {
      const heygenResponse = await fetch("https://api.heygen.com/v1/voice", {
        method: "GET",
        headers: {
          "X-Api-Key": HEYGEN_API_KEY,
        },
      });

      const heygenResult = await heygenResponse.json();

      if (!heygenResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to list voices",
            details: heygenResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          voices: heygenResult.data,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error(`Heygen API error: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
