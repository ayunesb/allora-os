import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID") || "";
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN") || "";
const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Special handling for webhook callbacks from Twilio
  if (req.url.includes('/status-callback')) {
    try {
      const formData = await req.formData();
      const messageStatus = formData.get('MessageStatus');
      const messageSid = formData.get('MessageSid');
      const to = formData.get('To');
      const from = formData.get('From');
      
      console.log(`Received status callback: ${messageStatus} for message ${messageSid}`);
      
      // Initialize supabase client with anon key for logging
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      
      // Log the status update to the database
      await supabase.from("message_status_logs").insert({
        message_sid: messageSid,
        status: messageStatus,
        to_number: to,
        from_number: from,
        received_at: new Date().toISOString(),
        channel: formData.get('ChannelPrefix') === 'whatsapp' ? 'whatsapp' : 'sms'
      });
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error processing status callback:", error);
      return new Response(JSON.stringify({ error: "Failed to process callback" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // Get the authorization header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "No authorization header" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
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
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Get the request body
    const { action, to, body, leadId, messageType, callSid, channel } = await req.json();

    if (action === "send-sms") {
      // Validate request
      if (!to || !body) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Format the phone number (ensure it has the + prefix)
      const formattedTo = to.startsWith('+') ? to : `+${to}`;
      
      // Determine if this is a WhatsApp message based on the channel parameter
      const isWhatsApp = channel === 'whatsapp';
      
      // Prepare the 'From' parameter - for WhatsApp, prefix with 'whatsapp:'
      const fromNumber = isWhatsApp 
        ? `whatsapp:${TWILIO_PHONE_NUMBER}` 
        : TWILIO_PHONE_NUMBER;
      
      // Prepare the 'To' parameter - for WhatsApp, prefix with 'whatsapp:'
      const toNumber = isWhatsApp 
        ? `whatsapp:${formattedTo}` 
        : formattedTo;

      // Get the status callback URL - this should be the URL to this same function
      const edgeFunctionUrl = new URL(req.url);
      const statusCallbackUrl = `${edgeFunctionUrl.origin}${edgeFunctionUrl.pathname}/status-callback`;

      // Send SMS using Twilio
      const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
      const twilioAuthString = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

      const formData = new URLSearchParams({
        From: fromNumber,
        To: toNumber,
        Body: body,
        StatusCallback: statusCallbackUrl
      });

      const twilioResponse = await fetch(twilioEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${twilioAuthString}`
        },
        body: formData
      });

      const twilioResult = await twilioResponse.json();

      // If we have a leadId, update the lead with the message info
      if (leadId) {
        const { error: updateError } = await supabase
          .from("lead_communications")
          .insert([{
            lead_id: leadId,
            type: isWhatsApp ? "whatsapp" : "sms",
            content: body,
            sent_at: new Date().toISOString(),
            sent_by: user.id
          }]);
          
        if (updateError) {
          console.error("Error logging communication:", updateError);
        }
      }

      return new Response(JSON.stringify({ 
        success: twilioResponse.ok,
        sid: twilioResult.sid,
        message: twilioResponse.ok ? "Message sent successfully" : "Failed to send message",
        channel: isWhatsApp ? "whatsapp" : "sms"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "send-bulk-sms") {
      // Validate request
      if (!messageType || !body) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Get leads from the database
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .single();
        
      if (profileError || !profile.company_id) {
        return new Response(JSON.stringify({ error: "Company not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      const { data: leads, error: leadsError } = await supabase
        .from("leads")
        .select("id, phone, campaign_id, campaigns(company_id)")
        .eq("campaigns.company_id", profile.company_id)
        .neq("phone", null);
        
      if (leadsError) {
        return new Response(JSON.stringify({ error: "Failed to fetch leads" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Filter leads by message type if needed
      let targetLeads = leads;
      if (messageType !== "all") {
        targetLeads = leads.filter(lead => lead.status === messageType);
      }

      // Send SMS to each lead
      const results = [];
      for (const lead of targetLeads) {
        // Skip if no phone number
        if (!lead.phone) continue;
        
        // Format the phone number
        const formattedTo = lead.phone.startsWith('+') ? lead.phone : `+${lead.phone}`;

        // Send SMS using Twilio
        const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
        const twilioAuthString = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

        try {
          const twilioResponse = await fetch(twilioEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `Basic ${twilioAuthString}`
            },
            body: new URLSearchParams({
              From: TWILIO_PHONE_NUMBER,
              To: formattedTo,
              Body: body
            })
          });

          const twilioResult = await twilioResponse.json();
          
          // Log the communication
          await supabase
            .from("lead_communications")
            .insert([{
              lead_id: lead.id,
              type: "sms",
              content: body,
              sent_at: new Date().toISOString(),
              sent_by: user.id
            }]);
          
          results.push({
            leadId: lead.id,
            success: twilioResponse.ok,
            sid: twilioResult.sid
          });
        } catch (err) {
          console.error(`Error sending SMS to ${lead.id}:`, err);
          results.push({
            leadId: lead.id,
            success: false,
            error: err.message
          });
        }
      }

      return new Response(JSON.stringify({ 
        success: true,
        totalSent: results.filter(r => r.success).length,
        totalFailed: results.filter(r => !r.success).length,
        results
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "make-call") {
      // Validate request
      if (!to) {
        return new Response(JSON.stringify({ error: "Missing required phone number" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Format the phone number (ensure it has the + prefix)
      const formattedTo = to.startsWith('+') ? to : `+${to}`;

      // Make call using Twilio
      const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls.json`;
      const twilioAuthString = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

      const twilioResponse = await fetch(twilioEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${twilioAuthString}`
        },
        body: new URLSearchParams({
          From: TWILIO_PHONE_NUMBER,
          To: formattedTo,
          Url: "https://demo.twilio.com/docs/voice.xml" // A TwiML URL to handle the call (can be customized)
        })
      });

      const twilioResult = await twilioResponse.json();

      // Log the call in the database if needed
      if (leadId) {
        const { error: updateError } = await supabase
          .from("lead_communications")
          .insert([{
            lead_id: leadId,
            type: "call",
            content: "Outbound call",
            sent_at: new Date().toISOString(),
            sent_by: user.id
          }]);
          
        if (updateError) {
          console.error("Error logging call communication:", updateError);
        }
      }

      return new Response(JSON.stringify({ 
        success: twilioResponse.ok,
        callSid: twilioResult.sid,
        message: twilioResponse.ok ? "Call initiated successfully" : "Failed to initiate call" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "get-call-status") {
      // Validate request
      if (!callSid) {
        return new Response(JSON.stringify({ error: "Missing required call SID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Get call status using Twilio
      const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/${callSid}.json`;
      const twilioAuthString = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

      const twilioResponse = await fetch(twilioEndpoint, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${twilioAuthString}`
        }
      });

      const twilioResult = await twilioResponse.json();

      return new Response(JSON.stringify({ 
        success: twilioResponse.ok,
        status: twilioResult.status,
        duration: twilioResult.duration,
        direction: twilioResult.direction,
        from: twilioResult.from,
        to: twilioResult.to,
        message: twilioResponse.ok ? "Call status retrieved successfully" : "Failed to get call status" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  } catch (err) {
    console.error(`Twilio API error: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
