import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export default function CookiePolicy() {
    // Redirect to the cookies page
    return _jsx(Navigate, { to: "/legal/cookies", replace: true });
}
