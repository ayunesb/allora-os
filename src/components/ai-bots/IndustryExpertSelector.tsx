
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

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
  
  // Filter industry experts based on selected industry
  const filteredExperts = industryExperts.filter(expert => 
    (!selectedIndustry || expert.industry === selectedIndustry) &&
    (searchQuery === '' || 
     expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     expert.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
     expert.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Handle selecting expert
  const handleSelectExpert = () => {
    if (selectedExpert) {
      onSelectExpert(selectedExpert);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-lg font-medium">Industry Experts</h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search experts..."
              className="pl-8"
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
        <Card className="border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Industry</CardTitle>
            <CardDescription>
              Choose an industry for specialized expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            <RadioGroup 
              value={selectedIndustry || ''} 
              onValueChange={setSelectedIndustry}
              className="space-y-1.5"
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="" id="all-industries" />
                <Label htmlFor="all-industries" className="flex-1 cursor-pointer">
                  All Industries
                </Label>
              </div>
              
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <RadioGroupItem value={industry} id={industry} />
                  <Label htmlFor={industry} className="flex-1 cursor-pointer">
                    {industry}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Industry Experts</CardTitle>
            <CardDescription>
              Select an executive specialized in {selectedIndustry || 'your industry'}
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            {filteredExperts.length > 0 ? (
              <RadioGroup 
                value={selectedExpert ? JSON.stringify(selectedExpert) : ''} 
                onValueChange={(value) => setSelectedExpert(value ? JSON.parse(value) : null)}
                className="space-y-1.5"
              >
                {filteredExperts.map((expert) => (
                  <div key={`${expert.name}-${expert.industry}`} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={JSON.stringify(expert)} 
                      id={`${expert.name}-${expert.industry}`} 
                    />
                    <Label 
                      htmlFor={`${expert.name}-${expert.industry}`} 
                      className="flex flex-1 justify-between cursor-pointer"
                    >
                      <span>{expert.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {expert.industry} • {expert.role.charAt(0).toUpperCase() + expert.role.slice(1)}
                      </span>
                    </Label>
                  </div>
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
      
      <div className="flex justify-end">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button 
            onClick={handleSelectExpert} 
            disabled={!selectedExpert}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Consult Selected Expert
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
