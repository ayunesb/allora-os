
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
    const requestBody = await req.json();
    const { action, priceId, subscriptionId, newPriceId, name, email, metadata, successUrl, cancelUrl } = requestBody;

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
        success_url: successUrl || `${APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${APP_URL}/payment-cancel`,
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

    else if (action === "get-subscription-details") {
      // Get the customer ID from the database
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("stripe_customer_id, subscription_status, subscription_plan_id, subscription_expires_at")
        .eq("id", user.id)
        .single();
        
      if (profileError) {
        return new Response(JSON.stringify({ 
          isActive: false,
          error: "Failed to retrieve profile"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      // If no customer ID, return inactive status
      if (!profile.stripe_customer_id) {
        return new Response(JSON.stringify({ isActive: false }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      // Fetch subscriptions from Stripe
      const subscriptions = await stripe.subscriptions.list({
        customer: profile.stripe_customer_id,
        status: 'all',
        expand: ['data.default_payment_method', 'data.items.data.price.product'],
        limit: 1
      });
      
      // If no subscriptions, return inactive
      if (subscriptions.data.length === 0) {
        return new Response(JSON.stringify({ 
          isActive: false,
          planId: profile.subscription_plan_id,
          expiresAt: profile.subscription_expires_at
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      // Process the subscription
      const subscription = subscriptions.data[0];
      const price = subscription.items.data[0].price;
      const product = await stripe.products.retrieve(price.product as string);
      
      return new Response(JSON.stringify({
        isActive: subscription.status === 'active' || subscription.status === 'trialing',
        planId: profile.subscription_plan_id,
        planName: product.name,
        expiresAt: profile.subscription_expires_at,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        status: subscription.status,
        subscriptionId: subscription.id,
        customerId: subscription.customer as string,
        priceId: price.id,
        createdAt: new Date(subscription.created * 1000).toISOString(),
        canceledAt: subscription.canceled_at 
          ? new Date(subscription.canceled_at * 1000).toISOString() 
          : null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    else if (action === "cancel-subscription") {
      if (!subscriptionId) {
        return new Response(JSON.stringify({ error: "Subscription ID is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Verify the subscription belongs to this user
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

      // Get subscription to verify customer
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      if (subscription.customer !== profile.stripe_customer_id) {
        return new Response(JSON.stringify({ error: "Unauthorized access to subscription" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Cancel the subscription at period end
      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
      });

      return new Response(JSON.stringify({ 
        success: true,
        cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
        currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000).toISOString()
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    else if (action === "reactivate-subscription") {
      if (!subscriptionId) {
        return new Response(JSON.stringify({ error: "Subscription ID is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Verify the subscription belongs to this user
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

      // Get subscription to verify customer
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      if (subscription.customer !== profile.stripe_customer_id) {
        return new Response(JSON.stringify({ error: "Unauthorized access to subscription" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Reactivate the subscription (remove cancel_at_period_end)
      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false
      });

      return new Response(JSON.stringify({ 
        success: true,
        cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    else if (action === "change-subscription-plan") {
      if (!subscriptionId || !newPriceId) {
        return new Response(JSON.stringify({ error: "Subscription ID and new price ID are required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Verify the subscription belongs to this user
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

      // Get subscription to verify customer
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      if (subscription.customer !== profile.stripe_customer_id) {
        return new Response(JSON.stringify({ error: "Unauthorized access to subscription" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Find the subscription item to modify
      const subscriptionItem = subscription.items.data[0].id;
      
      // Update the subscription with the new price
      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        items: [{
          id: subscriptionItem,
          price: newPriceId,
        }],
        proration_behavior: 'create_prorations',
      });

      return new Response(JSON.stringify({ 
        success: true,
        subscriptionId: updatedSubscription.id,
        priceId: newPriceId
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
    console.error(`Stripe API error: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
