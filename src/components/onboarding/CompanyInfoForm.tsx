
import { Input } from "@/components/ui/input";

type CompanyInfoFormProps = {
  companyName: string;
  setCompanyName: (name: string) => void;
}

export default function CompanyInfoForm({ companyName, setCompanyName }: CompanyInfoFormProps) {
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
        />
      </div>
    </div>
  );
}
