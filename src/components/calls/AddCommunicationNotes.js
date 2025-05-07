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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications } from "@/hooks/useCommunications";
import { Loader2 } from "lucide-react";
export default function AddCommunicationNotes({ open, onOpenChange, communicationId, existingNotes = "", }) {
    const [notes, setNotes] = useState(existingNotes);
    const [transcript, setTranscript] = useState("");
    const [generatingAiSummary, setGeneratingAiSummary] = useState(false);
    const { updateCommunicationStatus, generateAISummary } = useCommunications();
    const handleSave = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateCommunicationStatus(communicationId, "completed", notes);
            onOpenChange(false);
        }
        catch (error) {
            console.error("Error saving notes:", error);
        }
    });
    const handleGenerateAISummary = () => __awaiter(this, void 0, void 0, function* () {
        if (!transcript.trim())
            return;
        setGeneratingAiSummary(true);
        try {
            const result = yield generateAISummary(communicationId, transcript);
            if (result.summary) {
                setNotes((prev) => `${prev ? prev + "\n\n" : ""}AI Summary: ${result.summary}`);
            }
        }
        catch (error) {
            console.error("Error generating AI summary:", error);
        }
        finally {
            setGeneratingAiSummary(false);
        }
    });
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-lg", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add Communication Notes" }), _jsx(DialogDescription, { children: "Add notes from your communication or generate an AI summary from a transcript." })] }), _jsxs("div", { className: "space-y-4 my-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "notes", className: "text-sm font-medium mb-2 block", children: "Notes" }), _jsx(Textarea, { id: "notes", value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Enter your notes about this communication...", rows: 5 })] }), _jsxs("div", { className: "border-t pt-4", children: [_jsx("label", { htmlFor: "transcript", className: "text-sm font-medium mb-2 block", children: "Meeting Transcript (optional)" }), _jsx(Textarea, { id: "transcript", value: transcript, onChange: (e) => setTranscript(e.target.value), placeholder: "Paste your call transcript here to generate an AI summary...", rows: 5, className: "mb-2" }), _jsx(Button, { variant: "outline", disabled: !transcript.trim() || generatingAiSummary, onClick: handleGenerateAISummary, children: generatingAiSummary ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Generating..."] })) : ("Generate AI Summary") })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { onClick: handleSave, children: "Save Notes" })] })] }) }));
}
