
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Mock recommendation type
export interface AiRecommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  approved: boolean;
  pending: boolean;
}

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pendingApprovals, setPendingApprovals] = useState<number>(0);
  const [aiRecommendations, setAiRecommendations] = useState<AiRecommendation[]>([]);
  const [riskAppetite, setRiskAppetite] = useState<"high" | "medium" | "low">("medium");

  // Simulate data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setAiRecommendations([
          {
            id: "rec-1",
            title: "Expand digital marketing channels",
            description: "Increase investment in social media marketing to capture younger demographics",
            impact: "high",
            effort: "medium",
            approved: false,
            pending: true
          },
          {
            id: "rec-2",
            title: "Implement AI-driven customer support",
            description: "Deploy chatbots for first-line customer support to improve response time",
            impact: "medium",
            effort: "high",
            approved: false,
            pending: true
          },
          {
            id: "rec-3",
            title: "Optimize pricing strategy",
            description: "Adjust pricing tiers based on competitive analysis and customer feedback",
            impact: "high",
            effort: "low",
            approved: false,
            pending: true
          }
        ]);
        
        setPendingApprovals(3);
        setRiskAppetite("medium");
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch dashboard data"));
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Handle recommendation approval
  const handleApproveRecommendation = useCallback(async (index: number) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAiRecommendations(prev => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index] = {
            ...updated[index],
            approved: true,
            pending: false
          };
        }
        return updated;
      });
      
      setPendingApprovals(prev => Math.max(0, prev - 1));
      return true;
    } catch (err) {
      console.error("Error approving recommendation:", err);
      throw err;
    }
  }, []);

  return {
    isLoading,
    error,
    pendingApprovals,
    aiRecommendations,
    riskAppetite,
    handleApproveRecommendation
  };
}
