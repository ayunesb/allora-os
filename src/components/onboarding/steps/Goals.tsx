import GoalsForm from "@/components/onboarding/GoalsForm";
export function Goals({
  goals,
  toggleGoal,
  companyName,
  industry,
  companyDetails,
  updateCompanyDetails,
  errorMessage,
}) {
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
