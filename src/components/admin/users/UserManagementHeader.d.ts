interface UserManagementHeaderProps {
    companies: {
        id: string;
        name: string;
    }[];
    loadingCompanies: boolean;
    onUserAdded: () => void;
}
export declare const UserManagementHeader: ({ companies, loadingCompanies, onUserAdded }: UserManagementHeaderProps) => JSX.Element;
export {};
