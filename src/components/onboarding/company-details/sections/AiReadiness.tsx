import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ArrowRight } from "lucide-react";
export function AiReadiness({ companyDetails, handleTextChange, newItem, setNewItem, addToArray, removeFromArray, onNext }) {
    return (<AccordionItem value="ai">
      <AccordionTrigger className="text-base font-medium">
        AI/Automation Readiness
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Current Use of AI or Automation
          </label>
          <Textarea placeholder="Any automation already in place?" value={companyDetails.currentAiUse || ''} onChange={(e) => handleTextChange('currentAiUse', e.target.value)}/>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            AI Opportunities
          </label>
          <div className="flex gap-2">
            <Input placeholder="Where can AI improve your business?" value={newItem.aiOpportunities || ''} onChange={(e) => setNewItem({ ...newItem, aiOpportunities: e.target.value })}/>
            <Button type="button" size="icon" onClick={() => addToArray('aiOpportunities')}>
              <Plus className="h-4 w-4"/>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(companyDetails.aiOpportunities || []).map((opportunity, index) => (<div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {opportunity}
                <button onClick={() => removeFromArray('aiOpportunities', index)} className="ml-2 text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3"/>
                </button>
              </div>))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={(e) => onNext && onNext('ai')} className="gap-2">
            Continue to Financial Overview
            <ArrowRight className="h-4 w-4"/>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>);
}
