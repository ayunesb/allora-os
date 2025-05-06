import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function ProductTechnology({
  companyDetails,
  handleTextChange,
  newItem,
  setNewItem,
  addToArray,
  removeFromArray,
  onNext,
}) {
  return (
    <AccordionItem value="product">
      <AccordionTrigger className="text-base font-medium">
        Product & Technology
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Technology Stack</label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a technology (AI, blockchain, cloud, etc.)"
              value={newItem.techStack || ""}
              onChange={(e) =>
                setNewItem({ ...newItem, techStack: e.target.value })
              }
            />
            <Button
              type="button"
              size="icon"
              onClick={() => addToArray("techStack")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(companyDetails.techStack || []).map((tech, index) => (
              <div
                key={index}
                className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
              >
                {tech}
                <button
                  onClick={() => removeFromArray("techStack", index)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Current Product Stage</label>
          <Select
            value={companyDetails.productStage || "unknown"}
            onValueChange={(value) => handleTextChange("productStage", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select product stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unknown">Unknown</SelectItem>
              <SelectItem value="idea">Idea</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="beta">Beta</SelectItem>
              <SelectItem value="launched">Launched</SelectItem>
              <SelectItem value="scaling">Scaling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Intellectual Property</label>
          <Textarea
            placeholder="Any patents, trademarks, proprietary tech?"
            value={companyDetails.intellectualProperty || ""}
            onChange={(e) =>
              handleTextChange("intellectualProperty", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">R&D Pipeline</label>
          <Textarea
            placeholder="Any upcoming product innovations?"
            value={companyDetails.rdPipeline || ""}
            onChange={(e) => handleTextChange("rdPipeline", e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={(e) => onNext && onNext("product")}
            className="gap-2"
          >
            Continue to Team & Leadership
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
