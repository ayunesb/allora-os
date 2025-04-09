
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

  const handleNumberChange = (field: keyof PartialCompanyDetails, value: string) => {
    const numValue = value === '' ? undefined : parseInt(value, 10);
    if (!isNaN(numValue as number) || value === '') {
      updateCompanyDetails({ ...companyDetails, [field]: numValue });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Company Details Survey</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Fill in the details below to help our AI better understand your business.
        The more information you provide, the more tailored our insights will be.
      </p>
      
      <Accordion type="multiple" className="w-full">
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
                Target Market
              </label>
              <Textarea 
                placeholder="Who is your customer? (Age, geography, demographics, psychographics)"
                value={companyDetails.targetMarket || ''}
                onChange={(e) => handleTextChange('targetMarket', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Business Type
              </label>
              <div className="flex flex-col space-y-2">
                <RadioGroup 
                  value={companyDetails.businessType || 'B2B'} 
                  onValueChange={(value) => handleTextChange('businessType', value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B2B" id="b2b" />
                    <Label htmlFor="b2b">B2B</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B2C" id="b2c" />
                    <Label htmlFor="b2c">B2C</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Both" id="both" />
                    <Label htmlFor="both">Both</Label>
                  </div>
                </RadioGroup>
              </div>
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
                placeholder="How big is your target market? (TAM/SAM/SOM)"
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
        
        {/* Growth & Traction */}
        <AccordionItem value="growth">
          <AccordionTrigger className="text-base font-medium">
            Growth & Traction
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Current Revenue
              </label>
              <Input 
                placeholder="Monthly Revenue / Annual Recurring Revenue (MRR/ARR)"
                value={companyDetails.revenue || ''}
                onChange={(e) => handleTextChange('revenue', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                User Metrics
              </label>
              <Input 
                placeholder="Number of users/customers? Growth rate?"
                value={companyDetails.userMetrics || ''}
                onChange={(e) => handleTextChange('userMetrics', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Funding
              </label>
              <Input 
                placeholder="Have you raised any funds? Seed, Series A?"
                value={companyDetails.funding || ''}
                onChange={(e) => handleTextChange('funding', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Strategic Partnerships
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a partnership"
                  value={newItem.partnerships || ''}
                  onChange={(e) => setNewItem({...newItem, partnerships: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('partnerships')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.partnerships || []).map((partnership, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {partnership}
                    <button 
                      onClick={() => removeFromArray('partnerships', index)}
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
        
        {/* Product & Technology */}
        <AccordionItem value="product">
          <AccordionTrigger className="text-base font-medium">
            Product & Technology
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Technology Stack
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a technology (AI, blockchain, cloud, etc.)"
                  value={newItem.techStack || ''}
                  onChange={(e) => setNewItem({...newItem, techStack: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('techStack')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.techStack || []).map((tech, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {tech}
                    <button 
                      onClick={() => removeFromArray('techStack', index)}
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
                Current Product Stage
              </label>
              <Select 
                value={companyDetails.productStage || ''} 
                onValueChange={(value) => handleTextChange('productStage', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                  <SelectItem value="launched">Launched</SelectItem>
                  <SelectItem value="scaling">Scaling</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Intellectual Property
              </label>
              <Textarea 
                placeholder="Any patents, trademarks, proprietary tech?"
                value={companyDetails.intellectualProperty || ''}
                onChange={(e) => handleTextChange('intellectualProperty', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                R&D Pipeline
              </label>
              <Textarea 
                placeholder="Any upcoming product innovations?"
                value={companyDetails.rdPipeline || ''}
                onChange={(e) => handleTextChange('rdPipeline', e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Team & Leadership */}
        <AccordionItem value="team">
          <AccordionTrigger className="text-base font-medium">
            Team & Leadership
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Founders and Key Team
              </label>
              <Textarea 
                placeholder="Backgrounds, experience, notable wins?"
                value={companyDetails.founders || ''}
                onChange={(e) => handleTextChange('founders', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Team Size
              </label>
              <Input 
                type="number"
                placeholder="Number of employees"
                value={companyDetails.teamSize || ''}
                onChange={(e) => handleNumberChange('teamSize', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Culture & Values
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a culture value"
                  value={newItem.cultureValues || ''}
                  onChange={(e) => setNewItem({...newItem, cultureValues: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('cultureValues')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.cultureValues || []).map((value, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {value}
                    <button 
                      onClick={() => removeFromArray('cultureValues', index)}
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
        
        {/* Marketing & Sales */}
        <AccordionItem value="marketing">
          <AccordionTrigger className="text-base font-medium">
            Marketing & Sales
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Customer Acquisition Strategies
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an acquisition strategy"
                  value={newItem.acquisitionStrategy || ''}
                  onChange={(e) => setNewItem({...newItem, acquisitionStrategy: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('acquisitionStrategy')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.acquisitionStrategy || []).map((strategy, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {strategy}
                    <button 
                      onClick={() => removeFromArray('acquisitionStrategy', index)}
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
                Sales Channels
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a sales channel"
                  value={newItem.salesChannels || ''}
                  onChange={(e) => setNewItem({...newItem, salesChannels: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('salesChannels')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.salesChannels || []).map((channel, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {channel}
                    <button 
                      onClick={() => removeFromArray('salesChannels', index)}
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
                Customer Retention
              </label>
              <Input 
                placeholder="What is the retention rate? Churn?"
                value={companyDetails.customerRetention || ''}
                onChange={(e) => handleTextChange('customerRetention', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Pricing Strategy
              </label>
              <Input 
                placeholder="How are products/services priced?"
                value={companyDetails.pricingStrategy || ''}
                onChange={(e) => handleTextChange('pricingStrategy', e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* AI/Automation Readiness */}
        <AccordionItem value="ai">
          <AccordionTrigger className="text-base font-medium">
            AI/Automation Readiness
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Current Use of AI or Automation
              </label>
              <Textarea 
                placeholder="Any automation already in place?"
                value={companyDetails.currentAiUse || ''}
                onChange={(e) => handleTextChange('currentAiUse', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                AI Opportunities
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Where can AI improve your business?"
                  value={newItem.aiOpportunities || ''}
                  onChange={(e) => setNewItem({...newItem, aiOpportunities: e.target.value})}
                />
                <Button 
                  type="button" 
                  size="icon"
                  onClick={() => addToArray('aiOpportunities')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(companyDetails.aiOpportunities || []).map((opportunity, index) => (
                  <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {opportunity}
                    <button 
                      onClick={() => removeFromArray('aiOpportunities', index)}
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
        
        {/* Financial Overview */}
        <AccordionItem value="financial">
          <AccordionTrigger className="text-base font-medium">
            Financial Overview
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Current Financials
              </label>
              <Textarea 
                placeholder="Profit/Loss, Cash Flow"
                value={companyDetails.financials || ''}
                onChange={(e) => handleTextChange('financials', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Burn Rate
              </label>
              <Input 
                placeholder="Monthly cash spend"
                value={companyDetails.burnRate || ''}
                onChange={(e) => handleTextChange('burnRate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Runway
              </label>
              <Input 
                placeholder="How many months left before needing new funding?"
                value={companyDetails.runway || ''}
                onChange={(e) => handleTextChange('runway', e.target.value)}
              />
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
        
        {/* Special Info */}
        <AccordionItem value="special">
          <AccordionTrigger className="text-base font-medium">
            Special Info (Optional)
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Social Impact Goals
              </label>
              <Textarea 
                placeholder="Any sustainability, diversity, social initiatives?"
                value={companyDetails.socialImpact || ''}
                onChange={(e) => handleTextChange('socialImpact', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Exit Strategy
              </label>
              <Textarea 
                placeholder="IPO? Acquisition? Long-term private?"
                value={companyDetails.exitStrategy || ''}
                onChange={(e) => handleTextChange('exitStrategy', e.target.value)}
              />
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
