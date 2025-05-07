/// <reference lib="deno.unstable" />
/// <reference types="https://deno.land/std@0.177.0/node/global.d.ts" />

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ZOOM_API_BASE = "https://api.zoom.us/v2";
const ZOOM_ACCOUNTS_BASE = "https://zoom.us/oauth";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") as string;
const ZOOM_CLIENT_ID = Deno.env.get("ZOOM_CLIENT_ID") as string;
const ZOOM_CLIENT_SECRET = Deno.env.get("ZOOM_CLIENT_SECRET") as string;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Create client with auth context if available
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      supabase.auth.setAuth(authHeader.replace("Bearer ", ""));
    }

    // Handle different endpoints
    if (path === "auth-url") {
      return await handleAuthUrl(req);
    } else if (path === "auth-callback") {
      return await handleAuthCallback(req, supabase);
    } else if (path === "create-meeting") {
      return await handleCreateMeeting(req, supabase);
    } else if (path === "refresh-token") {
      return await handleRefreshToken(req, supabase);
    } else if (path === "webhook") {
      return await handleWebhook(req, supabase);
    } else if (path === "disconnect") {
      return await handleDisconnect(req, supabase);
    } else {
      return new Response(JSON.stringify({ error: "Not Found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Zoom function error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function handleAuthUrl(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const redirectUri = searchParams.get("redirectUri");
    const companyId = searchParams.get("companyId");

    if (!redirectUri || !companyId) {
      throw new Error("Missing required parameters: redirectUri or companyId");
    }

    // Generate a random state value for security
    const state = crypto.randomUUID();

    // Construct the authorization URL
    const authUrl = new URL(`${ZOOM_ACCOUNTS_BASE}/authorize`);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("client_id", ZOOM_CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("state", `${state}|${companyId}`);

    // Add scopes required for meeting creation and management
    const scopes = [
      "meeting:write:admin",
      "meeting:read:admin",
      "user:read:admin",
    ];
    authUrl.searchParams.append("scope", scopes.join(" "));

    return new Response(JSON.stringify({ url: authUrl.toString() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error generating auth URL:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function handleAuthCallback(req: Request, supabase: SupabaseClient) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const stateParam = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      throw new Error(`OAuth error: ${error}`);
    }

    if (!code || !stateParam) {
      throw new Error("Missing required parameters: code or state");
    }

    // Extract the company ID from the state parameter
    const [state, companyId] = stateParam.split("|");
    if (!companyId) {
      throw new Error("Invalid state parameter");
    }

    // Exchange code for access token
    const tokenResponse = await fetch(`${ZOOM_ACCOUNTS_BASE}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: searchParams.get("redirectUri") || "",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      throw new Error(`Token exchange failed: ${errorData.error}`);
    }

    const tokenData = await tokenResponse.json();

    // Calculate token expiration time
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);

    // Store the tokens in Supabase
    const { error: upsertError } = await supabase
      .from("company_zoom_integrations")
      .upsert({
        company_id: companyId,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        token_expires_at: expiresAt.toISOString(),
        is_connected: true,
        updated_at: new Date().toISOString(),
        scope: tokenData.scope,
      });

    if (upsertError) {
      throw new Error(
        `Failed to store Zoom integration: ${upsertError.message}`,
      );
    }

    return new Response(JSON.stringify({ success: true, companyId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error handling auth callback:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function handleRefreshToken(req: Request, supabase: SupabaseClient) {
  try {
    const { companyId } = await req.json();

    if (!companyId) {
      throw new Error("Missing required parameter: companyId");
    }

    // Get the existing tokens
    const { data: integration, error: fetchError } = await supabase
      .from("company_zoom_integrations")
      .select("*")
      .eq("company_id", companyId)
      .single();

    if (fetchError || !integration) {
      throw new Error("Zoom integration not found for this company");
    }

    // Check if the token needs refreshing
    const tokenExpiresAt = new Date(integration.token_expires_at);
    const now = new Date();

    // If token is still valid, return success
    if (tokenExpiresAt > now) {
      return new Response(
        JSON.stringify({ success: true, needsRefresh: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Request a new access token using the refresh token
    const refreshResponse = await fetch(`${ZOOM_ACCOUNTS_BASE}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: integration.refresh_token,
      }),
    });

    if (!refreshResponse.ok) {
      const errorData = await refreshResponse.json();

      // If refresh token is invalid, mark the integration as disconnected
      if (errorData.error === "invalid_grant") {
        await supabase
          .from("company_zoom_integrations")
          .update({ is_connected: false, updated_at: new Date().toISOString() })
          .eq("company_id", companyId);
      }

      throw new Error(`Token refresh failed: ${errorData.error}`);
    }

    const tokenData = await refreshResponse.json();

    // Calculate new token expiration time
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);

    // Update the tokens in Supabase
    const { error: updateError } = await supabase
      .from("company_zoom_integrations")
      .update({
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        token_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("company_id", companyId);

    if (updateError) {
      throw new Error(`Failed to update Zoom tokens: ${updateError.message}`);
    }

    return new Response(JSON.stringify({ success: true, needsRefresh: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error refreshing token:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function handleCreateMeeting(req: Request, supabase: SupabaseClient) {
  try {
    const { companyId, topic, agenda, startTime, duration, password } =
      await req.json();

    if (!companyId || !topic || !startTime) {
      throw new Error("Missing required parameters");
    }

    // Get the access token for the company
    const { data: integration, error: fetchError } = await supabase
      .from("company_zoom_integrations")
      .select("*")
      .eq("company_id", companyId)
      .eq("is_connected", true)
      .single();

    if (fetchError || !integration) {
      throw new Error("Zoom integration not found or not connected");
    }

    // Check if token is expired and refresh if needed
    const tokenExpiresAt = new Date(integration.token_expires_at);
    const now = new Date();

    let accessToken = integration.access_token;

    if (tokenExpiresAt <= now) {
      // Token is expired, refresh it
      const refreshResponse = await fetch(`${ZOOM_ACCOUNTS_BASE}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: integration.refresh_token,
        }),
      });

      if (!refreshResponse.ok) {
        const errorData = await refreshResponse.json();
        throw new Error(`Token refresh failed: ${errorData.error}`);
      }

      const tokenData = await refreshResponse.json();
      accessToken = tokenData.access_token;

      // Update tokens in database
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);

      await supabase
        .from("company_zoom_integrations")
        .update({
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          token_expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("company_id", companyId);
    }

    // Create the meeting
    const meetingResponse = await fetch(`${ZOOM_API_BASE}/users/me/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration: duration || 60,
        timezone: "UTC",
        agenda: agenda || "",
        password: password || "",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: false,
          waiting_room: false,
          auto_recording: "none",
        },
      }),
    });

    if (!meetingResponse.ok) {
      const errorData = await meetingResponse.json();
      throw new Error(`Failed to create Zoom meeting: ${errorData.message}`);
    }

    const meetingData = await meetingResponse.json();

    // Store the meeting in Supabase
    const { error: insertError } = await supabase
      .from("company_zoom_meetings")
      .insert({
        company_id: companyId,
        zoom_meeting_id: meetingData.id.toString(),
        topic: meetingData.topic,
        agenda: meetingData.agenda,
        start_time: meetingData.start_time,
        duration: meetingData.duration,
        join_url: meetingData.join_url,
        password: meetingData.password,
      });

    if (insertError) {
      throw new Error(`Failed to store meeting: ${insertError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        meeting: {
          id: meetingData.id,
          topic: meetingData.topic,
          start_time: meetingData.start_time,
          join_url: meetingData.join_url,
          password: meetingData.password,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating meeting:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function handleWebhook(req: Request, supabase: SupabaseClient) {
  try {
    const payload = await req.json();
    console.log("Zoom webhook received:", JSON.stringify(payload));

    // Handle different event types
    if (payload.event === "meeting.updated") {
      await handleMeetingUpdated(payload, supabase);
    } else if (payload.event === "meeting.deleted") {
      await handleMeetingDeleted(payload, supabase);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error handling webhook:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function handleMeetingUpdated(payload: any, supabase: SupabaseClient) {
  try {
    const meetingId = payload.payload.object.id.toString();

    // Find the meeting in our database
    const { data: meeting } = await supabase
      .from("company_zoom_meetings")
      .select("*")
      .eq("zoom_meeting_id", meetingId)
      .single();

    if (!meeting) {
      console.log(`Meeting ${meetingId} not found in database`);
      return;
    }

    // Update meeting details
    await supabase
      .from("company_zoom_meetings")
      .update({
        topic: payload.payload.object.topic,
        start_time: payload.payload.object.start_time,
        duration: payload.payload.object.duration,
        updated_at: new Date().toISOString(),
      })
      .eq("zoom_meeting_id", meetingId);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(message);
  }
}

async function handleMeetingDeleted(payload: any, supabase: SupabaseClient) {
  const meetingId = payload.payload.object.id.toString();

  // Delete the meeting from our database
  await supabase
    .from("company_zoom_meetings")
    .delete()
    .eq("zoom_meeting_id", meetingId);
}

async function handleDisconnect(req: Request, supabase: SupabaseClient) {
  try {
    const { companyId } = await req.json();

    if (!companyId) {
      throw new Error("Missing required parameter: companyId");
    }

    // Get the access token to revoke
    const { data: integration, error: fetchError } = await supabase
      .from("company_zoom_integrations")
      .select("access_token")
      .eq("company_id", companyId)
      .single();

    if (!fetchError && integration) {
      // Revoke the token
      try {
        await fetch(`${ZOOM_ACCOUNTS_BASE}/revoke`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`)}`,
          },
          body: new URLSearchParams({
            token: integration.access_token,
          }),
        });
      } catch (revokeError) {
        console.error("Error revoking token:", revokeError);
      }
    }

    // Delete the integration record
    const { error: deleteError } = await supabase
      .from("company_zoom_integrations")
      .delete()
      .eq("company_id", companyId);

    if (deleteError) {
      throw new Error(`Failed to disconnect Zoom: ${deleteError.message}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error disconnecting Zoom:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
