interface EmailVerificationViewProps {
    email: string;
    onTryAgain?: () => void;
    isNewSignup?: boolean;
    userId?: string;
}
export default function EmailVerificationView({ email, onTryAgain, isNewSignup, userId }: EmailVerificationViewProps): import("react").JSX.Element;
export {};
