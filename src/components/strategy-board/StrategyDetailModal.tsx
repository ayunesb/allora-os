
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Strategy } from "@/models/strategy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BarChart2, ArrowRight } from "lucide-react";
import StrategyImplementationTools from "../strategy-implementation/StrategyImplementationTools";

interface StrategyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: Strategy | null;
}

const StrategyDetailModal: React.FC<StrategyDetailModalProps> = ({
  isOpen,
  onClose,
  strategy
}) => {
  if (!strategy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0c0f1f] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">{strategy.title}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="details">
              <FileText className="h-4 w-4 mr-2" />
              Strategy Details
            </TabsTrigger>
            <TabsTrigger value="implementation">
              <ArrowRight className="h-4 w-4 mr-2" />
              Implementation Tools
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">Description</h3>
                <p className="text-gray-400">{strategy.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Risk Level</h3>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${strategy.risk === 'Low' ? 'bg-blue-900/20 text-blue-300' : 
                        strategy.risk === 'Medium' ? 'bg-amber-900/20 text-amber-300' : 
                        'bg-rose-900/20 text-rose-300'}`}>
                      {strategy.risk} Risk
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Proposed By</h3>
                  <div className="text-gray-100">
                    {strategy.executiveBot || 'AI Executive Team'}
                  </div>
                </div>
                
                {strategy.impact && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Expected Impact</h3>
                    <div className="text-gray-100">{strategy.impact}</div>
                  </div>
                )}
                
                {strategy.timeframe && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Timeframe</h3>
                    <div className="text-gray-100">{strategy.timeframe}</div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="implementation">
            <StrategyImplementationTools 
              strategyId={strategy.id} 
              strategyTitle={strategy.title} 
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StrategyDetailModal;
