import { useState } from "react";
import { useCompanyWebsite } from "@/hooks/useCompanyWebsite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search, Globe, Loader2 } from "lucide-react";
export function CompanyWebsite({ onCompanyDataFetched }) {
    const { companyWebsite, setCompanyWebsite, isScrapingData, scrapeCompanyData } = useCompanyWebsite();
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!companyWebsite.trim()) {
            setError("Please enter your company website");
            return;
        }
        const success = await scrapeCompanyData();
        onCompanyDataFetched(success);
    };
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Company Website</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your company website to automatically fetch company information or continue without it.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-website" className="flex items-center gap-2">
                <Globe className="h-4 w-4"/>
                Company Website (Optional)
              </Label>
              <div className="flex gap-2">
                <Input id="company-website" placeholder="www.yourcompany.com" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className={error ? "border-destructive" : ""} disabled={isScrapingData}/>
                <Button type="submit" disabled={isScrapingData || !companyWebsite.trim()}>
                  {isScrapingData ? (<Loader2 className="h-4 w-4 animate-spin mr-2"/>) : (<Search className="h-4 w-4 mr-2"/>)}
                  {isScrapingData ? "Fetching..." : "Fetch"}
                </Button>
              </div>
              {error && (<Alert variant="destructive" className="py-2 mt-2">
                  <AlertCircle className="h-4 w-4"/>
                  <AlertDescription className="ml-2 text-xs">{error}</AlertDescription>
                </Alert>)}
            </div>

            <div className="text-sm text-muted-foreground">
              <p>This will attempt to fetch:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Company name</li>
                <li>Industry</li>
                <li>Description</li>
                <li>Company size</li>
                <li>Products/Services</li>
              </ul>
            </div>

            <div className="flex justify-between pt-2">
              <Button type="button" variant="ghost" onClick={() => onCompanyDataFetched(false)} disabled={isScrapingData}>
                Skip this step
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>);
}
