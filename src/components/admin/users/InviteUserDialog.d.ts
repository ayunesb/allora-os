interface Company {
    id: string;
    name: string;
}
interface InviteUserDialogProps {
    companies: Company[];
    loadingCompanies: boolean;
    onSuccess: () => void;
}
export declare const InviteUserDialog: ({ companies, loadingCompanies, onSuccess }: InviteUserDialogProps) => JSX.Element;
export {};
