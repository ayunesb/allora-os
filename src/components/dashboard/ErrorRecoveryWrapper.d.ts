import { ReactNode } from "react";
interface ErrorRecoveryWrapperProps {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onReset?: () => void;
  errorTitle?: string;
  errorMessage?: string;
  componentName?: string;
}
export declare function ErrorRecoveryWrapper({
  children,
  fallbackComponent,
  onReset,
  errorTitle,
  errorMessage,
  componentName,
}: ErrorRecoveryWrapperProps): JSX.Element;
export {};
