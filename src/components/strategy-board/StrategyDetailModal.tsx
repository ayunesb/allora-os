
import React from "react";
import { Strategy } from "@/models/strategy";
import { useExecutiveDebate } from "@/hooks/useExecutiveDebate";
import { useStrategyTracking } from "@/hooks/useStrategyTracking";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, ThumbsDown, Clock, BarChart3, CalendarClock, BadgeDollarSign, CheckCheck } from "lucide-react";
import { toast } from "sonner";

interface StrategyDetailModalProps {
  strategy: Strategy | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StrategyDetailModal({ strategy, isOpen, onClose }: StrategyDetailModalProps) {
  const { generateDebate, debateMessages, debateSummary, isLoading: isDebateLoading } = useExecutiveDebate();
  const { trackStrategyApprove, trackStrategyReject } = useStrategyTracking();
  
  // Load debate when modal opens with a strategy
  React.useEffect(() => {
    if (isOpen && strategy) {
      generateDebate(strategy);
    }
  }, [isOpen, strategy, generateDebate]);
  
  const handleApprove = () => {
    if (strategy) {
      trackStrategyApprove(strategy.id, strategy.title, strategy.executiveBot);
      onClose();
    }
  };
  
  const handleReject = () => {
    if (strategy) {
      trackStrategyReject(strategy.id, strategy.title, strategy.executiveBot, "User rejected from detail view");
      onClose();
    }
  };
  
  if (!strategy) return null;
  
  // Calculate progress
  const progress = strategy.progress !== undefined ? strategy.progress : Math.floor(Math.random() * 80) + 10;
  
  // Format the date
  const updatedDate = new Date(strategy.updated_at || strategy.created_at);
  const timeAgo = formatDistanceToNow(updatedDate, { addSuffix: true });
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0c0f1f] border border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              strategy.risk === 'High' ? 'bg-red-700/30 text-red-400' :
              strategy.risk === 'Medium' ? 'bg-amber-600/30 text-amber-400' :
              'bg-green-700/30 text-green-400'
            }`}>
              {strategy.risk || 'Medium'} Risk
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-700/30 text-blue-400`}>
              {strategy.impact || 'Medium'} Impact
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold text-white">{strategy.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Proposed by {strategy.executiveBot || 'AI Executive Team'} • Updated {timeAgo}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Strategy details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Strategy Overview</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {strategy.description}
            </p>
            
            {/* Stats and metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-900/50 rounded-lg p-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Expected ROI</p>
                  <p className="font-medium">{strategy.expectedROI || 'Medium to High'}</p>
                </div>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-4 flex items-center">
                <CalendarClock className="h-5 w-5 mr-3 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Timeframe</p>
                  <p className="font-medium">{strategy.timeframe || '6-12 months'}</p>
                </div>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-4 flex items-center">
                <BadgeDollarSign className="h-5 w-5 mr-3 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Investment Level</p>
                  <p className="font-medium">{strategy.risk === 'High' ? 'Significant' : strategy.risk === 'Medium' ? 'Moderate' : 'Minimal'}</p>
                </div>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-4 flex items-center">
                <CheckCheck className="h-5 w-5 mr-3 text-amber-400" />
                <div>
                  <p className="text-sm text-gray-400">Success Metrics</p>
                  <p className="font-medium">{strategy.successMetrics ? strategy.successMetrics.join(', ') : 'Growth in revenue, Market share increase'}</p>
                </div>
              </div>
            </div>
            
            {/* Progress tracking */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Implementation Progress
                </span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2.5 bg-gray-800" />
            </div>
          </div>
          
          {/* Executive debate section */}
          <div className="mt-8 border-t border-gray-800 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Executive Discussion</h3>
            
            {isDebateLoading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-400">Loading executive insights...</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {debateMessages && debateMessages.length > 0 ? (
                    debateMessages.map((message, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">
                            {message.sender.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{message.sender}</p>
                            <p className="text-xs text-gray-500">{message.executive.role}</p>
                          </div>
                        </div>
                        <p className="text-gray-300">{message.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No executive discussion available for this strategy yet.</p>
                  )}
                </div>
                
                {debateSummary && (
                  <div className="mt-6 bg-purple-900/20 border border-purple-800/40 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-purple-300">Executive Summary</h4>
                    <p className="text-gray-300 text-sm">{debateSummary.finalDecision}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Action footer */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-800">
          <div>
            <DialogClose asChild>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                Close
              </Button>
            </DialogClose>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="destructive" 
              className="bg-red-600/80 hover:bg-red-700"
              onClick={handleReject}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Decline Strategy
            </Button>
            
            <Button 
              className="bg-green-600/80 hover:bg-green-700"
              onClick={handleApprove}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Approve Strategy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
