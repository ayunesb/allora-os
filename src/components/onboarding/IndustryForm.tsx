
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type IndustryFormProps = {
  industry: string;
  setIndustry: (industry: string) => void;
  error?: string;
}

export default function IndustryForm({ industry, setIndustry, error }: IndustryFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Industry Details</h3>
      <div className="space-y-2">
        <label htmlFor="industry" className="text-sm font-medium">
          Select your industry
        </label>
        <Select onValueChange={setIndustry} value={industry || "unspecified"}>
          <SelectTrigger className={error ? "border-destructive" : ""}>
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unspecified">Select an industry</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
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
