interface VerificationActionsProps {
  isChecking: boolean;
  isAddingDemo: boolean;
  isVerifyingTables: boolean;
  isCheckingIndexes: boolean;
  isVerifyingRLS: boolean;
  isVerifyingFunctions: boolean;
  onRunChecks: () => void;
  onAddDemoData: () => void;
  onVerifyTables?: () => void;
  onCheckIndexes?: () => void;
  onVerifyRLS?: () => void;
  onVerifyFunctions?: () => void;
  hasResults: boolean;
  hasVerifiedTables?: boolean;
  hasVerifiedIndexes?: boolean;
  hasVerifiedRLS?: boolean;
  hasVerifiedFunctions?: boolean;
}
export declare function VerificationActions({
  isChecking,
  isAddingDemo,
  isVerifyingTables,
  isCheckingIndexes,
  isVerifyingRLS,
  isVerifyingFunctions,
  onRunChecks,
  onAddDemoData,
  onVerifyTables,
  onCheckIndexes,
  onVerifyRLS,
  onVerifyFunctions,
  hasResults,
  hasVerifiedTables,
  hasVerifiedIndexes,
  hasVerifiedRLS,
  hasVerifiedFunctions,
}: VerificationActionsProps): JSX.Element;
export {};
