
import { useState, useEffect } from "react";
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
import { saveOnboardingInfo } from "@/utils/onboardingHelper";
import { useAuth } from "@/context/AuthContext";
import { RocketIcon, CheckCircle2 } from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  // Pre-fill fields if user has partial profile data (common with social logins)
  useEffect(() => {
    if (profile) {
      if (profile.company) setCompanyName(profile.company);
      if (profile.industry) setIndustry(profile.industry);
    }
  }, [profile]);

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

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
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
      console.log("Saving onboarding info:", user.id, companyName, industry, goals);
      const result = await saveOnboardingInfo(user.id, companyName, industry, goals);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to save company information");
      }
      
      // Refresh user profile to get updated data
      await refreshProfile();
      
      toast.success("Company setup completed successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Onboarding error:", error);
      toast.error(error.message || "An error occurred during setup");
    } finally {
      setIsLoading(false);
    }
  };

  const goalOptions = [
    "Increase revenue",
    "Expand customer base",
    "Improve product/service",
    "Enter new markets",
    "Optimize operations",
    "Reduce costs"
  ];

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
              <h3 className="text-lg font-medium">Business Goals</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select the goals that align with your business strategy
              </p>
              
              <div className="grid grid-cols-1 gap-2">
                {goalOptions.map(goal => (
                  <Button
                    key={goal}
                    type="button"
                    variant={goals.includes(goal) ? "default" : "outline"}
                    className="justify-start gap-2"
                    onClick={() => toggleGoal(goal)}
                  >
                    {goals.includes(goal) && <CheckCircle2 className="h-4 w-4" />}
                    {goal}
                  </Button>
                ))}
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg mt-6">
                <p className="font-medium">Company: {companyName}</p>
                <p className="font-medium">Industry: {industry}</p>
                {goals.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Goals:</p>
                    <ul className="list-disc pl-5 text-sm">
                      {goals.map(goal => (
                        <li key={goal}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
