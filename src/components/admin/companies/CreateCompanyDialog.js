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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
export function CreateCompanyDialog({ open, onOpenChange, onCreateCompany }) {
    const [newCompany, setNewCompany] = useState({
        name: "",
        industry: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleCreateCompany = () => __awaiter(this, void 0, void 0, function* () {
        if (!newCompany.name) {
            return;
        }
        setIsSubmitting(true);
        try {
            yield onCreateCompany(newCompany);
            // Reset form after successful creation
            setNewCompany({
                name: "",
                industry: "",
            });
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Create New Company" }) }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Company Name*" }), _jsx(Input, { id: "name", value: newCompany.name, onChange: (e) => setNewCompany(Object.assign(Object.assign({}, newCompany), { name: e.target.value })), placeholder: "Acme Inc." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "industry", children: "Industry" }), _jsx(Input, { id: "industry", value: newCompany.industry, onChange: (e) => setNewCompany(Object.assign(Object.assign({}, newCompany), { industry: e.target.value })), placeholder: "Technology" })] })] }), _jsx(DialogFooter, { children: _jsx(Button, { onClick: handleCreateCompany, disabled: isSubmitting || !newCompany.name, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Creating..."] })) : ("Create Company") }) })] }) }));
}
