
import IndustryForm from "@/components/onboarding/IndustryForm";

interface IndustryProps {
  industry: string;
  setIndustry: (industry: string) => void;
  errorMessage?: string | null;
}

export function Industry({ industry, setIndustry, errorMessage }: IndustryProps) {
  return (
    <IndustryForm
      industry={industry}
      setIndustry={setIndustry}
      error={errorMessage?.includes("industry") ? errorMessage : undefined}
    />
  );
}
