import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export default function RefundPolicy() {
    // Redirect to the refund policy page
    return _jsx(Navigate, { to: "/legal/refund-policy", replace: true });
}
