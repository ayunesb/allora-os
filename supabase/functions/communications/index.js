var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const ZOOM_API_KEY = Deno.env.get("ZOOM_API_KEY") || "";
const ZOOM_API_SECRET = Deno.env.get("ZOOM_API_SECRET") || "";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
        return new Response(JSON.stringify({ error: "No authorization header" }), {
            status: 401,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    // Initialize supabase client
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
        // Get the current user from the auth header
        const { data: { user }, error: authError, } = yield supabase.auth.getUser();
        if (authError || !user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Get the request body
        const { action, leadId, meetingData, communicationData } = yield req.json();
        if (action === "create-zoom-meeting") {
            if (!ZOOM_API_KEY || !ZOOM_API_SECRET) {
                return new Response(JSON.stringify({ error: "Zoom API credentials not configured" }), {
                    status: 500,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            // Get Zoom OAuth token
            const tokenResponse = yield fetch("https://zoom.us/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(`${ZOOM_API_KEY}:${ZOOM_API_SECRET}`)}`,
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    scope: "meeting:write",
                }),
            });
            const tokenData = yield tokenResponse.json();
            if (!tokenResponse.ok) {
                return new Response(JSON.stringify({
                    error: "Failed to get Zoom token",
                    details: tokenData,
                }), {
                    status: 500,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            // Create Zoom meeting
            const meetingResponse = yield fetch("https://api.zoom.us/v2/users/me/meetings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
                body: JSON.stringify({
                    topic: meetingData.topic,
                    type: 2, // Scheduled meeting
                    start_time: meetingData.startTime,
                    duration: meetingData.duration,
                    timezone: meetingData.timezone || "UTC",
                    agenda: meetingData.agenda,
                    settings: {
                        host_video: true,
                        participant_video: true,
                        join_before_host: true,
                        mute_upon_entry: false,
                        auto_recording: "cloud",
                        waiting_room: false,
                    },
                }),
            });
            const meeting = yield meetingResponse.json();
            if (!meetingResponse.ok) {
                return new Response(JSON.stringify({
                    error: "Failed to create Zoom meeting",
                    details: meeting,
                }), {
                    status: 500,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            // Save the communication record
            const { data: communication, error: commError } = yield supabase
                .from("communications")
                .insert([
                {
                    lead_id: leadId,
                    type: "zoom",
                    status: "scheduled",
                    scheduled_at: meetingData.startTime,
                    meeting_link: meeting.join_url,
                    notes: meetingData.agenda,
                    created_by: user.id,
                    metadata: {
                        meeting_id: meeting.id,
                        host_url: meeting.start_url,
                        duration: meetingData.duration,
                        password: meeting.password,
                    },
                },
            ])
                .select("*")
                .single();
            if (commError) {
                return new Response(JSON.stringify({
                    error: "Failed to save communication",
                    details: commError,
                }), {
                    status: 500,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            return new Response(JSON.stringify({
                success: true,
                meeting: meeting,
                communication: communication,
            }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        else if (action === "log-communication") {
            // Log a communication (phone call, whatsapp message, etc)
            const { data: communication, error: commError } = yield supabase
                .from("communications")
                .insert([
                {
                    lead_id: leadId,
                    type: communicationData.type,
                    status: communicationData.status,
                    scheduled_at: communicationData.scheduledAt,
                    ended_at: communicationData.endedAt,
                    notes: communicationData.notes,
                    outcome: communicationData.outcome,
                    created_by: user.id,
                    metadata: communicationData.metadata || {},
                },
            ])
                .select("*")
                .single();
            if (commError) {
                return new Response(JSON.stringify({
                    error: "Failed to save communication",
                    details: commError,
                }), {
                    status: 500,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            // If a lead status update is requested
            if (communicationData.updateLeadStatus) {
                const { error: leadError } = yield supabase
                    .from("leads")
                    .update({ status: communicationData.leadStatus })
                    .eq("id", leadId);
                if (leadError) {
                    return new Response(JSON.stringify({
                        warning: "Communication logged but failed to update lead status",
                        communication: communication,
                        error: leadError,
                    }), {
                        headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    });
                }
            }
            return new Response(JSON.stringify({
                success: true,
                communication: communication,
            }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        else if (action === "generate-summary") {
            if (!OPENAI_API_KEY) {
                return new Response(JSON.stringify({ error: "OpenAI API key not configured" }), {
                    status: 500,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            const { communicationId, transcriptText } = yield req.json();
            // Generate summary using OpenAI
            const openaiResponse = yield fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "You are an assistant that generates concise summaries of sales calls. Focus on key points, action items, and next steps. Keep it professional and business-oriented.",
                        },
                        {
                            role: "user",
                            content: `Please summarize this sales call transcript: ${transcriptText}`,
                        },
                    ],
                    max_tokens: 500,
                    temperature: 0.7,
                }),
            });
            const openaiData = yield openaiResponse.json();
            if (!openaiResponse.ok) {
                return new Response(JSON.stringify({
                    error: "Failed to generate summary",
                    details: openaiData,
                }), {
                    status: 500,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            const summary = openaiData.choices[0].message.content;
            // Update the communication record with the AI summary
            const { data: updatedComm, error: updateError } = yield supabase
                .from("communications")
                .update({ ai_summary: summary })
                .eq("id", communicationId)
                .select("*")
                .single();
            if (updateError) {
                return new Response(JSON.stringify({
                    warning: "Summary generated but failed to save to database",
                    summary: summary,
                    error: updateError,
                }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            return new Response(JSON.stringify({
                success: true,
                summary: summary,
                communication: updatedComm,
            }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        else {
            return new Response(JSON.stringify({ error: "Invalid action" }), {
                status: 400,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
    }
    catch (err) {
        console.error(`Communications function error: ${err.message}`);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
