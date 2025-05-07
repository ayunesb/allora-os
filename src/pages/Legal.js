import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export default function Legal() {
    // Redirect to the terms of service page
    return _jsx(Navigate, { to: "/legal/terms-of-service", replace: true });
}
