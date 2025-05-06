import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";
import { toast } from "sonner";

export function useStripeTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get Stripe analytics via Edge Function
   */
  const getStripeAnalytics = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      logger.info("Querying Stripe analytics", { query });

      const { data, error } = await supabase.functions.invoke(
        "stripe-analytics",
        {
          body: { query },
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      return data.result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to get Stripe analytics";
      logger.error("Error querying Stripe analytics", err);
      setError(message);
      toast.error("Failed to fetch Stripe data", { description: message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getStripeAnalytics,
    isLoading,
    error,
  };
}
