
import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus, Sparkles } from "lucide-react";

interface EmptyStateProps {
  onCreateNew: () => void;
}

export default function EmptyState({ onCreateNew }: EmptyStateProps) {
  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-8 sm:p-12 text-center my-8 animate-fadeIn shadow-xl">
      <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <TrendingUp className="h-8 w-8 text-purple-400" />
      </div>
      
      <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        No strategies yet
      </h3>
      
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Let's build your future empire and dominate your market with AI-powered strategic planning.
      </p>
      
      <Button 
        onClick={onCreateNew}
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 group"
      >
        <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        <span>Create First Strategy</span>
        <Sparkles className="ml-2 h-5 w-5 text-yellow-300 animate-pulse" />
      </Button>
    </div>
  );
}
