interface VerificationHeaderProps {
    verificationStatus: "pending" | "verified" | "failed";
    email: string;
}
export declare function VerificationHeader({ verificationStatus, email }: VerificationHeaderProps): import("react").JSX.Element;
export {};
