type DocumentStatus = "current" | "outdated" | "update-available";
interface DocumentStatusBadgeProps {
    status: DocumentStatus;
}
export default function DocumentStatusBadge({ status }: DocumentStatusBadgeProps): import("react").JSX.Element;
export {};
