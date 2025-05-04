interface CreateCompanyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreateCompany: (companyData: {
        name: string;
        industry: string;
    }) => Promise<void>;
}
export declare function CreateCompanyDialog({ open, onOpenChange, onCreateCompany }: CreateCompanyDialogProps): JSX.Element;
export {};
