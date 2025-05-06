import { ReactNode } from "react";
import { ExtendedComplianceContextType } from "@/types/unified-types";
export declare const ComplianceContext: import("react").Context<ExtendedComplianceContextType>;
export interface ComplianceProviderProps {
  children: ReactNode;
}
export declare const ComplianceProvider: ({
  children,
}: ComplianceProviderProps) => JSX.Element;
export declare const useCompliance: () => ExtendedComplianceContextType;
