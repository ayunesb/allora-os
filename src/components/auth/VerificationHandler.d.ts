interface VerificationHandlerProps {
  user: any;
  children: (
    isResending: boolean,
    handleResendVerificationEmail: () => Promise<void>,
  ) => React.ReactNode;
}
export declare const VerificationHandler: ({
  user,
  children,
}: VerificationHandlerProps) => import("react").JSX.Element;
export {};
