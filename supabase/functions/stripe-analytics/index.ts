import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import Stripe from "npm:stripe";

// CORS headers for the response
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const stripeApiKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeApiKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable not set");
    }

    // Initialize Stripe client
    const stripe = new Stripe(stripeApiKey, {
      apiVersion: "2023-10-16",
    });

    // Get the request body
    const { query } = await req.json();

    if (!query) {
      throw new Error("Query is required");
    }

    const normalized = query.toLowerCase();
    let result = "";

    // Total revenue in the past 30 days
    if (normalized.includes("total revenue")) {
      const now = Math.floor(Date.now() / 1000);
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60;

      const charges = await stripe.charges.list({
        limit: 100,
        created: { gte: thirtyDaysAgo },
      });

      const total = charges.data.reduce((sum, charge) => {
        return charge.paid && !charge.refunded ? sum + charge.amount : sum;
      }, 0);

      result = `Total revenue in last 30 days: $${(total / 100).toFixed(2)}`;
    }
    // List active subscriptions
    else if (normalized.includes("active subscriptions")) {
      const subs = await stripe.subscriptions.list({
        status: "active",
        limit: 10,
      });

      if (subs.data.length === 0) {
        result = "No active subscriptions found.";
      } else {
        const names = subs.data
          .map(
            (sub) =>
              `• ${sub.customer} (${sub.items.data[0].price.nickname || "Default Plan"})`,
          )
          .join("\n");

        result = `Active subscriptions:\n${names}`;
      }
    }
    // Check for refunds in the past week
    else if (normalized.includes("refunds")) {
      const now = Math.floor(Date.now() / 1000);
      const oneWeekAgo = now - 7 * 24 * 60 * 60;

      const refunds = await stripe.refunds.list({
        limit: 20,
        created: { gte: oneWeekAgo },
      });

      if (refunds.data.length === 0) {
        result = "No refunds in the past week.";
      } else {
        const total = refunds.data.reduce(
          (sum, refund) => sum + refund.amount,
          0,
        );

        result = `Refunds in the past week: ${refunds.data.length} totaling $${(total / 100).toFixed(2)}`;
      }
    }
    // Default fallback
    else {
      result =
        'Specify what you want from Stripe (e.g., "total revenue", "active subscriptions", "refunds this week").';
    }

    console.log("Successfully generated Stripe analytics");

    return new Response(
      JSON.stringify({
        success: true,
        result,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error in stripe-analytics function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
