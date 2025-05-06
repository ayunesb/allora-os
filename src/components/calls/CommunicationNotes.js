var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, X, Pencil, Check, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
export default function CommunicationNotes({ communications, isLoading, onClose, communicationId, }) {
    const [activeTab, setActiveTab] = useState("summaries");
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [noteContent, setNoteContent] = useState("");
    const [saving, setSaving] = useState(false);
    // If communicationId is provided, filter the communications to show only the selected one
    const filteredCommunications = communicationId
        ? communications.filter((comm) => comm.id === communicationId)
        : communications;
    const handleEditNote = (communication) => {
        setEditingNoteId(communication.id);
        setNoteContent(communication.notes || "");
    };
    const handleSaveNote = () => __awaiter(this, void 0, void 0, function* () {
        if (!editingNoteId)
            return;
        setSaving(true);
        // Simulate API call to save note
        try {
            yield new Promise((resolve) => setTimeout(resolve, 800));
            // In a real app, this would save to the database
            toast.success("Note saved successfully");
            setEditingNoteId(null);
        }
        catch (error) {
            toast.error("Failed to save note");
            console.error("Error saving note:", error);
        }
        finally {
            setSaving(false);
        }
    });
    const handleCancelEdit = () => {
        setEditingNoteId(null);
        setNoteContent("");
    };
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(Skeleton, { className: "h-6 w-48" }), _jsx(Skeleton, { className: "h-4 w-72" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-32 w-full" }), _jsx(Skeleton, { className: "h-32 w-full" })] })] }));
    }
    if (communicationId && filteredCommunications.length === 0) {
        return (_jsx(Dialog, { open: true, onOpenChange: () => onClose && onClose(), children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Communication Details" }), _jsx(DialogDescription, { children: "Could not find the communication you're looking for." })] }), _jsx(DialogFooter, { children: _jsx(DialogClose, { asChild: true, children: _jsx(Button, { children: "Close" }) }) })] }) }));
    }
    // If we're using this as a modal for a specific communication
    if (communicationId) {
        const communication = filteredCommunications[0];
        return (_jsx(Dialog, { open: true, onOpenChange: () => onClose && onClose(), children: _jsxs(DialogContent, { className: "max-w-xl", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-5 w-5" }), "Communication Notes"] }), _jsxs(DialogDescription, { children: [communication.type.charAt(0).toUpperCase() +
                                        communication.type.slice(1), " ", "on ", new Date(communication.created_at).toLocaleDateString()] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid grid-cols-2 mb-4", children: [_jsx(TabsTrigger, { value: "notes", children: "Manual Notes" }), _jsx(TabsTrigger, { value: "summaries", children: "AI Summary" })] }), _jsx(TabsContent, { value: "notes", className: "space-y-4", children: editingNoteId === communication.id ? (_jsxs("div", { className: "space-y-2", children: [_jsx(Textarea, { value: noteContent, onChange: (e) => setNoteContent(e.target.value), placeholder: "Enter your notes...", className: "min-h-[150px]" }), _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: handleCancelEdit, disabled: saving, children: [_jsx(X, { className: "h-4 w-4 mr-1" }), "Cancel"] }), _jsxs(Button, { size: "sm", onClick: handleSaveNote, disabled: saving, children: [saving ? (_jsx(Loader2, { className: "h-4 w-4 mr-1 animate-spin" })) : (_jsx(Check, { className: "h-4 w-4 mr-1" })), "Save"] })] })] })) : (_jsx("div", { children: communication.notes ? (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "border rounded-md p-3 bg-muted/50", children: _jsx("p", { className: "whitespace-pre-wrap", children: communication.notes }) }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleEditNote(communication), className: "mt-2", children: [_jsx(Pencil, { className: "h-4 w-4 mr-1" }), "Edit Note"] })] })) : (_jsxs("div", { className: "text-center py-8 border rounded-md border-dashed", children: [_jsx("p", { className: "text-muted-foreground mb-4", children: "No notes have been added yet" }), _jsxs(Button, { variant: "outline", onClick: () => handleEditNote(communication), children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), "Add Note"] })] })) })) }), _jsx(TabsContent, { value: "summaries", children: communication.ai_summary ? (_jsx("div", { className: "border rounded-md p-3 bg-muted/50", children: _jsx("p", { className: "whitespace-pre-wrap", children: communication.ai_summary }) })) : (_jsxs("div", { className: "text-center py-8 border rounded-md border-dashed", children: [_jsx("p", { className: "text-muted-foreground mb-4", children: "No AI summary available" }), _jsxs(Button, { variant: "outline", disabled: true, children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Generate Summary"] })] })) })] }), _jsx(DialogFooter, { children: _jsx(DialogClose, { asChild: true, children: _jsx(Button, { children: "Close" }) }) })] }) }));
    }
    // Default display for the main page
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-5 w-5" }), "Communication Notes & Summaries"] }), _jsx(CardDescription, { children: "Manual notes and AI-generated summaries from your calls and meetings" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "summaries", children: [_jsxs(TabsList, { className: "grid grid-cols-2 mb-4", children: [_jsx(TabsTrigger, { value: "notes", children: "Manual Notes" }), _jsx(TabsTrigger, { value: "summaries", children: "AI Summaries" })] }), _jsx(TabsContent, { value: "notes", className: "space-y-4", children: filteredCommunications.length === 0 ? (_jsx("div", { className: "text-center py-8 border rounded-md border-dashed", children: _jsx("p", { className: "text-muted-foreground", children: "No communications with notes found" }) })) : (filteredCommunications
                                .filter((comm) => comm.notes)
                                .slice(0, 3)
                                .map((comm) => {
                                var _a;
                                return (_jsxs("div", { className: "border rounded-md p-4 space-y-2", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("h3", { className: "font-medium capitalize", children: [comm.type, " with ", ((_a = comm.leads) === null || _a === void 0 ? void 0 : _a.name) || "Unknown"] }), _jsx("span", { className: "text-xs text-muted-foreground", children: new Date(comm.created_at).toLocaleDateString() })] }), _jsx("p", { className: "text-sm whitespace-pre-wrap", children: comm.notes })] }, comm.id));
                            })) }), _jsx(TabsContent, { value: "summaries", className: "space-y-4", children: filteredCommunications.length === 0 ? (_jsx("div", { className: "text-center py-8 border rounded-md border-dashed", children: _jsx("p", { className: "text-muted-foreground", children: "No communications with AI summaries found" }) })) : (filteredCommunications
                                .filter((comm) => comm.ai_summary)
                                .slice(0, 3)
                                .map((comm) => {
                                var _a;
                                return (_jsxs("div", { className: "border rounded-md p-4 space-y-2", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("h3", { className: "font-medium capitalize", children: [comm.type, " with ", ((_a = comm.leads) === null || _a === void 0 ? void 0 : _a.name) || "Unknown"] }), _jsx("span", { className: "text-xs text-muted-foreground", children: new Date(comm.created_at).toLocaleDateString() })] }), _jsx("p", { className: "text-sm whitespace-pre-wrap", children: comm.ai_summary })] }, comm.id));
                            })) })] }) }), _jsx(CardFooter, { className: "border-t pt-4", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "AI summaries are automatically generated after Zoom calls and WhatsApp chats. You can also add your own notes to any communication." }) })] }));
}
