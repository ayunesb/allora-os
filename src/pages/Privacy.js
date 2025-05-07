import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export default function Privacy() {
    // Redirect to the privacy policy page
    return _jsx(Navigate, { to: "/legal/privacy-policy", replace: true });
}
