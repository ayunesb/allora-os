import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Link, Edit, Trash, MoveVertical, PlusSquare, FilePlus, ArrowDown, UserPlus, BarChart, Target, } from "lucide-react";
import { toast } from "sonner";
// Sample data
const DEFAULT_JOURNEY = [
    {
        id: "awareness",
        title: "Awareness",
        description: "Customer becomes aware of a need or problem and discovers your brand",
        touchpoints: [
            {
                id: "social_ad",
                title: "Social Media Ad",
                channel: "Facebook",
                content: "Awareness campaign highlighting industry challenges",
                metrics: ["Impressions", "Reach", "Frequency"],
                status: "active",
            },
            {
                id: "blog_post",
                title: "Blog Post",
                channel: "Website",
                content: "Educational content about industry trends",
                metrics: ["Page Views", "Time on Page", "Bounce Rate"],
                status: "active",
            },
        ],
    },
    {
        id: "consideration",
        title: "Consideration",
        description: "Customer evaluates your solution against alternatives",
        touchpoints: [
            {
                id: "email_nurture",
                title: "Email Sequence",
                channel: "Email",
                content: "Product features and benefits",
                metrics: ["Open Rate", "Click Rate", "Responses"],
                status: "active",
            },
            {
                id: "case_study",
                title: "Case Study",
                channel: "Website",
                content: "Success stories from similar customers",
                metrics: ["Downloads", "Form Fills", "Follow-up Requests"],
                status: "draft",
            },
        ],
    },
    {
        id: "conversion",
        title: "Conversion",
        description: "Customer makes purchase decision",
        touchpoints: [
            {
                id: "sales_call",
                title: "Sales Call",
                channel: "Phone",
                content: "Personalized presentation and proposal",
                metrics: ["Call Duration", "Next Steps", "Close Rate"],
                status: "active",
            },
        ],
    },
    {
        id: "retention",
        title: "Retention",
        description: "Customer continues using your product/service",
        touchpoints: [
            {
                id: "onboarding",
                title: "Onboarding Sequence",
                channel: "Email/In-app",
                content: "Getting started guides and tips",
                metrics: ["Completion Rate", "Feature Adoption", "Support Tickets"],
                status: "active",
            },
        ],
    },
];
export function CustomerJourneyMapper() {
    var _a;
    const [journeyStages, setJourneyStages] = useState(DEFAULT_JOURNEY);
    const [selectedJourney, setSelectedJourney] = useState("default");
    const [activeView, setActiveView] = useState("flow");
    const [editingStage, setEditingStage] = useState(null);
    const [editingTouchpoint, setEditingTouchpoint] = useState(null);
    const [openStageDialog, setOpenStageDialog] = useState(false);
    const [openTouchpointDialog, setOpenTouchpointDialog] = useState(false);
    // Handle stage editing
    const handleAddStage = () => {
        setEditingStage({
            id: "",
            title: "",
            description: "",
            touchpoints: [],
        });
        setOpenStageDialog(true);
    };
    const handleEditStage = (stage) => {
        setEditingStage(Object.assign({}, stage));
        setOpenStageDialog(true);
    };
    const handleSaveStage = (formData) => {
        if (editingStage === null || editingStage === void 0 ? void 0 : editingStage.id) {
            // Update existing stage
            setJourneyStages((prev) => prev.map((stage) => stage.id === editingStage.id ? Object.assign(Object.assign({}, stage), formData) : stage));
            toast.success("Stage updated successfully");
        }
        else {
            // Add new stage
            const newStage = {
                id: `stage_${Date.now()}`,
                title: formData.title,
                description: formData.description,
                touchpoints: [],
            };
            setJourneyStages((prev) => [...prev, newStage]);
            toast.success("New stage added successfully");
        }
        setOpenStageDialog(false);
    };
    // Handle touchpoint editing
    const handleAddTouchpoint = (stageId) => {
        setEditingTouchpoint({
            id: "",
            title: "",
            channel: "",
            content: "",
            metrics: [],
            status: "draft",
        });
        setEditingStage(journeyStages.find((stage) => stage.id === stageId) || null);
        setOpenTouchpointDialog(true);
    };
    const handleEditTouchpoint = (stageId, touchpoint) => {
        setEditingTouchpoint(Object.assign({}, touchpoint));
        setEditingStage(journeyStages.find((stage) => stage.id === stageId) || null);
        setOpenTouchpointDialog(true);
    };
    const handleSaveTouchpoint = (formData) => {
        if (!editingStage)
            return;
        const updatedTouchpoint = {
            id: (editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.id) || `touchpoint_${Date.now()}`,
            title: formData.title,
            channel: formData.channel,
            content: formData.content,
            metrics: formData.metrics.split(",").map((m) => m.trim()),
            status: formData.status,
        };
        if (editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.id) {
            // Update existing touchpoint
            setJourneyStages((prev) => prev.map((stage) => stage.id === editingStage.id
                ? Object.assign(Object.assign({}, stage), { touchpoints: stage.touchpoints.map((tp) => tp.id === updatedTouchpoint.id ? updatedTouchpoint : tp) }) : stage));
            toast.success("Touchpoint updated successfully");
        }
        else {
            // Add new touchpoint
            setJourneyStages((prev) => prev.map((stage) => stage.id === editingStage.id
                ? Object.assign(Object.assign({}, stage), { touchpoints: [...stage.touchpoints, updatedTouchpoint] }) : stage));
            toast.success("New touchpoint added successfully");
        }
        setOpenTouchpointDialog(false);
    };
    const handleDeleteTouchpoint = (stageId, touchpointId) => {
        setJourneyStages((prev) => prev.map((stage) => stage.id === stageId
            ? Object.assign(Object.assign({}, stage), { touchpoints: stage.touchpoints.filter((tp) => tp.id !== touchpointId) }) : stage));
        toast.success("Touchpoint removed");
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Customer Journey Mapper" }), _jsx(CardDescription, { children: "Visualize and optimize your customer's path to purchase" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Select, { value: selectedJourney, onValueChange: setSelectedJourney, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select Journey" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "default", children: "Default Journey" }), _jsx(SelectItem, { value: "b2b_saas", children: "B2B SaaS Journey" }), _jsx(SelectItem, { value: "ecommerce", children: "E-commerce Journey" })] })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => { }, children: [_jsx(FilePlus, { className: "h-4 w-4 mr-1" }), "Export"] })] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsxs(Tabs, { value: activeView, onValueChange: (value) => setActiveView(value), className: "w-full", children: [_jsx("div", { className: "border-b px-6", children: _jsxs(TabsList, { className: "mb-0", children: [_jsx(TabsTrigger, { value: "flow", children: "Journey Flow" }), _jsx(TabsTrigger, { value: "metrics", children: "Journey Metrics" })] }) }), _jsxs("div", { className: "p-6", children: [_jsx(TabsContent, { value: "flow", className: "mt-0", children: _jsxs("div", { className: "grid grid-cols-1 gap-8", children: [journeyStages.map((stage, index) => (_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "flex justify-between items-start bg-muted/30 p-4 rounded-lg mb-2", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center", children: [_jsx("div", { className: "flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full w-6 h-6 mr-2 text-sm", children: index + 1 }), stage.title] }), _jsx("p", { className: "text-sm text-muted-foreground", children: stage.description })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleEditStage(stage), children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleAddTouchpoint(stage.id), children: _jsx(PlusCircle, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-3 pl-8", children: [stage.touchpoints.map((touchpoint) => (_jsx(Card, { className: `relative border-l-4 ${touchpoint.status === "active"
                                                                    ? "border-l-green-500"
                                                                    : touchpoint.status === "draft"
                                                                        ? "border-l-amber-500"
                                                                        : "border-l-red-500"}`, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: touchpoint.title }), _jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [_jsx("span", { className: "bg-muted px-2 py-0.5 rounded text-xs mr-2", children: touchpoint.channel }), touchpoint.content] }), _jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: touchpoint.metrics.map((metric, i) => (_jsx("span", { className: "text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full", children: metric }, i))) })] }), _jsxs("div", { className: "flex space-x-1", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-7 w-7 p-0", onClick: () => handleEditTouchpoint(stage.id, touchpoint), children: _jsx(Edit, { className: "h-3.5 w-3.5" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-7 w-7 p-0", onClick: () => handleDeleteTouchpoint(stage.id, touchpoint.id), children: _jsx(Trash, { className: "h-3.5 w-3.5" }) })] })] }) }) }, touchpoint.id))), stage.touchpoints.length === 0 && (_jsxs(Button, { variant: "outline", className: "border-dashed", onClick: () => handleAddTouchpoint(stage.id), children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), "Add First Touchpoint"] }))] }), index < journeyStages.length - 1 && (_jsx("div", { className: "flex justify-center my-4", children: _jsx(ArrowDown, { className: "h-6 w-6 text-muted-foreground" }) }))] }, stage.id))), _jsxs(Button, { variant: "outline", className: "mt-4 border-dashed", onClick: handleAddStage, children: [_jsx(PlusSquare, { className: "h-4 w-4 mr-2" }), "Add New Stage"] })] }) }), _jsx(TabsContent, { value: "metrics", className: "mt-0", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-base flex items-center", children: [_jsx(Target, { className: "h-4 w-4 mr-2 text-primary" }), "Journey Completion"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold", children: "68%" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Average journey completion rate" }), _jsx("div", { className: "w-full bg-muted rounded-full h-2.5 mt-2", children: _jsx("div", { className: "bg-primary h-2.5 rounded-full", style: { width: "68%" } }) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-base flex items-center", children: [_jsx(MoveVertical, { className: "h-4 w-4 mr-2 text-primary" }), "Conversion Points"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold", children: "12" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Total conversion points across journey" }), _jsxs("div", { className: "flex justify-between mt-2", children: [_jsx("span", { className: "text-xs", children: "Awareness: 3" }), _jsx("span", { className: "text-xs", children: "Consideration: 5" }), _jsx("span", { className: "text-xs", children: "Conversion: 4" })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-base flex items-center", children: [_jsx(UserPlus, { className: "h-4 w-4 mr-2 text-primary" }), "Customer Acquisition"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold", children: "$42" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Average cost per acquisition" }), _jsxs("div", { className: "flex items-center text-green-500 text-xs mt-2", children: [_jsx(ArrowDown, { className: "h-3 w-3 mr-1 rotate-180" }), "12% lower than previous period"] })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(BarChart, { className: "h-5 w-5 mr-2 text-primary" }), "Journey Performance by Stage"] }), _jsx(CardDescription, { children: "Track engagement and conversion metrics across your customer journey" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: journeyStages.map((stage, index) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h3", { className: "font-medium", children: stage.title }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-sm mr-2", children: index === 0
                                                                                            ? "100%"
                                                                                            : index === 1
                                                                                                ? "72%"
                                                                                                : index === 2
                                                                                                    ? "45%"
                                                                                                    : "28%" }), _jsx(Link, { className: "h-4 w-4 text-muted-foreground" })] })] }), _jsx("div", { className: "w-full bg-muted rounded-full h-2.5", children: _jsx("div", { className: "bg-primary h-2.5 rounded-full", style: {
                                                                                width: index === 0
                                                                                    ? "100%"
                                                                                    : index === 1
                                                                                        ? "72%"
                                                                                        : index === 2
                                                                                            ? "45%"
                                                                                            : "28%",
                                                                            } }) }), _jsx("div", { className: "grid grid-cols-3 gap-2 mt-2", children: stage.touchpoints.map((touchpoint) => (_jsxs("div", { className: "text-xs flex justify-between bg-muted/40 p-2 rounded", children: [_jsx("span", { children: touchpoint.title }), _jsx("span", { className: "font-medium", children: touchpoint.status === "active"
                                                                                        ? "+24%"
                                                                                        : touchpoint.status === "draft"
                                                                                            ? "N/A"
                                                                                            : "-5%" })] }, touchpoint.id))) })] }, stage.id))) }) })] })] }) })] })] }) }), _jsx(Dialog, { open: openStageDialog, onOpenChange: setOpenStageDialog, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: (editingStage === null || editingStage === void 0 ? void 0 : editingStage.id) ? "Edit Journey Stage" : "Add Journey Stage" }), _jsx(DialogDescription, { children: "Define a stage in your customer journey" })] }), _jsxs("form", { onSubmit: (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleSaveStage({
                                    title: formData.get("title"),
                                    description: formData.get("description"),
                                });
                            }, children: [_jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "Stage Name" }), _jsx(Input, { id: "title", name: "title", placeholder: "e.g. Awareness, Consideration", defaultValue: (editingStage === null || editingStage === void 0 ? void 0 : editingStage.title) || "", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", name: "description", placeholder: "Describe this stage in the customer journey", defaultValue: (editingStage === null || editingStage === void 0 ? void 0 : editingStage.description) || "", required: true })] })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: (editingStage === null || editingStage === void 0 ? void 0 : editingStage.id) ? "Update Stage" : "Add Stage" }) })] })] }) }), _jsx(Dialog, { open: openTouchpointDialog, onOpenChange: setOpenTouchpointDialog, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: (editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.id) ? "Edit Touchpoint" : "Add Touchpoint" }), _jsxs(DialogDescription, { children: ["Define a customer interaction point in the ", editingStage === null || editingStage === void 0 ? void 0 : editingStage.title, " ", "stage"] })] }), _jsxs("form", { onSubmit: (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleSaveTouchpoint({
                                    title: formData.get("title"),
                                    channel: formData.get("channel"),
                                    content: formData.get("content"),
                                    metrics: formData.get("metrics"),
                                    status: formData.get("status"),
                                });
                            }, children: [_jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "Touchpoint Name" }), _jsx(Input, { id: "title", name: "title", placeholder: "e.g. Welcome Email, Product Demo", defaultValue: (editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.title) || "", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "channel", children: "Channel" }), _jsxs(Select, { name: "channel", defaultValue: (editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.channel) || "", required: true, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select channel" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Email", children: "Email" }), _jsx(SelectItem, { value: "Website", children: "Website" }), _jsx(SelectItem, { value: "Social Media", children: "Social Media" }), _jsx(SelectItem, { value: "In-app", children: "In-app" }), _jsx(SelectItem, { value: "Phone", children: "Phone" }), _jsx(SelectItem, { value: "SMS", children: "SMS" }), _jsx(SelectItem, { value: "Direct Mail", children: "Direct Mail" }), _jsx(SelectItem, { value: "Event", children: "Event" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "content", children: "Content/Message" }), _jsx(Textarea, { id: "content", name: "content", placeholder: "What message does this touchpoint deliver?", defaultValue: (editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.content) || "", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "metrics", children: "Key Metrics (comma separated)" }), _jsx(Input, { id: "metrics", name: "metrics", placeholder: "e.g. Open Rate, CTR, Conversion Rate", defaultValue: ((_a = editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.metrics) === null || _a === void 0 ? void 0 : _a.join(", ")) || "", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "status", children: "Status" }), _jsxs(Select, { name: "status", defaultValue: (editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.status) || "draft", required: true, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "draft", children: "Draft" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" })] })] })] })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: (editingTouchpoint === null || editingTouchpoint === void 0 ? void 0 : editingTouchpoint.id) ? "Update Touchpoint" : "Add Touchpoint" }) })] })] }) })] }));
}
export default CustomerJourneyMapper;
