
import GoalsForm from "@/components/onboarding/GoalsForm";
import { PartialCompanyDetails } from "@/models/companyDetails";

interface GoalsProps {
  goals: string[];
  toggleGoal: (goal: string) => void;
  companyName: string;
  industry: string;
  companyDetails?: PartialCompanyDetails;
  updateCompanyDetails?: (details: PartialCompanyDetails) => void;
  errorMessage?: string | null;
}

export function Goals({ 
  goals, 
  toggleGoal, 
  companyName, 
  industry, 
  companyDetails,
  updateCompanyDetails,
  errorMessage 
}: GoalsProps) {
  return (
    <GoalsForm
      goals={goals}
      toggleGoal={toggleGoal}
      companyName={companyName}
      industry={industry}
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
      error={errorMessage?.includes("goal") ? errorMessage : undefined}
    />
  );
}
