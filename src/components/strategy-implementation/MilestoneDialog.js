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
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createMilestone, updateMilestone, deleteMilestone, } from "@/utils/strategyImplementation/implementationUtils";
const MilestoneDialog = ({ isOpen, onClose, strategyId, milestone, onSave, onDelete, }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("not_started");
    const [dueDate, setDueDate] = useState(new Date());
    const [progress, setProgress] = useState(0);
    const [owner, setOwner] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Set form values when milestone changes
    useEffect(() => {
        if (milestone) {
            setTitle(milestone.title);
            setDescription(milestone.description || "");
            setStatus(milestone.status);
            setDueDate(new Date(milestone.dueDate));
            setProgress(milestone.progress);
            setOwner(milestone.owner || "");
            setNotes(milestone.notes || "");
        }
        else {
            // Default values for new milestone
            setTitle("");
            setDescription("");
            setStatus("not_started");
            setDueDate(new Date());
            setProgress(0);
            setOwner("");
            setNotes("");
        }
    }, [milestone]);
    const handleSave = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!title.trim())
            return;
        setIsSubmitting(true);
        try {
            const milestoneData = {
                strategyId,
                title,
                description,
                status,
                dueDate: dueDate.toISOString(),
                progress,
                owner,
                notes,
            };
            let savedMilestone;
            if (milestone) {
                // Update existing milestone
                yield updateMilestone(milestone.id, milestoneData);
                savedMilestone = Object.assign(Object.assign({}, milestone), milestoneData);
            }
            else {
                // Create new milestone
                savedMilestone = yield createMilestone(milestoneData);
            }
            if (savedMilestone) {
                onSave(savedMilestone);
            }
        }
        catch (error) {
            console.error("Error saving milestone:", error);
        }
        finally {
            setIsSubmitting(false);
        }
    });
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!milestone)
            return;
        setIsSubmitting(true);
        try {
            yield deleteMilestone(milestone.id);
            onDelete(milestone.id);
            onClose();
        }
        catch (error) {
            console.error("Error deleting milestone:", error);
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (_jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: milestone ? "Edit Milestone" : "Add New Milestone" }) }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "title", children: "Title" }), _jsx(Input, { id: "title", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Milestone title" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Describe this milestone...", rows: 3 })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "status", children: "Status" }), _jsxs(Select, { value: status, onValueChange: (value) => setStatus(value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "not_started", children: "Not Started" }), _jsx(SelectItem, { value: "in_progress", children: "In Progress" }), _jsx(SelectItem, { value: "completed", children: "Completed" }), _jsx(SelectItem, { value: "delayed", children: "Delayed" })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Due Date" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn("justify-start text-left font-normal", !dueDate && "text-muted-foreground"), children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), dueDate ? format(dueDate, "PPP") : "Select date"] }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: dueDate, onSelect: (date) => date && setDueDate(date), initialFocus: true }) })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx("div", { className: "flex justify-between", children: _jsxs(Label, { htmlFor: "progress", children: ["Progress (", progress, "%)"] }) }), _jsx(Slider, { id: "progress", min: 0, max: 100, step: 5, value: [progress], onValueChange: (values) => setProgress(values[0]) })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "owner", children: "Owner" }), _jsx(Input, { id: "owner", value: owner, onChange: (e) => setOwner(e.target.value), placeholder: "Responsible person" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "notes", children: "Notes" }), _jsx(Textarea, { id: "notes", value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Additional notes...", rows: 2 })] })] }), _jsxs(DialogFooter, { className: "flex items-center justify-between", children: [milestone && (_jsxs(Button, { variant: "destructive", onClick: handleDelete, disabled: isSubmitting, children: [isSubmitting ? (_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" })) : null, "Delete"] })), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", onClick: onClose, disabled: isSubmitting, children: "Cancel" }), _jsxs(Button, { onClick: handleSave, disabled: isSubmitting || !title.trim(), children: [isSubmitting ? (_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" })) : null, "Save"] })] })] })] }) }));
};
export default MilestoneDialog;
