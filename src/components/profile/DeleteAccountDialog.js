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
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { deleteUserAccount } from "@/utils/accountDeletion";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
const DeleteAccountDialog = () => {
    const [isInitialDialogOpen, setIsInitialDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const handleDeleteAccount = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsDeleting(true);
        try {
            const result = yield deleteUserAccount();
            if (result.success) {
                yield signOut();
                toast.success("Your account has been deleted");
                // If there was a partial deletion warning, show it
                if (result.error) {
                    toast.warning(result.error);
                }
                // Redirect to home page after account deletion
                navigate("/");
            }
            else {
                toast.error(`Failed to delete account: ${result.error}`);
                setIsConfirmDialogOpen(false);
                setIsInitialDialogOpen(false);
            }
        }
        catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        }
        finally {
            setIsDeleting(false);
        }
    });
    const handleFirstStep = () => {
        setIsInitialDialogOpen(false);
        setIsConfirmDialogOpen(true);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(AlertDialog, { open: isInitialDialogOpen, onOpenChange: setIsInitialDialogOpen, children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "destructive", className: "mt-8", children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Delete Account"] }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you sure you want to delete your account?" }), _jsx(AlertDialogDescription, { children: "This action will permanently delete your account and all associated data. This action cannot be undone." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { className: cn(buttonVariants({ variant: "destructive" })), onClick: handleFirstStep, children: "Continue to Deletion" })] })] })] }), _jsx(Dialog, { open: isConfirmDialogOpen, onOpenChange: setIsConfirmDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-destructive", children: "Final confirmation required" }), _jsxs(DialogDescription, { children: ["Please type ", _jsx("strong", { children: "DELETE" }), " to confirm that you understand this action is permanent and cannot be undone. All your data, including profile information, company data (if you're the last admin), and account settings will be permanently deleted."] })] }), _jsxs("div", { className: "space-y-2 py-4", children: [_jsx(Label, { htmlFor: "confirmText", className: "text-destructive", children: "Type DELETE to confirm:" }), _jsx(Input, { id: "confirmText", value: confirmText, onChange: (e) => setConfirmText(e.target.value), placeholder: "DELETE" })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsConfirmDialogOpen(false), children: "Cancel" }), _jsx(Button, { variant: "destructive", onClick: handleDeleteAccount, disabled: confirmText !== "DELETE" || isDeleting, children: isDeleting ? "Deleting..." : "Permanently Delete Account" })] })] }) })] }));
};
export default DeleteAccountDialog;
