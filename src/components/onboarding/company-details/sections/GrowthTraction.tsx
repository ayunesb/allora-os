
import { 
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { SectionProps } from "../types";

export function GrowthTraction({
  companyDetails,
  handleTextChange,
  newItem,
  setNewItem,
  addToArray,
  removeFromArray
}: SectionProps) {
  return (
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
  );
}
