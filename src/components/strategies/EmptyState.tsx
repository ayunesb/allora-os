
import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateNew: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNew }) => {
  return (
    <div className="bg-secondary/40 border border-border/50 rounded-lg p-6 text-center mb-10">
      <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">No Strategies Yet</h3>
      <p className="text-gray-300 mb-6">
        Create your first business strategy with AI assistance.
      </p>
      <Button onClick={onCreateNew} className="allora-button">
        <Plus className="mr-2 h-4 w-4" />
        Create First Strategy
      </Button>
    </div>
  );
};

export default EmptyState;
