import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InviteUserDialog } from "./InviteUserDialog";
import { useBreakpoint } from "@/hooks/use-mobile";
export const UserManagementHeader = ({ companies, loadingCompanies, onUserAdded, }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    return (_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8", children: [_jsxs("div", { className: "w-full sm:w-auto", children: [_jsx("h1", { className: `${isMobileView ? "text-xl" : "text-2xl sm:text-3xl"} font-bold text-white`, children: "User Management" }), _jsx("p", { className: "text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base", children: "Manage user accounts and permissions" })] }), _jsx("div", { className: `${isMobileView ? "w-full" : "w-auto"}`, children: _jsx(InviteUserDialog, { companies: companies, loadingCompanies: loadingCompanies, onSuccess: onUserAdded }) })] }));
};
