import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ArrowRight } from "lucide-react";
export function StrategicGoals({
  companyDetails,
  handleTextChange,
  newItem,
  setNewItem,
  addToArray,
  removeFromArray,
  onNext,
}) {
  return (
    <AccordionItem value="goals">
      <AccordionTrigger className="text-base font-medium">
        Strategic Goals
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">12-Month Plan</label>
          <Textarea
            placeholder="What are your goals for the next year?"
            value={companyDetails.shortTermPlan || ""}
            onChange={(e) => handleTextChange("shortTermPlan", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">3-5 Year Vision</label>
          <Textarea
            placeholder="What's your long-term vision?"
            value={companyDetails.longTermVision || ""}
            onChange={(e) => handleTextChange("longTermVision", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Key Challenges</label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a challenge"
              value={newItem.challenges || ""}
              onChange={(e) =>
                setNewItem({ ...newItem, challenges: e.target.value })
              }
            />
            <Button
              type="button"
              size="icon"
              onClick={() => addToArray("challenges")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(companyDetails.challenges || []).map((challenge, index) => (
              <div
                key={index}
                className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
              >
                {challenge}
                <button
                  onClick={() => removeFromArray("challenges", index)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={(e) => onNext && onNext("goals")} className="gap-2">
            Continue to Special Info
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
