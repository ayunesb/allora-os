
import { 
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, X, ArrowRight } from "lucide-react";
import { SectionProps } from "../types";

export function CompanyFundamentals({
  companyDetails,
  handleTextChange,
  newItem,
  setNewItem,
  addToArray,
  removeFromArray,
  onNext
}: SectionProps) {
  return (
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

        <div className="flex justify-end mt-4">
          <Button 
            onClick={(e) => onNext && onNext('fundamentals')} 
            className="gap-2"
          >
            Continue to Market Analysis
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
