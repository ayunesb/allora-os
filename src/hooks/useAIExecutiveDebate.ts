import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Executive {
  name: string;
  role: string;
  avatar?: string;
}

interface DebateResult {
  topic: string;
  content: string;
  executives: Executive[];
}

export function useAIExecutiveDebate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [debate, setDebate] = useState<DebateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateDebate = async (
    topic: string,
    companyContext: string,
    selectedExecutives: Executive[],
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make sure we have at least 2 executives
      if (selectedExecutives.length < 2) {
        throw new Error("Please select at least 2 executives for the debate");
      }

      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke(
        "ai-executive-debate",
        {
          body: {
            topic,
            companyContext,
            executives: selectedExecutives,
          },
        },
      );

      if (error) {
        throw new Error(`Function error: ${error.message}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setDebate(data.debate);
      toast.success("AI executive debate generated successfully");
      return data.debate;
    } catch (err: any) {
      console.error("Error generating AI executive debate:", err);
      const errorMessage = err.message || "Failed to generate debate";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateDebate,
    isLoading,
    debate,
    error,
  };
}
