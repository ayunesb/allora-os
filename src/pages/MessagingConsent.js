import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export default function MessagingConsent() {
    // Redirect to the messaging consent page
    return _jsx(Navigate, { to: "/legal/messaging-consent", replace: true });
}
