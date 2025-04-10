
import React from "react";
import { Strategy } from "@/models/strategy";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useBreakpoint } from "@/hooks/use-mobile";

interface StrategyCardProps {
  strategy: Strategy;
  onEdit: (strategyId: string) => void;
  onDelete: (strategyId: string) => void;
  onView?: () => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onEdit, onDelete, onView }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  const getRiskColor = (risk: string | null | undefined) => {
    switch(risk) {
      case "High":
        return "bg-red-500/20 text-red-400";
      case "Medium":
        return "bg-amber-500/20 text-amber-400";
      case "Low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  const handleCardClick = () => {
    if (onView) {
      onView();
    }
  };

  // Use riskLevel property, with fallback to risk_level for backward compatibility
  const riskLevel = strategy.riskLevel || strategy.risk_level || "Medium";

  return (
    <div 
      key={strategy.id} 
      className="dashboard-card flex flex-col cursor-pointer" 
      data-testid={`strategy-card-${strategy.id}`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-bold">{strategy.title}</h3>
        <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium ${
          getRiskColor(riskLevel)
        }`}>
          {riskLevel} Risk
        </span>
      </div>
      
      <p className="text-gray-300 mb-4 sm:mb-6 line-clamp-3">{strategy.description}</p>
      
      <div className="mt-auto flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "sm"}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(strategy.id);
                }}
                aria-label={`Edit ${strategy.title}`}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit this strategy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <AlertDialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size={isMobile ? "sm" : "sm"}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Delete ${strategy.title}`}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete this strategy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialogContent onClick={(e) => e.stopPropagation()} className="w-full max-w-md mx-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                strategy "{strategy.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(strategy.id);
                }} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default React.memo(StrategyCard);
