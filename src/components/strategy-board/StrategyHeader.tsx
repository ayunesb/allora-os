import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function StrategyHeader({ onCreateNew }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold">
          📈 Your Growth Strategies
        </h1>
        <p className="text-gray-400 mt-2">
          Built by your AI Executive Team. Ready to dominate your market.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onCreateNew}
          className="bg-purple-600 hover:bg-purple-700 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Strategy
        </Button>
      </div>
    </div>
  );
}
