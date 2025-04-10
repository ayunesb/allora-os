import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Sparkles, CheckCircle, X } from "lucide-react";
import { Strategy } from "@/models/strategy";

interface StrategyWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStrategy: (strategy: Omit<Strategy, 'id' | 'created_at'>) => Promise<Strategy | null>;
}

type WizardStep = 'form' | 'reviewing' | 'results';
type StrategyFormData = {
  goal: string;
  market: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  budget: string;
  timeframe: string;
};

export default function StrategyWizardModal({ 
  isOpen, 
  onClose, 
  onCreateStrategy 
}: StrategyWizardModalProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<WizardStep>('form');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStrategies, setGeneratedStrategies] = useState<Partial<Strategy>[]>([]);
  const [selectedStrategyIndex, setSelectedStrategyIndex] = useState<number>(-1);
  
  const [formData, setFormData] = useState<StrategyFormData>({
    goal: '',
    market: '',
    riskLevel: 'Medium',
    budget: '',
    timeframe: '6-12 months'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const mockStrategies: Partial<Strategy>[] = [
    {
      title: "Market Expansion: Digital Channels",
      description: "Expand market reach through optimized digital channels, focusing on targeted social media campaigns and performance marketing for the core demographic. Implement data-driven decision making at each phase.",
      risk: formData.riskLevel,
      risk_level: formData.riskLevel,
      executiveBot: "Satya Nadella",
      impact: "High",
      timeframe: formData.timeframe,
      progress: 0,
      status: "In Progress"
    },
    {
      title: "Operational Excellence Program",
      description: "Streamline operations with process automation and efficiency optimizations. Reduce overhead by 15% while maintaining quality standards through strategic implementation of workflow tools and staff training.",
      risk: formData.riskLevel === "High" ? "Medium" : (formData.riskLevel === "Low" ? "Low" : "Medium"),
      risk_level: formData.riskLevel === "High" ? "Medium" : (formData.riskLevel === "Low" ? "Low" : "Medium"),
      executiveBot: "Tim Cook",
      impact: "Medium",
      timeframe: formData.timeframe,
      progress: 0,
      status: "In Progress"
    },
    {
      title: "Innovation Pipeline Development",
      description: "Create a structured innovation pipeline to bring new products to market faster. Establish cross-functional teams dedicated to R&D with clear metrics for success and regular review cycles.",
      risk: formData.riskLevel === "Low" ? "Medium" : (formData.riskLevel === "Medium" ? "High" : "High"),
      risk_level: formData.riskLevel === "Low" ? "Medium" : (formData.riskLevel === "Medium" ? "High" : "High"),
      executiveBot: "Elon Musk",
      impact: "Very High",
      timeframe: formData.timeframe,
      progress: 0,
      status: "In Progress"
    }
  ];
  
  const handleGenerateStrategies = async () => {
    // Validate form
    if (!formData.goal || !formData.market) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setCurrentStep('reviewing');
    
    // Simulate AI strategy generation
    setTimeout(() => {
      setGeneratedStrategies(mockStrategies);
      setIsGenerating(false);
      setCurrentStep('results');
    }, 3000);
  };
  
  const handleSelectStrategy = (index: number) => {
    setSelectedStrategyIndex(index);
  };
  
  const handleCreateSelected = async () => {
    if (selectedStrategyIndex === -1) {
      toast({
        title: "No strategy selected",
        description: "Please select a strategy to create.",
        variant: "destructive"
      });
      return;
    }
    
    const selectedStrategy = generatedStrategies[selectedStrategyIndex];
    setIsGenerating(true);
    
    try {
      await onCreateStrategy({
        title: selectedStrategy.title || '',
        description: selectedStrategy.description || '',
        risk: selectedStrategy.risk as 'Low' | 'Medium' | 'High',
        risk_level: selectedStrategy.risk_level as 'Low' | 'Medium' | 'High',
        company_id: '', // This will be filled by the hook
        executiveBot: selectedStrategy.executiveBot,
        impact: selectedStrategy.impact,
        timeframe: selectedStrategy.timeframe,
        status: selectedStrategy.status
      });
      
      toast({
        title: "Strategy created",
        description: "Your new strategy has been added to your dashboard.",
      });
      
      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: "Error creating strategy",
        description: "There was an error creating your strategy. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      goal: '',
      market: '',
      riskLevel: 'Medium',
      budget: '',
      timeframe: '6-12 months'
    });
    setCurrentStep('form');
    setGeneratedStrategies([]);
    setSelectedStrategyIndex(-1);
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-black/80 backdrop-blur-xl border border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            AI Strategy Wizard
          </DialogTitle>
          <DialogDescription>
            Let our AI Executive Team create strategic plans for your business goals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {currentStep === 'form' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="goal" className="block text-sm font-medium mb-1">
                  What's your primary business goal?
                </label>
                <Textarea
                  id="goal"
                  name="goal"
                  placeholder="e.g., Increase market share, reduce costs, launch new product"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="bg-black/50 border-white/10"
                />
              </div>
              
              <div>
                <label htmlFor="market" className="block text-sm font-medium mb-1">
                  Describe your target market
                </label>
                <Textarea
                  id="market"
                  name="market"
                  placeholder="e.g., SMBs in healthcare sector, tech-savvy millennials"
                  value={formData.market}
                  onChange={handleInputChange}
                  className="bg-black/50 border-white/10"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="riskLevel" className="block text-sm font-medium mb-1">
                    Risk Appetite
                  </label>
                  <Select
                    value={formData.riskLevel}
                    onValueChange={(value) => handleSelectChange('riskLevel', value)}
                  >
                    <SelectTrigger id="riskLevel" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Conservative (Low Risk)</SelectItem>
                      <SelectItem value="Medium">Balanced (Medium Risk)</SelectItem>
                      <SelectItem value="High">Aggressive (High Risk)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="timeframe" className="block text-sm font-medium mb-1">
                    Timeframe
                  </label>
                  <Select
                    value={formData.timeframe}
                    onValueChange={(value) => handleSelectChange('timeframe', value)}
                  >
                    <SelectTrigger id="timeframe" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3 months">Short-term (1-3 months)</SelectItem>
                      <SelectItem value="3-6 months">Medium-term (3-6 months)</SelectItem>
                      <SelectItem value="6-12 months">Long-term (6-12 months)</SelectItem>
                      <SelectItem value="1-2 years">Strategic (1-2 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-1">
                  Approximate Budget (optional)
                </label>
                <Input
                  id="budget"
                  name="budget"
                  placeholder="e.g., $10,000"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="bg-black/50 border-white/10"
                />
              </div>
            </div>
          )}
          
          {currentStep === 'reviewing' && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-lg font-medium">Generating strategic recommendations...</p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Our AI executive team is analyzing your goals and creating tailored strategies.
              </p>
            </div>
          )}
          
          {currentStep === 'results' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Based on your input, our AI executives have developed these strategic plans:
              </p>
              
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="0">Strategy 1</TabsTrigger>
                  <TabsTrigger value="1">Strategy 2</TabsTrigger>
                  <TabsTrigger value="2">Strategy 3</TabsTrigger>
                </TabsList>
                
                {generatedStrategies.map((strategy, index) => (
                  <TabsContent key={index} value={index.toString()} className="border border-white/10 rounded-md p-4 mt-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{strategy.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          strategy.risk === 'High' ? 'bg-red-500/20 text-red-400' :
                          strategy.risk === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {strategy.risk} Risk
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                          {strategy.impact} Impact
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
                    
                    <div className="text-xs text-muted-foreground mb-3">
                      Proposed by <span className="font-medium text-primary">{strategy.executiveBot}</span>
                    </div>
                    
                    <Button
                      variant={selectedStrategyIndex === index ? "default" : "outline"}
                      size="sm"
                      className={`w-full ${selectedStrategyIndex === index ? 'bg-primary' : 'bg-black/50 border-white/10'}`}
                      onClick={() => handleSelectStrategy(index)}
                    >
                      {selectedStrategyIndex === index ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Selected
                        </>
                      ) : (
                        'Select This Strategy'
                      )}
                    </Button>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {currentStep === 'form' && (
            <Button 
              onClick={handleGenerateStrategies}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Strategies
            </Button>
          )}
          
          {currentStep === 'results' && (
            <>
              <Button
                variant="ghost"
                onClick={() => setCurrentStep('form')}
                disabled={isGenerating}
              >
                <X className="mr-2 h-4 w-4" />
                Start Over
              </Button>
              
              <Button
                onClick={handleCreateSelected}
                disabled={selectedStrategyIndex === -1 || isGenerating}
                className={selectedStrategyIndex !== -1 ? "bg-gradient-to-r from-purple-600 to-blue-500" : ""}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Create Selected Strategy
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
