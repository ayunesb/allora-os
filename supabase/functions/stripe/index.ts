import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const APP_URL = Deno.env.get("APP_URL") || "http://localhost:5173";

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

  // Import Stripe library
  const { Stripe } = await import("https://esm.sh/stripe@12.6.0?target=deno");
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
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
    const { action, priceId, name, email, metadata, customerId } = await req.json();

    if (action === "create-checkout-session") {
      // Create a new Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_URL}/payment-cancel`,
        customer_email: user.email,
        metadata: {
          userId: user.id,
        },
      });

      return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    } 
    
    else if (action === "create-customer") {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        name,
        email,
        metadata: {
          userId: user.id,
          ...metadata
        }
      });

      return new Response(JSON.stringify({ 
        success: true,
        customerId: customer.id 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "create-customer-portal") {
      // Get the customer ID from the database
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();
        
      if (profileError || !profile.stripe_customer_id) {
        return new Response(JSON.stringify({ error: "Customer not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      // Create a billing portal session
      const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: `${APP_URL}/account`,
      });
      
      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "get-products") {
      // Retrieve products and prices
      const products = await stripe.products.list({
        active: true,
        expand: ["data.default_price"],
      });
      
      return new Response(JSON.stringify(products.data), {
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
    console.error(`Stripe API error: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
