var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { logger } from "@/utils/loggingService";
import { toast } from "sonner";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
import { Loading } from "@/components/ui/loading";
const AdminRoute = ({ children }) => {
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(null);
    const isLoading = (auth === null || auth === void 0 ? void 0 : auth.isLoading) || (auth === null || auth === void 0 ? void 0 : auth.loading) || isAdmin === null;
    useEffect(() => {
        const checkAdminStatus = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            if (!(auth === null || auth === void 0 ? void 0 : auth.user)) {
                setIsAdmin(false);
                return;
            }
            try {
                // Check if user has admin role
                const isAdminUser = auth.user.role === "admin" ||
                    ((_b = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.app_metadata) === null || _b === void 0 ? void 0 : _b.is_admin) === true;
                setIsAdmin(isAdminUser);
                if (!isAdminUser) {
                    logger.warn("Non-admin user attempted to access admin route", {
                        userId: auth.user.id,
                        path: location.pathname,
                    });
                    toast.error("You do not have permission to access this page");
                }
            }
            catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(false);
                toast.error("Something went wrong checking your permissions");
            }
        });
        checkAdminStatus();
    }, [auth === null || auth === void 0 ? void 0 : auth.user, location.pathname]);
    if (isLoading) {
        return (_jsx(Loading, { size: "lg", text: "Checking permissions...", center: true, fullHeight: true }));
    }
    if (!(auth === null || auth === void 0 ? void 0 : auth.user)) {
        // Redirect to login if not authenticated
        return _jsx(Navigate, { to: "/auth", state: { from: location }, replace: true });
    }
    if (!isAdmin) {
        // Redirect to dashboard if authenticated but not admin
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default AdminRoute;
