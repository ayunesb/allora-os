
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { saveCompanyInfo } from "@/utils/profileHelpers";
import { useAuth } from "@/context/AuthContext";
import { RocketIcon } from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNext = () => {
    if (step === 1 && !companyName) {
      toast.error("Please enter your company name to continue");
      return;
    }

    if (step === 2 && !industry) {
      toast.error("Please select your industry to continue");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!user) {
      toast.error("You must be logged in to complete onboarding");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      const success = await saveCompanyInfo(user.id, companyName, industry);
      
      if (!success) {
        throw new Error("Failed to save company information");
      }
      
      toast.success("Company setup completed successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during setup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <RocketIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to Allora AI</CardTitle>
          <CardDescription>
            Let's set up your business profile (Step {step} of 3)
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 && (
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
          )}

          {step === 2 && (
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
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Ready to Launch!</h3>
              <p className="text-muted-foreground">
                We've set up your company profile. You're now ready to explore Allora AI's
                powerful features including AI strategy generation, campaign management,
                and executive insights.
              </p>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="font-medium">Company: {companyName}</p>
                <p className="font-medium">Industry: {industry}</p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isLoading}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading
              ? "Processing..."
              : step === 3
              ? "Complete Setup"
              : "Next Step"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
