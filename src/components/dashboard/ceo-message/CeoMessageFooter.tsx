
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useCeoFeedback } from "@/hooks/useCeoFeedback";

export function CeoMessageFooter() {
  const { provideFeedback, isSubmitting } = useCeoFeedback();
  
  const handleFeedback = (isPositive: boolean) => {
    provideFeedback(isPositive);
  };
  
  return (
    <div className="px-6 py-4 border-t flex justify-between items-center">
      <span className="text-sm text-muted-foreground">
        Was this message helpful?
      </span>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleFeedback(true)} 
          disabled={isSubmitting}
          className="text-green-500 hover:text-green-600 hover:bg-green-100/10"
        >
          <ThumbsUp className="mr-1 h-4 w-4" />
          Yes
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleFeedback(false)} 
          disabled={isSubmitting}
          className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
        >
          <ThumbsDown className="mr-1 h-4 w-4" />
          No
        </Button>
      </div>
    </div>
  );
}
