import { ValidationResultsUI } from "./types";
interface VerificationContentProps {
  results: ValidationResultsUI | null;
  isChecking: boolean;
}
export declare function VerificationContent({
  results,
  isChecking,
}: VerificationContentProps): JSX.Element;
export {};
