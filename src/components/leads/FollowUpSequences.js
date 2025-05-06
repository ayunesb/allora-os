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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Loader2, Plus, Save, Clock, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
const predefinedSequences = [
    {
        id: "1",
        name: "New Lead Nurturing",
        description: "A sequence for new leads to introduce your company and services",
        aiGenerated: true,
        targetAudience: "new",
        steps: [
            {
                id: "1-1",
                content: "Thank you for your interest in our services. Here's more information about how we can help your business.",
                delayDays: 0,
                type: "email",
            },
            {
                id: "1-2",
                content: "Following up on our previous email. Would you be interested in scheduling a quick call to discuss your needs?",
                delayDays: 3,
                type: "email",
            },
            {
                id: "1-3",
                content: "Schedule a phone call to discuss their requirements and how our services can address their needs.",
                delayDays: 5,
                type: "call",
            },
            {
                id: "1-4",
                content: "Send a personalized proposal based on the previous call discussion.",
                delayDays: 7,
                type: "email",
            },
        ],
    },
    {
        id: "2",
        name: "Proposal Follow-Up",
        description: "A sequence for following up after sending a proposal",
        aiGenerated: true,
        targetAudience: "proposal",
        steps: [
            {
                id: "2-1",
                content: "I wanted to check if you had a chance to review the proposal I sent. Would you like to discuss any specific details?",
                delayDays: 2,
                type: "email",
            },
            {
                id: "2-2",
                content: "Follow up with a phone call to address any questions about the proposal.",
                delayDays: 4,
                type: "call",
            },
            {
                id: "2-3",
                content: "Send case studies of similar clients who have achieved great results with our services.",
                delayDays: 7,
                type: "email",
            },
            {
                id: "2-4",
                content: "Final follow-up with a special offer or incentive to make a decision.",
                delayDays: 10,
                type: "email",
            },
        ],
    },
    {
        id: "3",
        name: "Re-engagement Campaign",
        description: "A sequence for re-engaging cold leads",
        aiGenerated: true,
        targetAudience: "cold",
        steps: [
            {
                id: "3-1",
                content: "We haven't connected in a while. I thought you might be interested in our latest industry report.",
                delayDays: 0,
                type: "email",
            },
            {
                id: "3-2",
                content: "Following up on the industry report. Did you find the insights valuable for your business?",
                delayDays: 5,
                type: "email",
            },
            {
                id: "3-3",
                content: "Invitation to an upcoming webinar on industry trends and strategies.",
                delayDays: 10,
                type: "email",
            },
            {
                id: "3-4",
                content: "Schedule a reassessment call to understand current needs and challenges.",
                delayDays: 15,
                type: "call",
            },
        ],
    },
];
export const FollowUpSequences = ({ lead, onApply }) => {
    const [activeTab, setActiveTab] = useState("predefined");
    const [sequences, setSequences] = useState(predefinedSequences);
    const [generating, setGenerating] = useState(false);
    const [newSequence, setNewSequence] = useState({
        name: "",
        description: "",
        steps: [],
        aiGenerated: false,
        targetAudience: "new",
    });
    const [isEditing, setIsEditing] = useState(false);
    const generateAISequence = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setGenerating(true);
            // This would normally call an AI service to generate a sequence
            // For demo purposes, we'll simulate a delay and return a predefined sequence
            yield new Promise((resolve) => setTimeout(resolve, 2000));
            const newAISequence = {
                id: `ai-${Date.now()}`,
                name: `AI Generated Sequence for ${(lead === null || lead === void 0 ? void 0 : lead.status) || "Leads"}`,
                description: `Personalized follow-up sequence for ${(lead === null || lead === void 0 ? void 0 : lead.name) || "leads"} based on their profile and status`,
                aiGenerated: true,
                targetAudience: (lead === null || lead === void 0 ? void 0 : lead.status) || "new",
                steps: [
                    {
                        id: `ai-${Date.now()}-1`,
                        content: "AI generated first contact message tailored to the lead's industry and needs.",
                        delayDays: 0,
                        type: "email",
                    },
                    {
                        id: `ai-${Date.now()}-2`,
                        content: "AI generated follow-up message addressing specific pain points and offering solutions.",
                        delayDays: 3,
                        type: "email",
                    },
                    {
                        id: `ai-${Date.now()}-3`,
                        content: "AI recommended phone call to discuss personalized solution options.",
                        delayDays: 5,
                        type: "call",
                    },
                    {
                        id: `ai-${Date.now()}-4`,
                        content: "AI generated message with custom resources and next steps.",
                        delayDays: 7,
                        type: "email",
                    },
                ],
            };
            setSequences((prev) => [...prev, newAISequence]);
            toast.success("AI sequence generated successfully");
            setActiveTab("custom");
        }
        catch (error) {
            toast.error(`Failed to generate sequence: ${error.message}`);
        }
        finally {
            setGenerating(false);
        }
    });
    const handleAddStep = () => {
        const newStep = {
            id: `new-${Date.now()}`,
            content: "",
            delayDays: 1,
            type: "email",
        };
        setNewSequence((prev) => (Object.assign(Object.assign({}, prev), { steps: [...(prev.steps || []), newStep] })));
    };
    const handleRemoveStep = (stepId) => {
        setNewSequence((prev) => (Object.assign(Object.assign({}, prev), { steps: (prev.steps || []).filter((step) => step.id !== stepId) })));
    };
    const handleUpdateStep = (stepId, field, value) => {
        setNewSequence((prev) => (Object.assign(Object.assign({}, prev), { steps: (prev.steps || []).map((step) => step.id === stepId ? Object.assign(Object.assign({}, step), { [field]: value }) : step) })));
    };
    const handleSaveSequence = () => {
        if (!newSequence.name) {
            toast.error("Please enter a name for the sequence");
            return;
        }
        if (!(newSequence.steps || []).length) {
            toast.error("Please add at least one step to the sequence");
            return;
        }
        const completeSequence = {
            id: `custom-${Date.now()}`,
            name: newSequence.name || "Custom Sequence",
            description: newSequence.description || "",
            steps: newSequence.steps || [],
            aiGenerated: false,
            targetAudience: newSequence.targetAudience || "new",
        };
        setSequences((prev) => [...prev, completeSequence]);
        setNewSequence({
            name: "",
            description: "",
            steps: [],
            aiGenerated: false,
            targetAudience: "new",
        });
        toast.success("Sequence saved successfully");
        setIsEditing(false);
    };
    const handleApplySequence = (sequenceId) => {
        // In a real application, this would apply the sequence to the selected lead
        if (onApply) {
            onApply(sequenceId);
        }
        toast.success("Follow-up sequence applied successfully");
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Follow-Up Sequences" }), _jsx(CardDescription, { children: "Create and manage automated follow-up sequences for your leads" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "predefined", children: "Predefined Sequences" }), _jsx(TabsTrigger, { value: "custom", children: "Custom Sequences" }), _jsx(TabsTrigger, { value: "create", children: "Create New" })] }), _jsxs(TabsContent, { value: "predefined", className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-medium", children: "AI-Generated Templates" }), lead && (_jsx(Button, { onClick: generateAISequence, disabled: generating, size: "sm", children: generating ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Generating..."] })) : (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "mr-2 h-4 w-4" }), "Generate for ", lead.name] })) }))] }), _jsx("div", { className: "space-y-4", children: sequences
                                        .filter((seq) => seq.aiGenerated)
                                        .map((sequence) => (_jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsxs("h4", { className: "font-medium flex items-center", children: [sequence.name, sequence.aiGenerated && (_jsx("span", { className: "ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full", children: "AI Generated" }))] }), _jsx("p", { className: "text-sm text-muted-foreground", children: sequence.description }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: ["Target:", " ", _jsx("span", { className: "font-medium capitalize", children: sequence.targetAudience }), " ", "leads"] })] }), _jsx(Button, { variant: "secondary", size: "sm", onClick: () => handleApplySequence(sequence.id), children: "Apply" })] }), _jsx("div", { className: "space-y-2 mt-4", children: sequence.steps.map((step, index) => (_jsxs("div", { className: "flex items-start gap-3 p-2 rounded-md bg-muted/50", children: [_jsx("div", { className: "min-w-[30px] h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium", children: index + 1 }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm", children: step.content }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs("span", { className: "text-xs flex items-center text-muted-foreground", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), step.delayDays === 0
                                                                                    ? "Immediately"
                                                                                    : `After ${step.delayDays} day${step.delayDays > 1 ? "s" : ""}`] }), _jsx("span", { className: "text-xs capitalize bg-muted px-1.5 py-0.5 rounded text-muted-foreground", children: step.type })] })] })] }, step.id))) })] }, sequence.id))) })] }), _jsxs(TabsContent, { value: "custom", className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-medium", children: "Your Custom Sequences" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
                                                setIsEditing(true);
                                                setActiveTab("create");
                                            }, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create New"] })] }), _jsxs("div", { className: "space-y-4", children: [sequences
                                            .filter((seq) => !seq.aiGenerated)
                                            .map((sequence) => (_jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: sequence.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: sequence.description }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: ["Target:", " ", _jsx("span", { className: "font-medium capitalize", children: sequence.targetAudience }), " ", "leads"] })] }), _jsx(Button, { variant: "secondary", size: "sm", onClick: () => handleApplySequence(sequence.id), children: "Apply" })] }), _jsx("div", { className: "space-y-2 mt-4", children: sequence.steps.map((step, index) => (_jsxs("div", { className: "flex items-start gap-3 p-2 rounded-md bg-muted/50", children: [_jsx("div", { className: "min-w-[30px] h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium", children: index + 1 }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm", children: step.content }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs("span", { className: "text-xs flex items-center text-muted-foreground", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), step.delayDays === 0
                                                                                        ? "Immediately"
                                                                                        : `After ${step.delayDays} day${step.delayDays > 1 ? "s" : ""}`] }), _jsx("span", { className: "text-xs capitalize bg-muted px-1.5 py-0.5 rounded text-muted-foreground", children: step.type })] })] })] }, step.id))) })] }, sequence.id))), sequences.filter((seq) => !seq.aiGenerated).length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center py-8 px-4 border rounded-md bg-muted/20", children: [_jsx("p", { className: "text-muted-foreground mb-2", children: "You haven't created any custom sequences yet" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
                                                        setIsEditing(true);
                                                        setActiveTab("create");
                                                    }, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Your First Sequence"] })] }))] })] }), _jsx(TabsContent, { value: "create", className: "space-y-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sequence-name", children: "Sequence Name" }), _jsx(Input, { id: "sequence-name", placeholder: "e.g., Product Demo Follow-Up", value: newSequence.name, onChange: (e) => setNewSequence((prev) => (Object.assign(Object.assign({}, prev), { name: e.target.value }))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sequence-description", children: "Description" }), _jsx(Textarea, { id: "sequence-description", placeholder: "Describe what this sequence is for", value: newSequence.description, onChange: (e) => setNewSequence((prev) => (Object.assign(Object.assign({}, prev), { description: e.target.value }))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "target-audience", children: "Target Audience" }), _jsxs(Select, { value: newSequence.targetAudience, onValueChange: (value) => setNewSequence((prev) => (Object.assign(Object.assign({}, prev), { targetAudience: value }))), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select lead status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "new", children: "New Leads" }), _jsx(SelectItem, { value: "contacted", children: "Contacted Leads" }), _jsx(SelectItem, { value: "qualified", children: "Qualified Leads" }), _jsx(SelectItem, { value: "proposal", children: "Proposal Sent" }), _jsx(SelectItem, { value: "negotiation", children: "In Negotiation" }), _jsx(SelectItem, { value: "cold", children: "Cold Leads" })] })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Label, { children: "Sequence Steps" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleAddStep, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add Step"] })] }), (newSequence.steps || []).length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-8 px-4 border rounded-md bg-muted/20", children: [_jsx("p", { className: "text-muted-foreground mb-2", children: "No steps added yet" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleAddStep, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add Your First Step"] })] })) : (_jsx("div", { className: "space-y-4", children: (newSequence.steps || []).map((step, index) => (_jsxs("div", { className: "border rounded-md p-4 space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("h4", { className: "font-medium", children: ["Step ", index + 1] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleRemoveStep(step.id), children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `step-type-${step.id}`, children: "Type" }), _jsxs(Select, { value: step.type, onValueChange: (value) => handleUpdateStep(step.id, "type", value), children: [_jsx(SelectTrigger, { id: `step-type-${step.id}`, children: _jsx(SelectValue, { placeholder: "Select step type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "email", children: "Email" }), _jsx(SelectItem, { value: "call", children: "Phone Call" }), _jsx(SelectItem, { value: "message", children: "Message" }), _jsx(SelectItem, { value: "task", children: "Task" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `step-content-${step.id}`, children: "Content" }), _jsx(Textarea, { id: `step-content-${step.id}`, placeholder: "Enter the content or description of this step", value: step.content, onChange: (e) => handleUpdateStep(step.id, "content", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `step-delay-${step.id}`, children: "Delay (days)" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { id: `step-delay-${step.id}`, type: "number", min: "0", value: step.delayDays, onChange: (e) => handleUpdateStep(step.id, "delayDays", parseInt(e.target.value)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: step.delayDays === 0
                                                                                        ? "Immediately"
                                                                                        : step.delayDays === 1
                                                                                            ? "After 1 day"
                                                                                            : `After ${step.delayDays} days` })] })] })] })] }, step.id))) }))] }), _jsxs("div", { className: "flex justify-end gap-2 pt-4", children: [_jsx(Button, { variant: "outline", onClick: () => {
                                                    setNewSequence({
                                                        name: "",
                                                        description: "",
                                                        steps: [],
                                                        aiGenerated: false,
                                                        targetAudience: "new",
                                                    });
                                                    setIsEditing(false);
                                                    setActiveTab("custom");
                                                }, children: "Cancel" }), _jsxs(Button, { onClick: handleSaveSequence, children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Save Sequence"] })] })] }) })] }) })] }));
};
