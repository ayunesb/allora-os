import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";
import { toast } from "sonner";

export function useNotionTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Save content to Notion via Edge Function
   */
  const saveToNotion = async (title: string, content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      logger.info("Saving to Notion", { title });

      const { data, error } = await supabase.functions.invoke("notion-tool", {
        body: { title, content },
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Saved to Notion successfully");
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save to Notion";
      logger.error("Error saving to Notion", err);
      setError(message);
      toast.error("Failed to save to Notion", { description: message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveToNotion,
    isLoading,
    error,
  };
}
