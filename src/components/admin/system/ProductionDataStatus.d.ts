import { ValidationResults } from '@/utils/productionDataValidator';
interface ProductionDataStatusProps {
    validationResults: ValidationResults | null;
    isValidating: boolean;
    onValidate: () => Promise<void>;
}
export declare function ProductionDataStatus({ validationResults, isValidating, onValidate }: ProductionDataStatusProps): JSX.Element;
export {};
