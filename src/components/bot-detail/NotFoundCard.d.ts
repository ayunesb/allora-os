import React from "react";
interface NotFoundCardProps {
    resourceType?: string;
    redirectPath?: string;
    redirectLabel?: string;
    message?: string;
    autoRedirectDelay?: number;
    logError?: boolean;
}
declare const NotFoundCard: React.FC<NotFoundCardProps>;
export default NotFoundCard;
