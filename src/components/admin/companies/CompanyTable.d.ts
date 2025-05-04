import { Company } from "@/models/company";
interface CompanyTableProps {
    companies: Company[];
    isLoading: boolean;
    onViewUsers: (companyId: string) => void;
    onEditCompany?: (company: Company) => void;
    onDeleteCompany?: (companyId: string) => void;
}
export declare function CompanyTable({ companies, isLoading, onViewUsers, onEditCompany, onDeleteCompany }: CompanyTableProps): JSX.Element;
export {};
