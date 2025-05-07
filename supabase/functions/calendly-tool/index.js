var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Supabase Edge Function for Calendly API
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
// CORS headers for the response
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Get the request body
        const { action } = yield req.json();
        console.log(`Received Calendly action: ${action}`);
        // Get the Calendly API key from environment
        const calendlyApiKey = Deno.env.get("CALENDLY_API_KEY");
        const calendlyUserUri = Deno.env.get("CALENDLY_USER_URI");
        if (!calendlyApiKey || !calendlyUserUri) {
            throw new Error("Calendly API configuration missing. Please set CALENDLY_API_KEY and CALENDLY_USER_URI.");
        }
        let result;
        // Perform the appropriate action
        if (action === "check_availability") {
            // Get available scheduling links
            const response = yield fetch(`https://api.calendly.com/scheduling_links`, {
                headers: {
                    Authorization: `Bearer ${calendlyApiKey}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Calendly API error: ${response.statusText}`);
            }
            const data = yield response.json();
            result = data.collection.map((link) => ({
                name: link.name,
                url: link.booking_url,
            }));
        }
        else if (action === "get_meeting_types") {
            // Get available event types
            const response = yield fetch(`${calendlyUserUri}/event_types`, {
                headers: {
                    Authorization: `Bearer ${calendlyApiKey}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Calendly API error: ${response.statusText}`);
            }
            const data = yield response.json();
            result = data.collection.map((event) => ({
                name: event.name,
                duration: event.duration,
                url: event.scheduling_url,
            }));
        }
        else {
            throw new Error("Invalid action. Must be 'check_availability' or 'get_meeting_types'");
        }
        console.log("Calendly request completed successfully");
        return new Response(JSON.stringify({ result }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in calendly-tool function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
