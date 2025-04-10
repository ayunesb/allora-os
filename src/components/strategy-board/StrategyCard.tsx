
import React from "react";
import { Strategy } from "@/models/strategy";
import { Clock, MessageSquare, FileDown, Edit } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";

interface StrategyCardProps {
  strategy: Strategy;
  onDebate: () => void;
  onExport: () => void;
}

export default function StrategyCard({ strategy, onDebate, onExport }: StrategyCardProps) {
  // Progress calculation
  const progress = strategy.progress !== undefined 
    ? strategy.progress 
    : Math.floor(Math.random() * 80) + 10;
  
  // Format the date
  const updatedDate = new Date(strategy.updated_at || strategy.created_at);
  const timeAgo = formatDistanceToNow(updatedDate, { addSuffix: true });
  
  // Get risk data
  const risk = strategy.risk || strategy.risk_level || 'Medium';
  
  // Risk badge color
  const getRiskBadgeColor = () => {
    switch (risk) {
      case 'High':
        return 'bg-red-700 text-white';
      case 'Medium':
        return 'bg-amber-500 text-white';
      case 'Low':
        return 'bg-green-700 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };
  
  return (
    <div className="group bg-[#0f1526] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/10">
      <div className="p-5">
        {/* Status badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-4 py-1 rounded-full text-sm font-medium ${getRiskBadgeColor()}`}>
            {risk} Risk
          </span>
          
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-900/40 border border-blue-800/50 text-blue-300">
            <Clock className="h-3.5 w-3.5 mr-1" />
            In Progress
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-white">{strategy.title}</h3>
        
        {/* Proposed by */}
        <p className="text-sm text-gray-400 mb-3">
          Proposed by {strategy.executiveBot || 'AI Executive Team'}
        </p>
        
        {/* Description */}
        <p className="text-sm text-gray-300 mb-6 line-clamp-2">
          {strategy.description || 'No description provided.'}
        </p>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-800" />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>Updated {timeAgo}</span>
          <span>{strategy.impact || 'Medium'} Impact</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDebate();
            }}
            className="flex items-center justify-center gap-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-200 flex-1 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Debate
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExport();
            }}
            className="flex items-center justify-center py-2 px-3 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-200 transition-colors"
          >
            <FileDown className="h-4 w-4" />
          </button>
          
          <button
            className="flex items-center justify-center py-2 px-3 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-200 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
