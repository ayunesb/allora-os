
import { PartialCompanyDetails } from "@/models/companyDetails";

export interface SectionProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
  newItem: { [key: string]: string };
  setNewItem: (value: { [key: string]: string }) => void;
  addToArray: (field: keyof PartialCompanyDetails) => void;
  removeFromArray: (field: keyof PartialCompanyDetails, index: number) => void;
  handleTextChange: (field: keyof PartialCompanyDetails, value: string) => void;
  handleNumberChange: (field: keyof PartialCompanyDetails, value: string) => void;
}
