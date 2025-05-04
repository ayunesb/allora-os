import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
export function SpecialInfo({ companyDetails, handleTextChange }) {
    return (<AccordionItem value="special">
      <AccordionTrigger className="text-base font-medium">
        Special Info (Optional)
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Social Impact Goals
          </label>
          <Textarea placeholder="Any sustainability, diversity, social initiatives?" value={companyDetails.socialImpact || ''} onChange={(e) => handleTextChange('socialImpact', e.target.value)}/>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Exit Strategy
          </label>
          <Textarea placeholder="IPO? Acquisition? Long-term private?" value={companyDetails.exitStrategy || ''} onChange={(e) => handleTextChange('exitStrategy', e.target.value)}/>
        </div>
      </AccordionContent>
    </AccordionItem>);
}
