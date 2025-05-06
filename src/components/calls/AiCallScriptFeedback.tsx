import { useState } from "react";
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallScriptTracking } from "@/hooks/useCallScriptTracking";
export default function AiCallScriptFeedback({ id, title, type, primaryBot }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackScriptFeedback } = useCallScriptTracking();
  const handleFeedback = async (isPositive) => {
    setIsSubmitting(true);
    try {
      await trackScriptFeedback(id, title, type, isPositive, primaryBot);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-end space-x-2 mt-2">
      <span className="text-xs text-muted-foreground mr-1">Helpful?</span>
      <Button
        variant="outline"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => handleFeedback(true)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <ThumbsUp className="h-3 w-3" />
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => handleFeedback(false)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <ThumbsDown className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}
