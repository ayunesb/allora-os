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
// Load environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
// Validate required environment variables
if (!SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY ||
    !STRIPE_SECRET_KEY ||
    !STRIPE_WEBHOOK_SECRET) {
    console.error("Missing required environment variables for stripe-webhook function");
}
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
    try {
        // Initialize Stripe
        const stripe = new Stripe(STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15",
        });
        // Initialize Supabase client with service role key
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        // Verify Stripe signature to ensure the webhook is legitimate
        const signature = req.headers.get("stripe-signature");
        if (!signature) {
            console.error("No signature provided in webhook request");
            return new Response(JSON.stringify({ error: "No signature provided" }), {
                status: 400,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Get the raw body for verification
        const body = yield req.text();
        // Validate body is not empty
        if (!body || body.trim() === "") {
            console.error("Empty webhook payload received");
            return new Response(JSON.stringify({ error: "Empty request body" }), {
                status: 400,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Verify the webhook signature
        let event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
        }
        catch (err) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
                status: 400,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        console.log(`Webhook event received: ${event.type}`);
        // Handle checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            console.log(`Payment succeeded: ${session.id}`);
            // Extract metadata from the session
            const metadata = session.metadata || {};
            const tenantId = metadata.tenant_id;
            const credits = parseInt(metadata.credits || "0", 10);
            if (tenantId && credits) {
                // Update user credits by calling the decrement_credits function with a negative value to add credits
                const { error: creditError } = yield supabase.rpc("decrement_credits", {
                    p_tenant_id: tenantId,
                    p_amount: -credits, // Negative value to add credits
                });
                if (creditError) {
                    console.error(`Error updating credits: ${creditError.message}`);
                    return new Response(JSON.stringify({
                        error: `Failed to update credits: ${creditError.message}`,
                    }), {
                        status: 500,
                        headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    });
                }
                // Log the credit purchase
                const { error: logError } = yield supabase.from("credit_logs").insert({
                    tenant_id: tenantId,
                    credits_added: credits,
                    source: "stripe",
                    session_id: session.id,
                    amount: session.amount_total,
                    email: session.customer_email,
                });
                if (logError) {
                    console.error(`Error logging credit purchase: ${logError.message}`);
                    // Continue anyway, since the credits were already added
                }
                console.log(`✅ Added ${credits} credits to tenant ${tenantId}`);
            }
            else {
                console.warn("Missing tenant_id or credits in session metadata");
            }
        }
        return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (err) {
        console.error(`Webhook handler failed: ${err.message}`);
        return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
