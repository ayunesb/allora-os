import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
const AdminGuard = ({ children }) => {
    const isAdmin = true; // Replace with actual admin check logic
    if (!isAdmin) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default AdminGuard;
