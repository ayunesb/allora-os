import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export default function ForgotPassword() {
    // Redirect to the reset password page
    return _jsx(Navigate, { to: "/reset-password", replace: true });
}
