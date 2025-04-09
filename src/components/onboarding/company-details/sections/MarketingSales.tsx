
import { 
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { SectionProps } from "../types";

export function MarketingSales({
  companyDetails,
  handleTextChange,
  newItem,
  setNewItem,
  addToArray,
  removeFromArray
}: SectionProps) {
  return (
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
  );
}
