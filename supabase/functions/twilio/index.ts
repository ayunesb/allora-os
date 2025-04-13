import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { handleIncomingWhatsApp } from "./incoming-handler.ts";

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { method, url } = req;
    const urlObj = new URL(url);
    const path = urlObj.pathname.split("/").pop();
    
    // Handle incoming WhatsApp messages
    if (path === "incoming" && method === "POST") {
      const formData = await req.formData();
      
      // Extract WhatsApp message details
      const from = formData.get("From") as string;
      const body = formData.get("Body") as string;
      const messageSid = formData.get("MessageSid") as string;
      const numMedia = formData.get("NumMedia") as string;
      const mediaContentType = formData.get("MediaContentType0") as string;
      const mediaUrl = formData.get("MediaUrl0") as string;
      
      // Process the message
      const responseMessage = await handleIncomingWhatsApp(
        from,
        body,
        messageSid,
        numMedia,
        mediaContentType,
        mediaUrl
      );
      
      // Return TwiML response
      const twimlResponse = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Message>${responseMessage}</Message>
        </Response>
      `;
      
      return new Response(twimlResponse, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/xml",
        },
      });
    }
    
    // Handle outgoing WhatsApp messages (for manual sending)
    if (path === "send" && method === "POST") {
      const { recipient, message } = await req.json();
      
      if (!recipient || !message) {
        return new Response(
          JSON.stringify({ error: "Recipient and message are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      // Load Twilio API credentials
      const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
      const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
      const fromNumber = Deno.env.get("TWILIO_WHATSAPP_NUMBER") || "whatsapp:+14155238886"; // Default Twilio test number
      
      if (!accountSid || !authToken) {
        return new Response(
          JSON.stringify({ error: "Twilio credentials not configured" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      // Format numbers appropriately
      const toNumber = recipient.startsWith("whatsapp:") 
        ? recipient 
        : `whatsapp:${recipient}`;
      
      // Send the message via Twilio API
      const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      
      const formData = new FormData();
      formData.append("To", toNumber);
      formData.append("From", fromNumber);
      formData.append("Body", message);
      
      const response = await fetch(twilioEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        },
        body: formData,
      });
      
      const result = await response.json();
      
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: response.ok ? 200 : 400,
      });
    }
    
    // Handle status callbacks from Twilio
    if (path === "status" && method === "POST") {
      const formData = await req.formData();
      const messageSid = formData.get("MessageSid") as string;
      const messageStatus = formData.get("MessageStatus") as string;
      
      console.log(`Message ${messageSid} status updated to: ${messageStatus}`);
      
      // Here you would typically update the message status in your database
      // This is a placeholder for that logic
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // If no route matches
    return new Response(
      JSON.stringify({ error: "Not found" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
