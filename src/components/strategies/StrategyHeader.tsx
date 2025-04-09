
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface StrategyHeaderProps {
  onNewStrategy: () => void;
  onToggleInsights: () => void;
  showInsights: boolean;
  isAnyActionPending: boolean;
}

const StrategyHeader: React.FC<StrategyHeaderProps> = ({
  onNewStrategy,
  onToggleInsights,
  showInsights,
  isAnyActionPending,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">AI-Generated Business Strategies</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={onToggleInsights}
            className="hidden md:flex"
          >
            {showInsights ? "Hide Insights" : "Show Insights"}
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onNewStrategy} 
                  className="allora-button"
                  disabled={isAnyActionPending}
                >
                  {isAnyActionPending ? (
                    <span className="mr-2 h-4 w-4 animate-spin">⌛</span>
                  ) : (
                    <span className="mr-2 h-4 w-4">+</span>
                  )}
                  New Strategy
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new business strategy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <p className="text-xl text-gray-300 mb-6">
        Allora AI automatically builds full business plans customized to your needs
      </p>
    </>
  );
};

export default StrategyHeader;
