import { DynamicTool } from "langchain/tools";
import { Client } from "@notionhq/client";

let stripe: any | null = null;

/**
 * Initialize the Stripe client with API key
 */
export function initStripeClient(apiKey: string): void {
  if (!apiKey) {
    console.error("Stripe API key is required");
    return;
  }

  // Dynamically import Stripe to avoid bundling it in the client
  import("stripe")
    .then(({ default: Stripe }) => {
      stripe = new Stripe(apiKey, {
        apiVersion: "2025-04-30.basil", // Using a stable API version
      });
    })
    .catch((err) => {
      console.error("Failed to initialize Stripe client", err);
    });
}

/**
 * Create a Stripe tool for LangChain that can analyze payment data
 */
export function createStripeTool() {
  return new DynamicTool({
    name: "StripeAnalytics",
    description:
      "Use this to retrieve payment info, revenue totals, or subscription status from Stripe.",
    func: async (input: string) => {
      try {
        if (!stripe) {
          return "Stripe client not initialized. Please set STRIPE_SECRET_KEY first.";
        }

        const normalized = input.toLowerCase();

        // Total revenue in the past 30 days
        if (normalized.includes("total revenue")) {
          const now = Math.floor(Date.now() / 1000);
          const thirtyDaysAgo = now - 30 * 24 * 60 * 60;

          const charges = await stripe.charges.list({
            limit: 100,
            created: { gte: thirtyDaysAgo },
          });

          const total = charges.data.reduce((sum: number, charge: any) => {
            return charge.paid && !charge.refunded ? sum + charge.amount : sum;
          }, 0);

          return `Total revenue in last 30 days: $${(total / 100).toFixed(2)}`;
        }

        // List active subscriptions
        if (normalized.includes("active subscriptions")) {
          const subs = await stripe.subscriptions.list({
            status: "active",
            limit: 10,
          });
          if (subs.data.length === 0) {
            return "No active subscriptions found.";
          }

          const names = subs.data
            .map(
              (sub: any) =>
                `• ${sub.customer} (${sub.items.data[0].price.nickname || "Default Plan"})`,
            )
            .join("\n");

          return `Active subscriptions:\n${names}`;
        }

        // Check for refunds in the past week
        if (normalized.includes("refunds")) {
          const now = Math.floor(Date.now() / 1000);
          const oneWeekAgo = now - 7 * 24 * 60 * 60;

          const refunds = await stripe.refunds.list({
            limit: 20,
            created: { gte: oneWeekAgo },
          });

          if (refunds.data.length === 0) {
            return "No refunds in the past week.";
          }

          const total = refunds.data.reduce(
            (sum: number, refund: any) => sum + refund.amount,
            0,
          );

          return `Refunds in the past week: ${refunds.data.length} totaling $${(total / 100).toFixed(2)}`;
        }

        // Default fallback
        return 'Specify what you want from Stripe (e.g., "total revenue", "active subscriptions", "refunds this week").';
      } catch (err) {
        console.error("StripeAnalytics tool error:", err);
        return `Failed to retrieve data from Stripe: ${err instanceof Error ? err.message : String(err)}`;
      }
    },
  });
}
