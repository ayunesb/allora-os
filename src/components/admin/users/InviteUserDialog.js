var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";
import { inviteUserToCompany } from "@/utils/users"; // Import directly from users module
import { toast } from "sonner";
import { useBreakpoint } from "@/hooks/use-mobile";
export const InviteUserDialog = ({ companies, loadingCompanies, onSuccess, }) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [company, setCompany] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const handleInviteUser = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!email) {
            toast.error("Email is required");
            return;
        }
        if (!company) {
            toast.error("Please select a company");
            return;
        }
        setIsSubmitting(true);
        try {
            const success = yield inviteUserToCompany(email, company, role);
            if (success) {
                toast.success("User invitation sent successfully");
                setOpen(false);
                setEmail("");
                setRole("user");
                onSuccess();
            }
        }
        catch (error) {
            console.error("Error inviting user:", error);
            toast.error("Failed to send invitation");
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: `${isMobileView ? "w-full" : ""} bg-[#5A67D8] hover:bg-[#4C5BC7] text-white`, children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), "Add New User"] }) }), _jsxs(DialogContent, { className: `${isMobileView ? "w-[calc(100%-32px)] p-4" : "sm:max-w-md"} bg-[#1A1F2C] text-white border-white/10`, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Invite New User" }), _jsx(DialogDescription, { className: "text-gray-400", children: "Send an invitation email to add a new user to the platform." })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-gray-300", children: "Email Address" }), _jsx(Input, { id: "email", placeholder: "user@example.com", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full bg-[#0F1729] border-white/10 text-white" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "company", className: "text-gray-300", children: "Company" }), _jsxs(Select, { value: company, onValueChange: setCompany, disabled: loadingCompanies, children: [_jsx(SelectTrigger, { className: "w-full bg-[#0F1729] border-white/10 text-white", children: _jsx(SelectValue, { placeholder: loadingCompanies ? "Loading companies..." : "Select company" }) }), _jsxs(SelectContent, { className: "bg-[#1A1F2C] border-white/10 text-white", children: [companies.map((company) => (_jsx(SelectItem, { value: company.id, children: company.name }, company.id))), companies.length === 0 && !loadingCompanies && (_jsx(SelectItem, { value: "no-companies", disabled: true, children: "No companies available" }))] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "role", className: "text-gray-300", children: "User Role" }), _jsxs(Select, { value: role, onValueChange: (value) => setRole(value), children: [_jsx(SelectTrigger, { className: "w-full bg-[#0F1729] border-white/10 text-white", children: _jsx(SelectValue, { placeholder: "Select role" }) }), _jsxs(SelectContent, { className: "bg-[#1A1F2C] border-white/10 text-white", children: [_jsx(SelectItem, { value: "user", children: "User" }), _jsx(SelectItem, { value: "admin", children: "Admin" })] })] })] })] }), _jsx(DialogFooter, { className: isMobileView ? "flex-col space-y-2" : "", children: _jsx(Button, { type: "submit", onClick: handleInviteUser, disabled: isSubmitting || !email || !company, className: `${isMobileView ? "w-full" : "w-full sm:w-auto"} bg-[#5A67D8] hover:bg-[#4C5BC7] text-white`, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Sending..."] })) : ("Send Invitation") }) })] })] }));
};
