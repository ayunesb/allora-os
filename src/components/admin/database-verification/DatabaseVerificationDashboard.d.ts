import { DatabaseTableStatus, PolicyStatus, FunctionStatus } from '@/types/databaseVerification';
interface DatabaseVerificationDashboardProps {
    result: {
        tables: DatabaseTableStatus[];
        policies: PolicyStatus[];
        functions: FunctionStatus[];
        isVerifying: boolean;
    };
    onVerify: () => void;
}
export declare function DatabaseVerificationDashboard({ result, onVerify }: DatabaseVerificationDashboardProps): JSX.Element;
export {};
