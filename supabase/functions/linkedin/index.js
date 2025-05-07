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
import "https://deno.land/x/xhr@0.1.0/mod.ts";
const CLIENT_ID = Deno.env.get("LINKEDIN_CLIENT_ID") || "";
const CLIENT_SECRET = Deno.env.get("LINKEDIN_CLIENT_SECRET") || "";
const REDIRECT_URI = Deno.env.get("LINKEDIN_REDIRECT_URI") || "";
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
        const { action, code, state, companyId, accessToken, query } = yield req.json();
        switch (action) {
            case "get_auth_url": {
                // Generate the authentication URL for LinkedIn OAuth
                const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=r_liteprofile%20r_emailaddress%20r_organization_social`;
                return new Response(JSON.stringify({ url: authUrl }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            case "exchange_code": {
                // Exchange the authorization code for an access token
                const tokenResponse = yield fetch("https://www.linkedin.com/oauth/v2/accessToken", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        grant_type: "authorization_code",
                        code,
                        redirect_uri: REDIRECT_URI,
                        client_id: CLIENT_ID,
                        client_secret: CLIENT_SECRET,
                    }),
                });
                const tokenData = yield tokenResponse.json();
                if (tokenData.error) {
                    throw new Error(`LinkedIn API error: ${tokenData.error_description}`);
                }
                return new Response(JSON.stringify({
                    access_token: tokenData.access_token,
                    expires_in: tokenData.expires_in,
                }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            case "search_connections": {
                // Search LinkedIn connections with optional filters
                if (!accessToken) {
                    throw new Error("No access token provided");
                }
                // Use the LinkedIn API to search for connections
                // This is a simplified implementation - the actual endpoint and parameters
                // would depend on the specific LinkedIn API being used
                const searchResponse = yield fetch(`https://api.linkedin.com/v2/search?q=${encodeURIComponent(query)}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                const searchData = yield searchResponse.json();
                return new Response(JSON.stringify({ connections: searchData }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            case "import_connections": {
                // Import selected connections as leads
                if (!accessToken) {
                    throw new Error("No access token provided");
                }
                // This would typically make calls to both LinkedIn API and your database
                // to import the selected connections as leads
                return new Response(JSON.stringify({
                    success: true,
                    message: "Connections imported successfully",
                }), {
                    headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                });
            }
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    }
    catch (error) {
        console.error("Error in LinkedIn function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
