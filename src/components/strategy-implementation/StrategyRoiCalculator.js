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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, } from "recharts";
import { TypographyP } from "@/components/ui/typography";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
const StrategyRoiCalculator = ({ strategyId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [roiData, setRoiData] = useState(null);
    // Form state
    const [initialInvestment, setInitialInvestment] = useState(0);
    const [projectedRevenue, setProjectedRevenue] = useState(0);
    const [timeframeMonths, setTimeframeMonths] = useState(12);
    const [annualCosts, setAnnualCosts] = useState(0);
    const [actualRevenue, setActualRevenue] = useState(undefined);
    const [actualCosts, setActualCosts] = useState(undefined);
    // Calculated values
    const [projectedROI, setProjectedROI] = useState(0);
    const [actualROI, setActualROI] = useState(undefined);
    // Load existing ROI data
    useEffect(() => {
        const fetchRoiData = () => __awaiter(void 0, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                const { data, error } = yield supabase
                    .from("strategy_roi")
                    .select("*")
                    .eq("strategyId", strategyId)
                    .single();
                if (error) {
                    if (error.code !== "PGRST116") {
                        // PGRST116 is "no rows returned" which is expected if no ROI data exists yet
                        console.error("Error fetching ROI data:", error);
                        toast.error("Failed to load ROI data");
                    }
                }
                else if (data) {
                    setRoiData(data);
                    setInitialInvestment(data.initialInvestment);
                    setProjectedRevenue(data.projectedRevenue);
                    setTimeframeMonths(data.timeframeMonths);
                    setAnnualCosts(data.annualCosts);
                    setProjectedROI(data.projectedROI);
                    if (data.actualRevenue !== undefined)
                        setActualRevenue(data.actualRevenue);
                    if (data.actualCosts !== undefined)
                        setActualCosts(data.actualCosts);
                    if (data.actualROI !== undefined)
                        setActualROI(data.actualROI);
                }
            }
            catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred");
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchRoiData();
    }, [strategyId]);
    // Calculate projected ROI whenever inputs change
    useEffect(() => {
        if (initialInvestment > 0) {
            // Convert annual costs to the specified timeframe
            const timeframeCosts = annualCosts * (timeframeMonths / 12);
            const totalCosts = initialInvestment + timeframeCosts;
            if (totalCosts > 0) {
                const roi = ((projectedRevenue - totalCosts) / totalCosts) * 100;
                setProjectedROI(Number(roi.toFixed(2)));
            }
        }
    }, [initialInvestment, projectedRevenue, timeframeMonths, annualCosts]);
    // Calculate actual ROI when actual data is provided
    useEffect(() => {
        if (actualRevenue !== undefined &&
            actualCosts !== undefined &&
            actualCosts > 0) {
            const roi = ((actualRevenue - actualCosts) / actualCosts) * 100;
            setActualROI(Number(roi.toFixed(2)));
        }
    }, [actualRevenue, actualCosts]);
    // Save ROI data
    const handleSave = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roiDataToSave = {
                strategyId,
                initialInvestment,
                projectedRevenue,
                timeframeMonths,
                annualCosts,
                projectedROI,
                actualRevenue,
                actualCosts,
                actualROI,
                lastUpdated: new Date().toISOString(),
            };
            if (roiData === null || roiData === void 0 ? void 0 : roiData.id) {
                // Update existing record
                const { error } = yield supabase
                    .from("strategy_roi")
                    .update(roiDataToSave)
                    .eq("id", roiData.id);
                if (error)
                    throw error;
                toast.success("ROI data updated successfully");
            }
            else {
                // Create new record
                const { error } = yield supabase
                    .from("strategy_roi")
                    .insert([roiDataToSave]);
                if (error)
                    throw error;
                toast.success("ROI data saved successfully");
            }
        }
        catch (error) {
            console.error("Error saving ROI data:", error);
            toast.error("Failed to save ROI data");
        }
    });
    // Prepare chart data
    const getChartData = () => {
        const chartData = [
            { name: "Initial Investment", value: initialInvestment },
            { name: "Ongoing Costs", value: annualCosts * (timeframeMonths / 12) },
            { name: "Projected Revenue", value: projectedRevenue },
        ];
        if (actualRevenue !== undefined && actualCosts !== undefined) {
            chartData.push({ name: "Actual Costs", value: actualCosts }, { name: "Actual Revenue", value: actualRevenue });
        }
        return chartData;
    };
    const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#8884d8", "#82ca9d"];
    return (_jsxs(Card, { className: "shadow-md", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "ROI Calculator" }) }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "py-6 text-center text-muted-foreground", children: "Loading ROI calculator..." })) : (_jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "initialInvestment", children: "Initial Investment ($)" }), _jsx(Input, { id: "initialInvestment", type: "number", value: initialInvestment, onChange: (e) => setInitialInvestment(Number(e.target.value)) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "projectedRevenue", children: "Projected Revenue ($)" }), _jsx(Input, { id: "projectedRevenue", type: "number", value: projectedRevenue, onChange: (e) => setProjectedRevenue(Number(e.target.value)) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "timeframeMonths", children: "Timeframe (Months)" }), _jsx(Input, { id: "timeframeMonths", type: "number", value: timeframeMonths, onChange: (e) => setTimeframeMonths(Number(e.target.value)) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "annualCosts", children: "Annual Ongoing Costs ($)" }), _jsx(Input, { id: "annualCosts", type: "number", value: annualCosts, onChange: (e) => setAnnualCosts(Number(e.target.value)) })] }), _jsxs("div", { className: "pt-4 border-t", children: [_jsx(Label, { htmlFor: "actualRevenue", children: "Actual Revenue ($) (Optional)" }), _jsx(Input, { id: "actualRevenue", type: "number", value: actualRevenue === undefined ? "" : actualRevenue, onChange: (e) => setActualRevenue(e.target.value ? Number(e.target.value) : undefined), placeholder: "Enter once strategy is implemented" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "actualCosts", children: "Actual Costs ($) (Optional)" }), _jsx(Input, { id: "actualCosts", type: "number", value: actualCosts === undefined ? "" : actualCosts, onChange: (e) => setActualCosts(e.target.value ? Number(e.target.value) : undefined), placeholder: "Enter once strategy is implemented" })] }), _jsx(Button, { onClick: handleSave, className: "w-full", children: "Save ROI Data" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-muted p-4 rounded-md", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Projected ROI" }), _jsxs("div", { className: "text-3xl font-bold text-primary", children: [projectedROI, "%"] }), _jsxs(TypographyP, { className: "text-sm mt-1", children: ["Over ", timeframeMonths, " months"] })] }), actualROI !== undefined && (_jsxs("div", { className: "bg-muted p-4 rounded-md", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Actual ROI" }), _jsxs("div", { className: `text-3xl font-bold ${actualROI >= 0 ? "text-green-500" : "text-red-500"}`, children: [actualROI, "%"] }), _jsx(TypographyP, { className: "text-sm mt-1", children: "Based on reported actual costs and revenue" })] })), _jsx("div", { className: "h-[300px] mt-4", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: getChartData(), cx: "50%", cy: "50%", labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "value", label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, children: getChartData().map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => `$${value}` }), _jsx(Legend, {})] }) }) })] })] })) })] }));
};
export default StrategyRoiCalculator;
