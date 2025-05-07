var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { handleIncomingWhatsApp } from "./incoming-handler.ts";
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
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
            const formData = yield req.formData();
            // Extract WhatsApp message details
            const from = formData.get("From");
            const body = formData.get("Body");
            const messageSid = formData.get("MessageSid");
            const numMedia = formData.get("NumMedia");
            const mediaContentType = formData.get("MediaContentType0");
            const mediaUrl = formData.get("MediaUrl0");
            // Process the message
            const responseMessage = yield handleIncomingWhatsApp(from, body, messageSid, numMedia, mediaContentType, mediaUrl);
            // Return TwiML response
            const twimlResponse = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Message>${responseMessage}</Message>
        </Response>
      `;
            return new Response(twimlResponse, {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/xml" }),
            });
        }
        // Handle outgoing WhatsApp messages (for manual sending)
        if (path === "send" && method === "POST") {
            const { recipient, message } = yield req.json();
            if (!recipient || !message) {
                return new Response(JSON.stringify({ error: "Recipient and message are required" }), {
                    status: 400,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            // Load Twilio API credentials
            const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
            const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
            const fromNumber = Deno.env.get("TWILIO_WHATSAPP_NUMBER") || "whatsapp:+14155238886"; // Default Twilio test number
            if (!accountSid || !authToken) {
                return new Response(JSON.stringify({ error: "Twilio credentials not configured" }), {
                    status: 500,
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
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
            const response = yield fetch(twilioEndpoint, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
                },
                body: formData,
            });
            const result = yield response.json();
            return new Response(JSON.stringify(result), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                status: response.ok ? 200 : 400,
            });
        }
        // Handle status callbacks from Twilio
        if (path === "status" && method === "POST") {
            const formData = yield req.formData();
            const messageSid = formData.get("MessageSid");
            const messageStatus = formData.get("MessageStatus");
            console.log(`Message ${messageSid} status updated to: ${messageStatus}`);
            // Here you would typically update the message status in your database
            // This is a placeholder for that logic
            return new Response(JSON.stringify({ success: true }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // If no route matches
        return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
