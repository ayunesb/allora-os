
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type CompanyInfoFormProps = {
  companyName: string;
  setCompanyName: (name: string) => void;
  error?: string;
}

export default function CompanyInfoForm({ companyName, setCompanyName, error }: CompanyInfoFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Company Information</h3>
      <div className="space-y-2">
        <label htmlFor="company-name" className="text-sm font-medium">
          Company Name
        </label>
        <Input
          id="company-name"
          placeholder="Acme Inc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className={error ? "border-destructive" : ""}
        />
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
