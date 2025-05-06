var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { Settings, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIModelPreferences from "./preferences/AIModelPreferences";
import ResponseStylePreferences from "./preferences/ResponseStylePreferences";
import LearningPreferences from "./preferences/LearningPreferences";
import { motion } from "framer-motion";
import { toast } from "sonner";
export default function UserPreferencesDialog({ triggerLabel, triggerVariant, }) {
    const [open, setOpen] = useState(false);
    const { preferences, isLoading, savePreferences, updatePreference, resetPreferences, } = useUserPreferences();
    const [isSaving, setIsSaving] = useState(false);
    // Create a wrapper function that conforms to the expected type
    const handleUpdatePreference = (key, value) => {
        // Cast the key to any to bypass TypeScript's type checking
        updatePreference(key, value);
    };
    const handleSave = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setIsSaving(true);
            yield savePreferences(preferences);
            toast.success("Preferences saved successfully!");
            setOpen(false);
        }
        catch (error) {
            toast.error("Failed to save preferences");
            console.error("Error saving preferences:", error);
        }
        finally {
            setIsSaving(false);
        }
    });
    const handleCancel = () => {
        setOpen(false);
    };
    const handleReset = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setIsSaving(true);
            yield resetPreferences();
            toast.success("Preferences reset to defaults");
            setOpen(false);
        }
        catch (error) {
            toast.error("Failed to reset preferences");
        }
        finally {
            setIsSaving(false);
        }
    });
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(motion.div, { whileTap: { scale: 0.97 }, transition: { duration: 0.1 }, children: _jsx(Button, { variant: triggerVariant || "outline", className: "flex items-center gap-2", children: triggerLabel || (_jsxs(_Fragment, { children: [_jsx(Settings, { className: "h-4 w-4" }), "Preferences"] })) }) }) }), _jsxs(DialogContent, { className: "max-w-2xl", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "AI Response Preferences" }) }), _jsxs(Tabs, { defaultValue: "models", className: "mt-4", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "models", className: "min-h-10", children: "AI Models" }), _jsx(TabsTrigger, { value: "style", className: "min-h-10", children: "Response Style" }), _jsx(TabsTrigger, { value: "learning", className: "min-h-10", children: "Learning" })] }), _jsx(TabsContent, { value: "models", children: _jsx(AIModelPreferences, { preferences: preferences, updatePreference: handleUpdatePreference }) }), _jsx(TabsContent, { value: "style", children: _jsx(ResponseStylePreferences, { preferences: preferences, updatePreference: handleUpdatePreference }) }), _jsx(TabsContent, { value: "learning", children: _jsx(LearningPreferences, { preferences: preferences, updatePreference: handleUpdatePreference }) })] }), _jsxs(DialogFooter, { className: "mt-6", children: [_jsx(Button, { variant: "outline", onClick: handleCancel, className: "transition-all duration-200 hover:bg-destructive/10", children: "Cancel" }), _jsx(Button, { variant: "outline", onClick: handleReset, disabled: isSaving || isLoading, className: "transition-all duration-200 hover:bg-amber-500/10", children: "Reset Defaults" }), _jsx(Button, { onClick: handleSave, disabled: isSaving || isLoading, className: "min-w-24 relative group", children: isSaving || isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Saving..."] })) : (_jsx(motion.span, { initial: { opacity: 1 }, whileTap: { scale: 0.97 }, transition: { duration: 0.1 }, children: "Save Preferences" })) })] })] })] }));
}
