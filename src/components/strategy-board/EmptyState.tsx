
import React from "react";
import { Rocket, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateNew: () => void;
}

export default function EmptyState({ onCreateNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-white/10 bg-black/40 rounded-lg backdrop-blur-sm animate-fadeIn">
      <div className="bg-primary/20 p-3 rounded-full mb-4">
        <Rocket className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">No strategies yet</h3>
      
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        Let's build your future empire 🚀 Create your first growth strategy with help from your AI Executive Team.
      </p>
      
      <Button onClick={onCreateNew} className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
        <Plus className="mr-2 h-4 w-4" />
        Create Your First Strategy
      </Button>
    </div>
  );
}
