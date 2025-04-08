
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PartialCompanyDetails } from "@/models/companyDetails";
import { Plus, X } from "lucide-react";

type CompanyDetailsSurveyProps = {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
  error?: string;
}

export default function CompanyDetailsSurvey({ 
  companyDetails, 
  updateCompanyDetails,
  error 
}: CompanyDetailsSurveyProps) {
  
  // Generic handler for updating string fields
  const handleTextChange = (field: keyof PartialCompanyDetails, value: string) => {
    updateCompanyDetails({ ...companyDetails, [field]: value });
  };

  // Function to handle array updates
  const [newItem, setNewItem] = useState<{ [key: string]: string }>({});
  
  const addToArray = (field: keyof PartialCompanyDetails) => {
    if (!newItem[field] || newItem[field].trim() === '') return;
    
    const currentArray = companyDetails[field] as string[] || [];
    updateCompanyDetails({ 
      ...companyDetails, 
      [field]: [...currentArray, newItem[field]] 
    });
    
    // Clear the input
    setNewItem({ ...newItem, [field]: '' });
  };
  
  const removeFromArray = (field: keyof PartialCompanyDetails, index: number) => {
    const currentArray = companyDetails[field] as string[] || [];
    const newArray = [...currentArray];
    newArray.splice(index, 1);
    
    updateCompanyDetails({ ...companyDetails, [field]: newArray });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Company Details Survey</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Fill in the details below to help our AI better understand your business.
        The more information you provide, the more tailored our insights will be.
      </p>
      
      <Accordion type="single" collapsible className="w-full">
        {/* Company Fundamentals */}
        <AccordionItem value="fundamentals">
          <AccordionTrigger className="text-base font-medium">
            Company Fundamentals
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Company Description
              </label>
              <Textarea 
                placeholder="What does your company do?"
                value={companyDetails.description || ''}
                onChange={(e) => handleTextChange('description', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Mission Statement
              </label>
              <Textarea 
                placeholder="What is your company's mission?"
                value={companyDetails.mission || ''}
                onChange={(e) => handleTextChange('mission', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Vision
              </label>
              <Textarea 
                placeholder="What is your long-term vision?"
                value={companyDetails.vision || ''}
                onChange={(e) => handleTextChange('vision', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Core Products / Services
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a product or service"
                  value={newItem.coreProducts || ''}
                  onChange={(e) => setNewItem({...newItem, coreProducts: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('coreProducts')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.coreProducts || []).map((product, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {product}
                    <button 
                      onClick={() => removeFromArray('coreProducts', index)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Business Model
              </label>
              <Input 
                placeholder="How does your company make money? (SaaS, e-commerce, etc.)"
                value={companyDetails.businessModel || ''}
                onChange={(e) => handleTextChange('businessModel', e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Market Analysis */}
        <AccordionItem value="market">
          <AccordionTrigger className="text-base font-medium">
            Market Analysis
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Market Size & Growth
              </label>
              <Input 
                placeholder="How big is your target market?"
                value={companyDetails.marketSize || ''}
                onChange={(e) => handleTextChange('marketSize', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Competitors
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a competitor"
                  value={newItem.competitors || ''}
                  onChange={(e) => setNewItem({...newItem, competitors: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('competitors')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.competitors || []).map((competitor, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {competitor}
                    <button 
                      onClick={() => removeFromArray('competitors', index)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Differentiators
              </label>
              <Textarea 
                placeholder="What makes your company unique vs competitors?"
                value={companyDetails.differentiators || ''}
                onChange={(e) => handleTextChange('differentiators', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Customer Pain Points
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a pain point"
                  value={newItem.painPoints || ''}
                  onChange={(e) => setNewItem({...newItem, painPoints: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('painPoints')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.painPoints || []).map((painPoint, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {painPoint}
                    <button 
                      onClick={() => removeFromArray('painPoints', index)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Strategic Goals */}
        <AccordionItem value="goals">
          <AccordionTrigger className="text-base font-medium">
            Strategic Goals
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                12-Month Plan
              </label>
              <Textarea 
                placeholder="What are your goals for the next year?"
                value={companyDetails.shortTermPlan || ''}
                onChange={(e) => handleTextChange('shortTermPlan', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                3-5 Year Vision
              </label>
              <Textarea 
                placeholder="What's your long-term vision?"
                value={companyDetails.longTermVision || ''}
                onChange={(e) => handleTextChange('longTermVision', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Key Challenges
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a challenge"
                  value={newItem.challenges || ''}
                  onChange={(e) => setNewItem({...newItem, challenges: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('challenges')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.challenges || []).map((challenge, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {challenge}
                    <button 
                      onClick={() => removeFromArray('challenges', index)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="text-sm text-muted-foreground italic mt-4">
        <p>* You can continue with basic information only and update these details later.</p>
      </div>
    </div>
  );
}
