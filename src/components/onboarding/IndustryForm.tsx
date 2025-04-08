
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IndustryFormProps = {
  industry: string;
  setIndustry: (industry: string) => void;
}

export default function IndustryForm({ industry, setIndustry }: IndustryFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Industry Details</h3>
      <div className="space-y-2">
        <label htmlFor="industry" className="text-sm font-medium">
          Select your industry
        </label>
        <Select onValueChange={setIndustry} value={industry}>
          <SelectTrigger>
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
