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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";
import { TypographyP } from "@/components/ui/typography";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
const initialFormState = {
    competitorName: "",
    marketShare: 0,
    strengthScore: 5,
    weaknessScore: 5,
    notes: "",
};
const CompetitorBenchmarking = ({ strategyId }) => {
    const [competitors, setCompetitors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState(initialFormState);
    useEffect(() => {
        const fetchCompetitors = () => __awaiter(void 0, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                const { data, error } = yield supabase
                    .from("competitor_benchmarks")
                    .select("*")
                    .eq("strategyId", strategyId)
                    .order("marketShare", { ascending: false });
                if (error)
                    throw error;
                setCompetitors(data || []);
            }
            catch (error) {
                console.error("Error fetching competitors:", error);
                toast.error("Failed to load competitor data");
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchCompetitors();
    }, [strategyId]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => (Object.assign(Object.assign({}, prev), { [name]: name === "marketShare" ? Number(value) : value })));
    };
    const handleSliderChange = (name, value) => {
        setFormState((prev) => (Object.assign(Object.assign({}, prev), { [name]: value[0] })));
    };
    const handleAddCompetitor = () => {
        setIsEditing(true);
        setFormState(initialFormState);
    };
    const handleEditCompetitor = (competitor) => {
        setIsEditing(true);
        setFormState({
            id: competitor.id,
            competitorName: competitor.competitorName,
            marketShare: competitor.marketShare,
            strengthScore: competitor.strengthScore,
            weaknessScore: competitor.weaknessScore,
            notes: competitor.notes || "",
        });
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormState(initialFormState);
    };
    const handleSaveCompetitor = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!formState.competitorName.trim()) {
            toast.error("Competitor name is required");
            return;
        }
        try {
            if (formState.id) {
                // Update existing competitor
                const { error } = yield supabase
                    .from("competitor_benchmarks")
                    .update({
                    competitorName: formState.competitorName,
                    marketShare: formState.marketShare,
                    strengthScore: formState.strengthScore,
                    weaknessScore: formState.weaknessScore,
                    notes: formState.notes,
                })
                    .eq("id", formState.id);
                if (error)
                    throw error;
                setCompetitors((prev) => prev.map((c) => (c.id === formState.id ? Object.assign(Object.assign({}, c), formState) : c)));
                toast.success("Competitor updated successfully");
            }
            else {
                // Add new competitor
                const { data, error } = yield supabase
                    .from("competitor_benchmarks")
                    .insert([
                    {
                        strategyId,
                        competitorName: formState.competitorName,
                        marketShare: formState.marketShare,
                        strengthScore: formState.strengthScore,
                        weaknessScore: formState.weaknessScore,
                        notes: formState.notes,
                        created_at: new Date().toISOString(),
                    },
                ])
                    .select();
                if (error)
                    throw error;
                if (data && data.length > 0) {
                    setCompetitors((prev) => [...prev, data[0]].sort((a, b) => b.marketShare - a.marketShare));
                    toast.success("Competitor added successfully");
                }
            }
            setIsEditing(false);
            setFormState(initialFormState);
        }
        catch (error) {
            console.error("Error saving competitor:", error);
            toast.error("Failed to save competitor data");
        }
    });
    const handleDeleteCompetitor = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("competitor_benchmarks")
                .delete()
                .eq("id", id);
            if (error)
                throw error;
            setCompetitors((prev) => prev.filter((c) => c.id !== id));
            toast.success("Competitor deleted successfully");
        }
        catch (error) {
            console.error("Error deleting competitor:", error);
            toast.error("Failed to delete competitor");
        }
    });
    // Prepare chart data
    const getChartData = () => {
        return competitors.map((comp) => ({
            name: comp.competitorName,
            marketShare: comp.marketShare,
            strength: comp.strengthScore,
            weakness: comp.weaknessScore,
            rating: comp.strengthScore - comp.weaknessScore,
        }));
    };
    return (_jsxs(Card, { className: "shadow-md", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsx(CardTitle, { children: "Competitor Benchmarking" }), !isEditing && (_jsxs(Button, { onClick: handleAddCompetitor, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add Competitor"] }))] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "py-6 text-center text-muted-foreground", children: "Loading competitor data..." })) : isEditing ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "competitorName", children: "Competitor Name" }), _jsx(Input, { id: "competitorName", name: "competitorName", value: formState.competitorName, onChange: handleInputChange, placeholder: "e.g., Acme Inc." })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "marketShare", children: "Market Share (%)" }), _jsx(Input, { id: "marketShare", name: "marketShare", type: "number", min: "0", max: "100", value: formState.marketShare, onChange: handleInputChange })] }), _jsxs("div", { children: [_jsxs(Label, { className: "flex justify-between", children: [_jsx("span", { children: "Strength Score (1-10)" }), _jsx("span", { children: formState.strengthScore })] }), _jsx(Slider, { min: 1, max: 10, step: 1, value: [formState.strengthScore], onValueChange: (value) => handleSliderChange("strengthScore", value) })] }), _jsxs("div", { children: [_jsxs(Label, { className: "flex justify-between", children: [_jsx("span", { children: "Weakness Score (1-10)" }), _jsx("span", { children: formState.weaknessScore })] }), _jsx(Slider, { min: 1, max: 10, step: 1, value: [formState.weaknessScore], onValueChange: (value) => handleSliderChange("weaknessScore", value) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "notes", children: "Notes" }), _jsx(Textarea, { id: "notes", name: "notes", value: formState.notes, onChange: handleInputChange, placeholder: "Add notes about this competitor...", rows: 3 })] }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", onClick: handleCancelEdit, children: "Cancel" }), _jsx(Button, { onClick: handleSaveCompetitor, children: "Save" })] })] })) : competitors.length === 0 ? (_jsxs("div", { className: "py-12 text-center text-muted-foreground", children: [_jsx("p", { className: "mb-4", children: "No competitor data has been added yet." }), _jsxs(Button, { variant: "outline", onClick: handleAddCompetitor, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add your first competitor"] })] })) : (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: getChartData(), margin: { top: 20, right: 30, left: 20, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "marketShare", name: "Market Share %", fill: "#8884d8" }), _jsx(Bar, { dataKey: "strength", name: "Strength", fill: "#82ca9d" }), _jsx(Bar, { dataKey: "weakness", name: "Weakness", fill: "#ff8042" })] }) }) }), _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Competitor" }), _jsx(TableHead, { children: "Market Share" }), _jsx(TableHead, { children: "Strength" }), _jsx(TableHead, { children: "Weakness" }), _jsx(TableHead, { children: "Net Rating" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: competitors.map((competitor) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: competitor.competitorName }), _jsxs(TableCell, { children: [competitor.marketShare, "%"] }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-24 h-2 bg-gray-200 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-green-500", style: {
                                                                    width: `${(competitor.strengthScore / 10) * 100}%`,
                                                                } }) }), _jsx("span", { className: "ml-2", children: competitor.strengthScore })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-24 h-2 bg-gray-200 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-red-500", style: {
                                                                    width: `${(competitor.weaknessScore / 10) * 100}%`,
                                                                } }) }), _jsx("span", { className: "ml-2", children: competitor.weaknessScore })] }) }), _jsx(TableCell, { className: competitor.strengthScore > competitor.weaknessScore
                                                    ? "text-green-500"
                                                    : "text-red-500", children: competitor.strengthScore - competitor.weaknessScore }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEditCompetitor(competitor), children: _jsx(Edit2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-destructive hover:text-destructive", onClick: () => handleDeleteCompetitor(competitor.id), children: _jsx(Trash2, { className: "h-4 w-4" }) })] }) })] }, competitor.id))) })] }), competitors.some((c) => c.notes) && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Competitor Notes" }), _jsx("div", { className: "space-y-3", children: competitors
                                        .filter((c) => c.notes)
                                        .map((competitor) => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsx("h4", { className: "font-medium mb-1", children: competitor.competitorName }), _jsx(TypographyP, { children: competitor.notes })] }) }, `notes-${competitor.id}`))) })] }))] })) })] }));
};
export default CompetitorBenchmarking;
