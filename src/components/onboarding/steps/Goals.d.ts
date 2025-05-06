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
export declare function Goals({
  goals,
  toggleGoal,
  companyName,
  industry,
  companyDetails,
  updateCompanyDetails,
  errorMessage,
}: GoalsProps): import("react").JSX.Element;
export {};
