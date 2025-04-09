
import { useParams, Navigate } from "react-router-dom";
import BotDetailComponent from "@/components/BotDetail";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BotDetailPage() {
  const { botId } = useParams();
  const [isValidBot, setIsValidBot] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Validate the bot ID, in a real app this would check against your API
    const validateBotId = async () => {
      try {
        setIsLoading(true);
        
        // This is a simplified check - in a real app, you would verify 
        // the botId exists in your database
        const valid = botId && botId.length > 0;
        
        if (!valid) {
          toast.error("Invalid advisor ID");
        }
        
        setIsValidBot(valid);
      } catch (error) {
        console.error("Error validating bot ID:", error);
        toast.error("Failed to validate advisor");
        setIsValidBot(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateBotId();
  }, [botId]);

  // Show loading state
  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  // Redirect to bots listing page if invalid ID
  if (isValidBot === false) {
    return <Navigate to="/dashboard/ai-bots" replace />;
  }

  // If valid, render the bot detail component
  return <BotDetailComponent />;
}
