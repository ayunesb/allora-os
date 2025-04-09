
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
  console.error("Missing required environment variables for stripe-webhook function");
}

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

  try {
    // Initialize supabase client with service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Handle Stripe webhooks
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("No signature provided in webhook request");
      return new Response("No signature", { 
        status: 400,
        headers: corsHeaders
      });
    }

    // Get the raw body for verification
    const body = await req.text();

    // Import Stripe library
    const { Stripe } = await import("https://esm.sh/stripe@12.6.0?target=deno");
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });

    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { 
        status: 400,
        headers: corsHeaders
      });
    }

    // Handle specific events
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Payment succeeded:", session.id);
        
        // Handle successful payment
        if (session.customer_details && session.metadata?.userId) {
          const userId = session.metadata.userId;
          const customerEmail = session.customer_details.email;
          
          // Update the database with payment information
          const { error } = await supabase
            .from("profiles")
            .update({ 
              stripe_customer_id: session.customer,
              subscription_status: "active"
            })
            .eq("id", userId);
            
          if (error) {
            console.error("Error updating user subscription:", error);
            return new Response(JSON.stringify({ success: false, error: error.message }), { 
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }
        }
        break;
        
      case "customer.subscription.updated":
        const subscription = event.data.object;
        console.log("Subscription updated:", subscription.id);
        
        // Update subscription status in the database
        if (subscription.metadata?.userId) {
          const { error } = await supabase
            .from("profiles")
            .update({ 
              subscription_status: subscription.status
            })
            .eq("id", subscription.metadata.userId);
            
          if (error) {
            console.error("Error updating subscription status:", error);
          }
        }
        break;
        
      case "customer.subscription.deleted":
        const canceledSubscription = event.data.object;
        console.log("Subscription canceled:", canceledSubscription.id);
        
        // Update subscription status in the database
        if (canceledSubscription.metadata?.userId) {
          const { error } = await supabase
            .from("profiles")
            .update({ 
              subscription_status: "canceled"
            })
            .eq("id", canceledSubscription.metadata.userId);
            
          if (error) {
            console.error("Error updating subscription status:", error);
          }
        }
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error(`Webhook handler failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, {
      status: 500,
      headers: corsHeaders
    });
  }
});
