
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, Search, Brain, Sparkles, Lightbulb, Zap, BrainCircuit, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { determineMentalModels, determineCognitiveLayers } from '@/utils/executive-os/executiveBoostService';

// List of industries
const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Energy",
  "Education",
  "Transportation",
  "Real Estate",
  "Media",
  "Food & Beverage",
  "Hospitality",
  "Agriculture",
  "Telecommunications",
  "Construction"
];

// Sample industry experts
const industryExperts = [
  { name: "Elon Musk", role: "strategy", industry: "Technology" },
  { name: "Mark Zuckerberg", role: "technology", industry: "Technology" },
  { name: "Tim Cook", role: "operations", industry: "Technology" },
  { name: "Warren Buffett", role: "finance", industry: "Finance" },
  { name: "Jamie Dimon", role: "strategy", industry: "Finance" },
  { name: "Jane Fraser", role: "finance", industry: "Finance" },
  { name: "Mary Barra", role: "operations", industry: "Manufacturing" },
  { name: "Doug McMillon", role: "operations", industry: "Retail" },
  { name: "Albert Bourla", role: "strategy", industry: "Healthcare" },
  { name: "Emma Walmsley", role: "strategy", industry: "Healthcare" },
  { name: "Darren Woods", role: "operations", industry: "Energy" },
  { name: "Sundar Pichai", role: "technology", industry: "Technology" },
  { name: "Brian Chesky", role: "strategy", industry: "Hospitality" },
  { name: "Javier Rodriguez", role: "operations", industry: "Healthcare" },
  { name: "Bernard Arnault", role: "strategy", industry: "Retail" },
  { name: "Leena Nair", role: "hr", industry: "Retail" },
  { name: "Aliko Dangote", role: "finance", industry: "Manufacturing" }
];

interface IndustryExpertSelectorProps {
  onSelectExpert: (expert: { name: string, role: string, industry: string }) => void;
}

