import IndustryForm from "@/components/onboarding/IndustryForm";
export function Industry({ industry, setIndustry, errorMessage }) {
  return (
    <IndustryForm
      industry={industry}
      setIndustry={setIndustry}
      error={errorMessage?.includes("industry") ? errorMessage : undefined}
    />
  );
}
