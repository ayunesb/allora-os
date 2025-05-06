import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Brain } from "lucide-react";
const StrategyHeader = ({ onNewStrategy, isAnyActionPending = false }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 animate-fadeIn">
      <div className="flex items-center">
        <Brain className="h-8 w-8 text-primary mr-3 animate-pulse-slow" />
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Business Strategies
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage strategic plans for your business
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          onClick={onNewStrategy}
          disabled={isAnyActionPending}
          variant="gradient"
          className="w-full sm:w-auto shadow-lg hover:shadow-primary/20"
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
};
export default StrategyHeader;
