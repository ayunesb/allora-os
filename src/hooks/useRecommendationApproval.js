import { useState } from "react";
import { toast } from "sonner";
import { useSelfLearning } from "./useSelfLearning";
import { useAuth } from "@/context/AuthContext";
export function useRecommendationApproval() {
    const [isApproving, setIsApproving] = useState(false);
    const { trackAction } = useSelfLearning();
    const { user } = useAuth();
    const handleApproveRecommendation = async (recommendation, index, riskAppetite) => {
        setIsApproving(true);
        try {
            // In a real app, this would call an API to process the approval
            console.log(`Approving recommendation: ${recommendation.title}`);
            // Simulate an API call
            await new Promise(resolve => setTimeout(resolve, 800));
            // Track the approval action for learning
            if (user?.id) {
                trackAction('approve_recommendation', 'recommendation_approval', recommendation.title, recommendation.type, {
                    recommendationType: recommendation.type,
                    executiveBot: recommendation.executiveBot.name,
                    riskAppetite: riskAppetite,
                    expectedImpact: recommendation.expectedImpact
                });
            }
            toast.success(`Recommendation approved: "${recommendation.title}"`, {
                description: `This will be added to your ${recommendation.type === 'strategy' ? 'strategies' : recommendation.type === 'campaign' ? 'campaigns' : 'calls'}.`
            });
            setIsApproving(false);
            return index; // Return the index for removal
        }
        catch (error) {
            console.error('Error approving recommendation:', error);
            toast.error('Failed to approve recommendation');
            setIsApproving(false);
            return -1; // Return -1 to indicate failure
        }
    };
    return {
        handleApproveRecommendation,
        isApproving
    };
}
