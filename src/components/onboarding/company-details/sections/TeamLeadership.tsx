
import { 
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { SectionProps } from "../types";

export function TeamLeadership({
  companyDetails,
  handleTextChange,
  newItem,
  setNewItem,
  addToArray,
  removeFromArray,
  handleNumberChange
}: SectionProps) {
  return (
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
  );
}
