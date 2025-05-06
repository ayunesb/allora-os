import { useState, useEffect } from "react";
import { getExecutiveDecisions } from "@/agents/decisionService";
import { ExecutiveDecision } from "@/types/agents";

export function useDecisions() {
  const [decisions, setDecisions] = useState<ExecutiveDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDecisions() {
      try {
        setLoading(true);
        const decisionsData = await getExecutiveDecisions();
        setDecisions(decisionsData);
        setError(null);
      } catch (err) {
        console.error("Failed to load executive decisions:", err);
        setError("Could not load executive decisions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadDecisions();
  }, []);

  return { decisions, loading, error };
}
