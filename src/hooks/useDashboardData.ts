
import { useState, useEffect } from "react";
import { supabase } from "@/backend/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function useDashboardData() {
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState(3);
  const [aiRecommendations, setAiRecommendations] = useState<{ title: string; description: string; type: string }[]>([]);
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Fetch company details and generate recommendations on component mount
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!profile?.company_id) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('details')
          .eq('id', profile.company_id)
          .single();
          
        if (error) throw error;
        
        // Extract company details and ensure it's an object
        const companyDetails = data?.details as Record<string, any> || {};
        
        // Now we can safely check if riskAppetite exists and set it
        if (companyDetails.riskAppetite && 
            ['low', 'medium', 'high'].includes(companyDetails.riskAppetite)) {
          setRiskAppetite(companyDetails.riskAppetite as 'low' | 'medium' | 'high');
        }

        // Generate AI recommendations based on company details
        generateAiRecommendations(companyDetails);
      } catch (error) {
        console.error("Error fetching company details:", error);
        toast.error("Failed to load company information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyDetails();
  }, [profile]);
  
  // Generate AI recommendations based on company profile
  const generateAiRecommendations = (companyDetails: Record<string, any>) => {
    // In a real app, this would call an AI service
    // For now, we'll generate some example recommendations
    const industry = profile?.industry || "Technology";
    const companySize = companyDetails.companySize || "Small";
    const recommendations = [
      {
        title: `${industry} Market Expansion`,
        description: `Based on your ${riskAppetite} risk profile, I recommend exploring new ${industry.toLowerCase()} market segments with a phased approach.`,
        type: "strategy"
      },
      {
        title: "Targeted LinkedIn Campaign",
        description: `I've drafted a ${companySize.toLowerCase()}-business optimized campaign targeting decision-makers in your industry.`,
        type: "campaign"
      },
      {
        title: "Cold Call Script Update",
        description: "I've analyzed your most successful calls and prepared an enhanced script that emphasizes your unique value proposition.",
        type: "call"
      },
      {
        title: "Executive Team Meeting",
        description: "Schedule a strategy session with your AI executive team to align on Q3 objectives.",
        type: "meeting"
      }
    ];
    
    setAiRecommendations(recommendations);
  };

  const handleApproveRecommendation = (index: number) => {
    toast.success("Recommendation approved and added to your workspace");
    
    // Remove the approved recommendation
    setAiRecommendations(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    
    // Decrease pending approvals
    setPendingApprovals(prev => Math.max(0, prev - 1));
  };

  return {
    isLoading,
    pendingApprovals,
    aiRecommendations,
    riskAppetite,
    handleApproveRecommendation
  };
}
