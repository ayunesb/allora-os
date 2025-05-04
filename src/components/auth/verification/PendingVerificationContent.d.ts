interface PendingVerificationContentProps {
    onResendEmail: () => void;
    isResending: boolean;
    timeLeft: number | null;
}
export declare function PendingVerificationContent({ onResendEmail, isResending, timeLeft }: PendingVerificationContentProps): import("react").JSX.Element;
export {};
