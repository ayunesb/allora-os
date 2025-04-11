
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type IndustryFormProps = {
  industry: string;
  setIndustry: (industry: string) => void;
  error?: string;
}

const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "finance", label: "Finance" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "real_estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality" },
  { value: "other", label: "Other" }
];

export default function IndustryForm({ industry, setIndustry, error }: IndustryFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Industry Information</h3>
      <p className="text-sm text-muted-foreground">
        Select the industry that best describes your company.
      </p>
      
      <div className="space-y-2">
        <Label htmlFor="industry-select">Industry</Label>
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger id="industry-select" className={error ? "border-destructive" : ""}>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industryOption) => (
              <SelectItem key={industryOption.value} value={industryOption.value}>
                {industryOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {error && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2 text-xs">{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
