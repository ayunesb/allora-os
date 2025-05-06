import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import {
  getSecret,
  validateRequiredSecrets,
} from "../_shared/secretManager.ts";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = getSecret("SUPABASE_ANON_KEY", true);
const POSTMARK_API_TOKEN = getSecret("POSTMARK_API_TOKEN", true);
const POSTMARK_FROM_EMAIL =
  getSecret("POSTMARK_FROM_EMAIL", true) || "no-reply@alloraai.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Validate required secrets first
  const { valid, missingKeys } = validateRequiredSecrets([
    "SUPABASE_ANON_KEY",
    "POSTMARK_API_TOKEN",
  ]);

  if (!valid) {
    console.error("Missing required secrets:", missingKeys);
    return new Response(
      JSON.stringify({
        error: "Configuration error",
        message: "Missing required secrets. Please contact the administrator.",
        dev_info: missingKeys, // Only include in development
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get the authorization header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "No authorization header" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
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
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: authError }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Log debug info
    console.log("POSTMARK API token exists:", !!POSTMARK_API_TOKEN);
    console.log("POSTMARK from email:", POSTMARK_FROM_EMAIL);

    // Get the request body
    const {
      action,
      to,
      subject,
      htmlBody,
      textBody,
      templateId,
      templateModel,
      leadId,
      messageType,
      campaignId,
    } = await req.json();

    if (action === "send-email") {
      // Validate request
      if (!to || !subject || (!htmlBody && !textBody && !templateId)) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Log information for debugging
      console.log(`Sending email to: ${to}, subject: ${subject}`);

      // Prepare email data
      const emailData = {
        From: POSTMARK_FROM_EMAIL,
        To: to,
        Subject: subject,
        HtmlBody: htmlBody,
        TextBody: textBody,
        MessageStream: "outbound",
      };

      // If using a template
      if (templateId) {
        const templateData = {
          TemplateId: templateId,
          TemplateModel: templateModel || {},
          From: POSTMARK_FROM_EMAIL,
          To: to,
          MessageStream: "outbound",
        };

        console.log("Using template:", templateId);

        // Send email using Postmark Template API
        const postmarkResponse = await fetch(
          "https://api.postmarkapp.com/email/withTemplate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
            },
            body: JSON.stringify(templateData),
          },
        );

        console.log(
          "Postmark template API response status:",
          postmarkResponse.status,
        );
        const postmarkResult = await postmarkResponse.json();
        console.log("Postmark template API response:", postmarkResult);

        // If we have a leadId, update the lead with the message info
        if (leadId) {
          const { error: updateError } = await supabase
            .from("lead_communications")
            .insert([
              {
                lead_id: leadId,
                type: "email",
                content: `Template: ${templateId}`,
                sent_at: new Date().toISOString(),
                sent_by: user.id,
              },
            ]);

          if (updateError) {
            console.error("Error logging email communication:", updateError);
          }
        }

        return new Response(
          JSON.stringify({
            success: postmarkResponse.ok,
            messageId: postmarkResult.MessageID,
            message: postmarkResponse.ok
              ? "Email sent successfully"
              : "Failed to send email",
            details: postmarkResult,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      } else {
        console.log("Using direct email API");

        // Send email using Postmark Email API
        const postmarkResponse = await fetch(
          "https://api.postmarkapp.com/email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
            },
            body: JSON.stringify(emailData),
          },
        );

        console.log("Postmark API response status:", postmarkResponse.status);
        const postmarkResult = await postmarkResponse.json();
        console.log("Postmark API response:", postmarkResult);

        // If we have a leadId, update the lead with the message info
        if (leadId) {
          const { error: updateError } = await supabase
            .from("lead_communications")
            .insert([
              {
                lead_id: leadId,
                type: "email",
                content: htmlBody || textBody,
                sent_at: new Date().toISOString(),
                sent_by: user.id,
              },
            ]);

          if (updateError) {
            console.error("Error logging email communication:", updateError);
          }
        }

        return new Response(
          JSON.stringify({
            success: postmarkResponse.ok,
            messageId: postmarkResult.MessageID,
            message: postmarkResponse.ok
              ? "Email sent successfully"
              : "Failed to send email",
            details: postmarkResult,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
    } else if (action === "send-campaign") {
      // Validate request
      if (!campaignId || (!subject && !templateId)) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Get the campaign details
      const { data: campaign, error: campaignError } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", campaignId)
        .single();

      if (campaignError) {
        return new Response(JSON.stringify({ error: "Campaign not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get leads from the campaign
      const { data: leads, error: leadsError } = await supabase
        .from("leads")
        .select("id, email, name")
        .eq("campaign_id", campaignId)
        .neq("email", null);

      if (leadsError) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch leads" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Filter leads by message type if needed
      let targetLeads = leads;
      if (messageType && messageType !== "all") {
        targetLeads = leads.filter((lead) => lead.status === messageType);
      }

      // Send email to each lead
      const results = [];
      for (const lead of targetLeads) {
        // Skip if no email
        if (!lead.email) continue;

        try {
          let postmarkResponse;
          let postmarkResult;

          // If using a template
          if (templateId) {
            const templateData = {
              TemplateId: templateId,
              TemplateModel: {
                ...templateModel,
                name: lead.name,
                lead_id: lead.id,
                campaign_name: campaign.name,
              },
              From: POSTMARK_FROM_EMAIL,
              To: lead.email,
              MessageStream: "outbound",
            };

            postmarkResponse = await fetch(
              "https://api.postmarkapp.com/email/withTemplate",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
                },
                body: JSON.stringify(templateData),
              },
            );
          } else {
            // Standard email
            const emailData = {
              From: POSTMARK_FROM_EMAIL,
              To: lead.email,
              Subject: subject,
              HtmlBody: htmlBody?.replace("{{name}}", lead.name) || undefined,
              TextBody: textBody?.replace("{{name}}", lead.name) || undefined,
              MessageStream: "outbound",
            };

            postmarkResponse = await fetch(
              "https://api.postmarkapp.com/email",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
                },
                body: JSON.stringify(emailData),
              },
            );
          }

          postmarkResult = await postmarkResponse.json();

          // Log the communication
          await supabase.from("lead_communications").insert([
            {
              lead_id: lead.id,
              type: "email",
              content: templateId
                ? `Template: ${templateId}`
                : htmlBody || textBody,
              sent_at: new Date().toISOString(),
              sent_by: user.id,
            },
          ]);

          results.push({
            leadId: lead.id,
            success: postmarkResponse.ok,
            messageId: postmarkResult.MessageID,
          });
        } catch (err) {
          console.error(`Error sending email to ${lead.id}:`, err);
          results.push({
            leadId: lead.id,
            success: false,
            error: err.message,
          });
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          totalSent: results.filter((r) => r.success).length,
          totalFailed: results.filter((r) => !r.success).length,
          results,
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
    console.error(`Postmark API error: ${err.message}`);
    return new Response(
      JSON.stringify({
        error: err.message,
        stack: isDevelopment ? err.stack : undefined,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
