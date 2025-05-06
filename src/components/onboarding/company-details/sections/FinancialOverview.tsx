import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export function FinancialOverview({
  companyDetails,
  handleTextChange,
  onNext,
}) {
  return (
    <AccordionItem value="financial">
      <AccordionTrigger className="text-base font-medium">
        Financial Overview
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Financials</label>
          <Textarea
            placeholder="Profit/Loss, Cash Flow"
            value={companyDetails.financials || ""}
            onChange={(e) => handleTextChange("financials", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Burn Rate</label>
          <Input
            placeholder="Monthly cash spend"
            value={companyDetails.burnRate || ""}
            onChange={(e) => handleTextChange("burnRate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Runway</label>
          <Input
            placeholder="How many months left before needing new funding?"
            value={companyDetails.runway || ""}
            onChange={(e) => handleTextChange("runway", e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={(e) => onNext && onNext("financial")}
            className="gap-2"
          >
            Continue to Strategic Goals
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
