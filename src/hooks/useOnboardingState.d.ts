import { PartialCompanyDetails } from "@/models/companyDetails";
export default function useOnboardingState(): {
  step: number;
  setStep: import("react").Dispatch<import("react").SetStateAction<number>>;
  companyName: string;
  setCompanyName: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  industry: string;
  setIndustry: import("react").Dispatch<import("react").SetStateAction<string>>;
  goals: string[];
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
  isLoading: boolean;
  errorMessage: string;
  riskAppetite: "medium" | "high" | "low";
  setRiskAppetite: import("react").Dispatch<
    import("react").SetStateAction<"medium" | "high" | "low">
  >;
  executiveTeamEnabled: boolean;
  setExecutiveTeamEnabled: import("react").Dispatch<
    import("react").SetStateAction<boolean>
  >;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  toggleGoal: (goal: string) => void;
};
