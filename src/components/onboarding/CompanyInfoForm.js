import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// Company size options
const companySizes = [
    { value: "1-10", label: "1–10 employees" },
    { value: "11-50", label: "11–50 employees" },
    { value: "51-200", label: "51–200 employees" },
    { value: "201-500", label: "201–500 employees" },
    { value: "500+", label: "500+ employees" }
];
// Revenue options
const revenueRanges = [
    { value: "<10k", label: "Less than $10K" },
    { value: "10k-50k", label: "$10K–$50K" },
    { value: "50k-200k", label: "$50K–$200K" },
    { value: ">200k", label: "More than $200K" }
];
// Geographic market options
const markets = [
    { value: "north_america", label: "North America" },
    { value: "europe", label: "Europe" },
    { value: "latam", label: "LATAM" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "global", label: "Global" }
];
export default function CompanyInfoForm({ companyName, setCompanyName, companyDetails = {}, updateCompanyDetails = () => { }, error }) {
    // Handle updating company details
    const handleDetailsChange = (field, value) => {
        if (updateCompanyDetails) {
            updateCompanyDetails({ [field]: value });
        }
    };
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Company Information</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us about your business so we can provide tailored strategies.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name <span className="text-destructive">*</span></Label>
          <Input id="company-name" placeholder="Acme Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={error ? "border-destructive" : ""}/>
          {error && (<Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4"/>
              <AlertDescription className="ml-2 text-xs">{error}</AlertDescription>
            </Alert>)}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="primary-offering">Primary Offering (Products/Services)</Label>
          <Input id="primary-offering" placeholder="What does your company provide?" value={companyDetails?.primaryOffering || ''} onChange={(e) => handleDetailsChange('primaryOffering', e.target.value)}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-size">Company Size</Label>
            <Select value={companyDetails?.companySize || ''} onValueChange={(value) => handleDetailsChange('companySize', value)}>
              <SelectTrigger id="company-size">
                <SelectValue placeholder="Select company size"/>
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (<SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly-revenue">Current Monthly Revenue</Label>
            <Select value={companyDetails?.monthlyRevenue || ''} onValueChange={(value) => handleDetailsChange('monthlyRevenue', value)}>
              <SelectTrigger id="monthly-revenue">
                <SelectValue placeholder="Select revenue range"/>
              </SelectTrigger>
              <SelectContent>
                {revenueRanges.map((range) => (<SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="geographic-market">Primary Geographic Market</Label>
          <Select value={companyDetails?.geographicMarket || ''} onValueChange={(value) => handleDetailsChange('geographicMarket', value)}>
            <SelectTrigger id="geographic-market">
              <SelectValue placeholder="Select primary market"/>
            </SelectTrigger>
            <SelectContent>
              {markets.map((market) => (<SelectItem key={market.value} value={market.value}>
                  {market.label}
                </SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>);
}
