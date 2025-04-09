
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
import { RecommendationType } from "./useAiRecommendations";
import { RiskAppetiteType } from "./useCompanyDetails";

export function useRecommendationApproval() {
  const { profile } = useAuth();

  const handleApproveRecommendation = async (
    recommendation: RecommendationType,
    index: number,
    riskAppetite: RiskAppetiteType
  ) => {
    try {
      // Save the recommendation to the database
      if (profile?.company_id) {
        // Add to strategies table if it's a strategy recommendation
        if (recommendation.type === "strategy") {
          const { error } = await supabase.from('strategies').insert({
            company_id: profile.company_id,
            title: recommendation.title,
            description: recommendation.description,
            risk_level: riskAppetite
          });
          
          if (error) throw error;
        }
        
        // Add to user_actions table to track this action
        await supabase.rpc('insert_user_action', {
          p_user_id: profile.id,
          p_action: 'approve_recommendation',
          p_category: 'recommendation',
          p_entity_id: `recommendation_${index}`,
          p_entity_type: recommendation.type,
          p_metadata: JSON.stringify({
            title: recommendation.title,
            type: recommendation.type
          }),
          p_timestamp: new Date().toISOString()
        });
      }
      
      toast.success("Recommendation approved and added to your workspace");
      
      return index;
    } catch (error: any) {
      console.error("Error approving recommendation:", error);
      toast.error("Failed to process recommendation");
      return -1;
    }
  };

  return {
    handleApproveRecommendation
  };
}
