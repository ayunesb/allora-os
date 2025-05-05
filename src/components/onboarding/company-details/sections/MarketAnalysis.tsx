import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ArrowRight } from "lucide-react";
export function MarketAnalysis({ companyDetails, handleTextChange, newItem, setNewItem, addToArray, removeFromArray, onNext }) {
    return (<AccordionItem value="market">
      <AccordionTrigger className="text-base font-medium">
        Market Analysis
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Market Size & Growth
          </label>
          <Input placeholder="How big is your target market? (TAM/SAM/SOM)" value={companyDetails.marketSize || ''} onChange={(e) => handleTextChange('marketSize', e.target.value)}/>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Competitors
          </label>
          <div className="flex gap-2">
            <Input placeholder="Add a competitor" value={newItem.competitors || ''} onChange={(e) => setNewItem({ ...newItem, competitors: e.target.value })}/>
            <Button type="button" size="icon" onClick={() => addToArray('competitors')}>
              <Plus className="h-4 w-4"/>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(companyDetails.competitors || []).map((competitor, index) => (<div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {competitor}
                <button onClick={() => removeFromArray('competitors', index)} className="ml-2 text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3"/>
                </button>
              </div>))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Differentiators
          </label>
          <Textarea placeholder="What makes your company unique vs competitors?" value={companyDetails.differentiators || ''} onChange={(e) => handleTextChange('differentiators', e.target.value)}/>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Customer Pain Points
          </label>
          <div className="flex gap-2">
            <Input placeholder="Add a pain point" value={newItem.painPoints || ''} onChange={(e) => setNewItem({ ...newItem, painPoints: e.target.value })}/>
            <Button type="button" size="icon" onClick={() => addToArray('painPoints')}>
              <Plus className="h-4 w-4"/>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(companyDetails.painPoints || []).map((painPoint, index) => (<div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {painPoint}
                <button onClick={() => removeFromArray('painPoints', index)} className="ml-2 text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3"/>
                </button>
              </div>))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={(e) => onNext && onNext('market')} className="gap-2">
            Continue to Growth & Traction
            <ArrowRight className="h-4 w-4"/>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>);
}
