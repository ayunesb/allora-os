import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";
import { toast } from "sonner";
import { sanitizeInput } from "@/utils/sanitizers";

export function useCalendlyTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check availability on Calendly
   */
  const checkAvailability = async () => {
    setIsLoading(true);
    setError(null);

    try {
      logger.info("Checking Calendly availability");

      const { data, error } = await supabase.functions.invoke("calendly-tool", {
        body: { action: "check_availability" },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data.result;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to check Calendly availability";
      logger.error("Error checking Calendly availability", err);
      setError(message);
      toast.error("Failed to check availability", { description: message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get a list of meeting types from Calendly
   */
  const getMeetingTypes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      logger.info("Getting Calendly meeting types");

      const { data, error } = await supabase.functions.invoke("calendly-tool", {
        body: { action: "get_meeting_types" },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data.result;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to get Calendly meeting types";
      logger.error("Error getting Calendly meeting types", err);
      setError(message);
      toast.error("Failed to get meeting types", { description: message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkAvailability,
    getMeetingTypes,
    isLoading,
    error,
  };
}
