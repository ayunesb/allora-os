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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Plus, Edit2, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fetchStrategyMilestones, calculateStrategyProgress, getStatusColor, } from "@/utils/strategyImplementation/implementationUtils";
import MilestoneDialog from "./MilestoneDialog";
const StrategyImplementationTracker = ({ strategyId, strategyTitle }) => {
    const [milestones, setMilestones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalProgress, setTotalProgress] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentMilestone, setCurrentMilestone] = useState(null);
    useEffect(() => {
        const loadMilestones = () => __awaiter(void 0, void 0, void 0, function* () {
            setIsLoading(true);
            const data = yield fetchStrategyMilestones(strategyId);
            setMilestones(data);
            setTotalProgress(calculateStrategyProgress(data));
            setIsLoading(false);
        });
        loadMilestones();
    }, [strategyId]);
    const handleAddMilestone = () => {
        setCurrentMilestone(null);
        setIsDialogOpen(true);
    };
    const handleEditMilestone = (milestone) => {
        setCurrentMilestone(milestone);
        setIsDialogOpen(true);
    };
    const handleMilestoneSaved = (savedMilestone) => {
        // Update the milestone list and recalculate progress
        const updated = currentMilestone
            ? milestones.map((m) => (m.id === savedMilestone.id ? savedMilestone : m))
            : [...milestones, savedMilestone];
        setMilestones(updated);
        setTotalProgress(calculateStrategyProgress(updated));
        setIsDialogOpen(false);
    };
    const handleMilestoneDeleted = (milestoneId) => {
        const updated = milestones.filter((m) => m.id !== milestoneId);
        setMilestones(updated);
        setTotalProgress(calculateStrategyProgress(updated));
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case "not_started":
                return "Not Started";
            case "in_progress":
                return "In Progress";
            case "completed":
                return "Completed";
            case "delayed":
                return "Delayed";
            default:
                return status;
        }
    };
    return (_jsxs(Card, { className: "shadow-md", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { children: "Implementation Tracker" }), _jsxs(Button, { onClick: handleAddMilestone, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add Milestone"] })] }), _jsxs("div", { className: "mt-2 space-y-1", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Overall Progress" }), _jsxs("span", { children: [totalProgress, "%"] })] }), _jsx(Progress, { value: totalProgress, className: "h-2" })] })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "py-6 text-center text-muted-foreground", children: "Loading milestones..." })) : milestones.length === 0 ? (_jsxs("div", { className: "py-12 text-center text-muted-foreground", children: [_jsx("p", { className: "mb-4", children: "No milestones have been added yet." }), _jsxs(Button, { variant: "outline", onClick: handleAddMilestone, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create your first milestone"] })] })) : (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Milestone" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Due Date" }), _jsx(TableHead, { children: "Progress" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: milestones.map((milestone) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: milestone.title }), _jsx(TableCell, { children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`, children: getStatusLabel(milestone.status) }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [_jsx(Calendar, { className: "h-3 w-3 mr-1 text-muted-foreground" }), _jsx("span", { className: "text-sm", children: formatDistanceToNow(new Date(milestone.dueDate), {
                                                        addSuffix: true,
                                                    }) })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "space-y-1", children: [_jsx(Progress, { value: milestone.progress, className: "h-2" }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [milestone.progress, "%"] })] }) }), _jsx(TableCell, { className: "text-right", children: _jsxs(Button, { variant: "ghost", size: "icon", onClick: () => handleEditMilestone(milestone), children: [_jsx(Edit2, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Edit" })] }) })] }, milestone.id))) })] })) }), isDialogOpen && (_jsx(MilestoneDialog, { isOpen: isDialogOpen, onClose: () => setIsDialogOpen(false), strategyId: strategyId, milestone: currentMilestone, onSave: handleMilestoneSaved, onDelete: handleMilestoneDeleted }))] }));
};
export default StrategyImplementationTracker;
