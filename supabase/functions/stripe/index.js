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
import { Stripe } from "https://esm.sh/stripe@12.6.0?target=deno";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    // Get environment variables
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
        return new Response(JSON.stringify({ error: "Missing environment variables" }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    try {
        // Initialize Stripe
        const stripe = new Stripe(STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15",
        });
        // Create Supabase clients - one for auth, one with service role for admin operations
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        // Get the user's JWT from the request
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            throw new Error("Missing Authorization header");
        }
        const token = authHeader.replace("Bearer ", "");
        // Verify the user is authenticated
        const { data: { user }, error: authError, } = yield supabase.auth.getUser(token);
        if (authError || !user) {
            throw new Error("User not authenticated");
        }
        // Parse the request body
        const { action, priceId, metadata = {} } = yield req.json();
        if (action === "create-checkout-session") {
            if (!priceId) {
                throw new Error("Missing priceId parameter");
            }
            // Get the origin for success/cancel URLs
            const origin = req.headers.get("origin") || "http://localhost:8080";
            // Create a checkout session
            const session = yield stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${origin}/payment-canceled`,
                metadata: metadata, // Pass through metadata from client
            });
            // Return the checkout URL
            return new Response(JSON.stringify({ url: session.url }), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        throw new Error(`Unsupported action: ${action}`);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 400,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
