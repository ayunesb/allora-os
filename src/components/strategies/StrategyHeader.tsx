
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";

interface StrategyHeaderProps {
  onNewStrategy: () => void;
  isAnyActionPending?: boolean;
}

const StrategyHeader: React.FC<StrategyHeaderProps> = ({ 
  onNewStrategy,
  isAnyActionPending = false
}) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Business Strategies</h1>
        <p className="text-muted-foreground mt-1">
          Create and manage strategic plans for your business
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={onNewStrategy}
          disabled={isAnyActionPending}
          className="w-full sm:w-auto"
        >
          {isAnyActionPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Strategy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default StrategyHeader;
