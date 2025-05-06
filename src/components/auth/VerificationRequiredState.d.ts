interface VerificationRequiredStateProps {
  onRefresh: () => Promise<void>;
  onResendVerification: () => Promise<void>;
  isResending: boolean;
}
export declare function VerificationRequiredState({
  onRefresh,
  onResendVerification,
  isResending,
}: VerificationRequiredStateProps): import("react").JSX.Element;
export {};
