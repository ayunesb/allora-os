type GoalsFormProps = {
    goals: string[];
    toggleGoal: (goal: string) => void;
    companyName: string;
    industry: string;
    error?: string;
    companyDetails?: Record<string, any>;
    updateCompanyDetails?: (details: Record<string, any>) => void;
};
export default function GoalsForm({ goals, toggleGoal, companyName, industry, error, companyDetails, updateCompanyDetails, }: GoalsFormProps): import("react").JSX.Element;
export {};
