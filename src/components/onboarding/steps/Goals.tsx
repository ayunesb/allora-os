
import GoalsForm from "@/components/onboarding/GoalsForm";

interface GoalsProps {
  goals: string[];
  toggleGoal: (goal: string) => void;
  companyName: string;
  industry: string;
  errorMessage?: string | null;
}

export function Goals({ goals, toggleGoal, companyName, industry, errorMessage }: GoalsProps) {
  return (
    <GoalsForm
      goals={goals}
      toggleGoal={toggleGoal}
      companyName={companyName}
      industry={industry}
      error={errorMessage?.includes("goal") ? errorMessage : undefined}
    />
  );
}
