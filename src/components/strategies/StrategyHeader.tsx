
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useBreakpoint } from "@/hooks/use-mobile";

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
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-primary mr-3 flex-shrink-0" />
          <h1 className="text-2xl sm:text-3xl font-bold">AI-Generated Business Strategies</h1>
        </div>
        
        <div className="flex space-x-2 self-end sm:self-auto">
          <Button 
            variant="outline" 
            onClick={onToggleInsights}
            className="hidden md:flex"
            size={isMobile ? "sm" : "default"}
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
                  size={isMobile ? "sm" : "default"}
                >
                  {isAnyActionPending ? (
                    <span className="mr-2 h-4 w-4 animate-spin">⌛</span>
                  ) : (
                    <span className="mr-2 h-4 w-4">+</span>
                  )}
                  {isMobile ? "New" : "New Strategy"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new business strategy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <p className="text-lg sm:text-xl text-gray-300 mb-6">
        Allora AI automatically builds full business plans customized to your needs
      </p>
    </>
  );
};

export default StrategyHeader;