export const IndustryExpertSelector: React.FC<IndustryExpertSelectorProps> = ({ onSelectExpert }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState<'models' | 'cognitive' | null>(null);
  
  // Filter industry experts based on selected industry
  const filteredExperts = industryExperts.filter(expert => 
    (!selectedIndustry || expert.industry === selectedIndustry) &&
    (searchQuery === '' || 
     expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     expert.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
     expert.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Get mental models for the selected expert
  const mentalModels = selectedExpert 
    ? determineMentalModels(selectedExpert.role)
    : [];
    
  // Get cognitive layers for the selected expert
  const cognitiveLayers = selectedExpert 
    ? determineCognitiveLayers(selectedExpert.role)
    : null;
  
  // Handle selecting expert
  const handleSelectExpert = () => {
    if (selectedExpert) {
      onSelectExpert(selectedExpert);
    }
  };

  // Get role-specific icon
  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'strategy': return <Target className="h-3.5 w-3.5 text-blue-400" />;
      case 'technology': return <BrainCircuit className="h-3.5 w-3.5 text-purple-400" />;
      case 'operations': return <Zap className="h-3.5 w-3.5 text-amber-400" />;
      case 'finance': return <Sparkles className="h-3.5 w-3.5 text-emerald-400" />;
      case 'hr': return <Lightbulb className="h-3.5 w-3.5 text-rose-400" />;
      default: return <Brain className="h-3.5 w-3.5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gradient-blue-green bg-clip-text text-transparent">Industry Experts</h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search experts..."
              className="pl-8 bg-black/30 border-white/10 focus:border-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Select an industry-specific AI executive to get specialized advice
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-white/10 bg-black/30 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Industry</CardTitle>
            <CardDescription>
              Choose an industry for specialized expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto scrollbar-thin">
            <RadioGroup 
              value={selectedIndustry || ''} 
              onValueChange={setSelectedIndustry}
              className="space-y-1.5"
            >
              <motion.div 
                className="flex items-center space-x-2 mb-2"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <RadioGroupItem value="" id="all-industries" className="border-primary" />
                <Label htmlFor="all-industries" className="flex-1 cursor-pointer hover:text-primary transition-colors">
                  All Industries
                </Label>
              </motion.div>
              
              {industries.map((industry) => (
                <motion.div 
                  key={industry} 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <RadioGroupItem value={industry} id={industry} className="border-primary" />
                  <Label htmlFor={industry} className="flex-1 cursor-pointer hover:text-primary transition-colors">
                    {industry}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card className="border border-white/10 bg-black/30 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Industry Experts</CardTitle>
            <CardDescription>
              Select an executive specialized in {selectedIndustry || 'your industry'}
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto scrollbar-thin">
            {filteredExperts.length > 0 ? (
              <RadioGroup 
                value={selectedExpert ? JSON.stringify(selectedExpert) : ''} 
                onValueChange={(value) => {
                  setSelectedExpert(value ? JSON.parse(value) : null);
                  setShowDetails(null);
                }}
                className="space-y-1.5"
              >
                {filteredExperts.map((expert) => (
                  <motion.div 
                    key={`${expert.name}-${expert.industry}`} 
                    className="flex items-center space-x-2 rounded-lg p-2 hover:bg-primary/5"
                    whileHover={{ x: 3, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <RadioGroupItem 
                      value={JSON.stringify(expert)} 
                      id={`${expert.name}-${expert.industry}`} 
                      className="border-primary"
                    />
                    <Label 
                      htmlFor={`${expert.name}-${expert.industry}`} 
                      className="flex flex-1 justify-between cursor-pointer"
                    >
                      <span className="font-medium text-white">{expert.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-white/5 border border-white/10 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          {getRoleIcon(expert.role)}
                          <span className="capitalize">{expert.role}</span>
                        </span>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          {expert.industry}
                        </span>
                      </div>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No experts found with the current filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {selectedExpert && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border border-white/10 rounded-lg p-4 bg-black/30 backdrop-blur-md"
        >
          <div className="mb-3 flex justify-between items-center">
            <h3 className="text-lg font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Executive Capabilities</h3>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant={showDetails === 'models' ? "default" : "premium"} 
                onClick={() => setShowDetails(showDetails === 'models' ? null : 'models')}
                className="gap-1"
              >
                <Brain className="h-4 w-4" />
                Mental Models
              </Button>
              <Button 
                size="sm" 
                variant={showDetails === 'cognitive' ? "default" : "premium"} 
                onClick={() => setShowDetails(showDetails === 'cognitive' ? null : 'cognitive')}
                className="gap-1"
              >
                <Sparkles className="h-4 w-4" />
                Cognitive Layers
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showDetails === 'models' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 space-y-3 overflow-hidden"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  These mental models inform {selectedExpert.name}'s approach to problem-solving:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mentalModels.map((model, index) => (
                    <motion.div 
                      key={index} 
                      className="border border-white/5 rounded-md p-3 bg-white/5 backdrop-blur-md hover:border-primary/20 transition-all duration-300"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)" }}
                    >
                      <div className="font-medium text-sm mb-1 flex items-center text-primary">
                        <Brain className="h-3 w-3 mr-1" />
                        {model.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {model.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDetails === 'cognitive' && cognitiveLayers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 space-y-4 overflow-hidden"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Badge variant="outline" className="mr-2 bg-blue-500/10 border-blue-500/30 text-blue-400">Level 1</Badge>
                    Operational Thinking
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">{cognitiveLayers.operational.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cognitiveLayers.operational.capabilities.map((capability, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-all duration-300">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Badge variant="outline" className="mr-2 bg-purple-500/10 border-purple-500/30 text-purple-400">Level 2</Badge>
                    Strategic Thinking
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">{cognitiveLayers.strategic.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cognitiveLayers.strategic.capabilities.map((capability, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-all duration-300">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Badge variant="outline" className="mr-2 bg-amber-500/10 border-amber-500/30 text-amber-400">Level 3</Badge>
                    Innovative Thinking
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">{cognitiveLayers.innovative.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cognitiveLayers.innovative.capabilities.map((capability, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-all duration-300">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
      
      <div className="flex justify-end">
        <motion.div 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-30 -z-10 group-hover:opacity-40 transition-opacity"></div>
          <Button 
            onClick={handleSelectExpert} 
            disabled={!selectedExpert}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary"
            size="lg"
          >
            <Check className="h-4 w-4" />
            Consult Selected Expert
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
