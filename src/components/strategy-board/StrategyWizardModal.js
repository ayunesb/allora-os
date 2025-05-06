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
import { Loader2, Check, AlertTriangle, LightbulbIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { executiveBots } from "@/backend/executiveBots";
export default function StrategyWizardModal({ isOpen, onClose, onCreateStrategy, }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedStrategies, setGeneratedStrategies] = useState([]);
    const [selectedStrategyIndex, setSelectedStrategyIndex] = useState(null);
    // Form inputs
    const [goal, setGoal] = useState("");
    const [market, setMarket] = useState("");
    const [riskAppetite, setRiskAppetite] = useState("Medium");
    const [budget, setBudget] = useState("");
    const resetForm = () => {
        setCurrentStep(1);
        setIsGenerating(false);
        setGeneratedStrategies([]);
        setSelectedStrategyIndex(null);
        setGoal("");
        setMarket("");
        setRiskAppetite("Medium");
        setBudget("");
    };
    const handleClose = () => {
        resetForm();
        onClose();
    };
    const handleGenerateStrategies = () => __awaiter(this, void 0, void 0, function* () {
        setIsGenerating(true);
        try {
            // In a real app, this would call an API to generate strategies based on input
            // For now, we'll simulate a delay and generate mock data
            yield new Promise((resolve) => setTimeout(resolve, 2000));
            // Get random executives for recommendation
            const getRandomExecutive = () => {
                const allExecs = [
                    ...executiveBots.ceo,
                    ...executiveBots.cfo,
                    ...executiveBots.strategy,
                ];
                return allExecs[Math.floor(Math.random() * allExecs.length)];
            };
            // Mock generated strategies
            const mockStrategies = [
                {
                    title: `${market} Market Expansion Strategy`,
                    description: `Strategically enter the ${market} market with a focused value proposition targeting specific customer segments. This approach will ${goal.toLowerCase()} through careful market positioning and competitive differentiation.`,
                    risk: riskAppetite,
                    risk_level: riskAppetite,
                    executiveBot: getRandomExecutive(),
                    impact: "High",
                    timeframe: riskAppetite === "Low" ? "6-12 months" : "3-6 months",
                    progress: 0,
                    status: "Draft",
                },
                {
                    title: `Innovative ${goal} Initiative`,
                    description: `Launch a disruptive approach to ${goal.toLowerCase()} by leveraging cutting-edge technology and strategic partnerships. This ${riskAppetite.toLowerCase()}-risk strategy focuses on creating new opportunities in the ${market} sector.`,
                    risk: riskAppetite,
                    risk_level: riskAppetite,
                    executiveBot: getRandomExecutive(),
                    impact: "High",
                    timeframe: "6-9 months",
                    progress: 0,
                    status: "Draft",
                },
                {
                    title: `${riskAppetite} Risk ${market} Strategy`,
                    description: `A carefully calibrated approach to achieve ${goal} in the competitive ${market} landscape. This strategy balances growth objectives with well-defined risk parameters and clear success metrics.`,
                    risk: riskAppetite,
                    risk_level: riskAppetite,
                    executiveBot: getRandomExecutive(),
                    impact: riskAppetite === "Low" ? "Medium" : "High",
                    timeframe: riskAppetite === "High" ? "3-4 months" : "8-12 months",
                    progress: 0,
                    status: "Draft",
                },
            ];
            setGeneratedStrategies(mockStrategies);
            setCurrentStep(2);
        }
        catch (error) {
            console.error("Error generating strategies:", error);
        }
        finally {
            setIsGenerating(false);
        }
    });
    const handleCreateSelectedStrategy = () => __awaiter(this, void 0, void 0, function* () {
        if (selectedStrategyIndex === null)
            return;
        const selectedStrategy = generatedStrategies[selectedStrategyIndex];
        setIsGenerating(true);
        try {
            // In a real app, this would call an API to create the strategy
            const result = yield onCreateStrategy(Object.assign(Object.assign({}, selectedStrategy), { company_id: "", risk: selectedStrategy.risk, risk_level: selectedStrategy.risk_level }));
            if (result) {
                handleClose();
            }
        }
        catch (error) {
            console.error("Error creating strategy:", error);
        }
        finally {
            setIsGenerating(false);
        }
    });
    return (_jsx(Dialog, { open: isOpen, onOpenChange: handleClose, children: _jsxs(DialogContent, { className: "sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#0f1526] border border-gray-800 text-white", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-xl font-bold", children: "AI Strategy Wizard" }), _jsx(DialogDescription, { className: "text-gray-400", children: currentStep === 1
                                ? "Let our AI help you create a powerful growth strategy for your business."
                                : "Choose the strategy that best fits your needs or go back to refine your inputs." })] }), currentStep === 1 ? (_jsxs("div", { className: "space-y-5 py-2", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "goal", className: "text-gray-300", children: "What is your primary business goal?" }), _jsx(Input, { id: "goal", placeholder: "e.g., Increase market share, Expand to new regions, Launch a new product", value: goal, onChange: (e) => setGoal(e.target.value), className: "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "market", className: "text-gray-300", children: "What market or industry are you focusing on?" }), _jsx(Input, { id: "market", placeholder: "e.g., SaaS, Retail, Healthcare, Financial Services", value: market, onChange: (e) => setMarket(e.target.value), className: "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "risk", className: "text-gray-300", children: "What is your risk appetite?" }), _jsxs(Select, { value: riskAppetite, onValueChange: (value) => setRiskAppetite(value), children: [_jsx(SelectTrigger, { id: "risk", className: "bg-gray-800/50 border-gray-700 text-white", children: _jsx(SelectValue, { placeholder: "Select risk level" }) }), _jsxs(SelectContent, { className: "bg-gray-800 border-gray-700 text-white", children: [_jsx(SelectItem, { value: "Low", children: _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-green-500 mr-2" }), " ", "Low Risk"] }) }), _jsx(SelectItem, { value: "Medium", children: _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-amber-500 mr-2" }), " ", "Medium Risk"] }) }), _jsx(SelectItem, { value: "High", children: _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-red-500 mr-2" }), " ", "High Risk"] }) })] })] }), _jsxs("div", { className: "flex items-start gap-2 mt-2 p-2 border border-amber-800/30 rounded-md bg-amber-900/20", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" }), _jsxs("p", { className: "text-xs text-amber-300", children: [riskAppetite === "Low" &&
                                                    "Low risk strategies prioritize stability and predictable outcomes with minimal chance of setbacks.", riskAppetite === "Medium" &&
                                                    "Medium risk strategies balance opportunity and safety, accepting moderate uncertainty for good reward potential.", riskAppetite === "High" &&
                                                    "High risk strategies pursue maximum growth and disruption, accepting significant uncertainty for exceptional potential returns."] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "budget", className: "text-gray-300", children: "What is your approximate budget? (Optional)" }), _jsx(Input, { id: "budget", placeholder: "e.g., $5,000, $50,000, $250,000+", value: budget, onChange: (e) => setBudget(e.target.value), className: "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500" })] })] })) : (_jsxs("div", { className: "space-y-6 py-2", children: [_jsxs("div", { className: "flex items-center gap-2 p-3 bg-blue-900/20 border border-blue-800/30 rounded-md", children: [_jsx(LightbulbIcon, { className: "h-5 w-5 text-blue-400" }), _jsx("p", { className: "text-sm text-blue-200", children: "Our AI has generated these strategies based on your inputs. Select one to implement." })] }), _jsx("div", { className: "space-y-4", children: generatedStrategies.map((strategy, index) => (_jsxs("div", { className: `p-4 border rounded-lg cursor-pointer transition-all ${selectedStrategyIndex === index
                                    ? "border-purple-500 bg-purple-900/20"
                                    : "border-gray-700 bg-gray-800/30 hover:bg-gray-700/30"}`, onClick: () => setSelectedStrategyIndex(index), children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("h3", { className: "font-medium text-white", children: strategy.title }), selectedStrategyIndex === index && (_jsx(Check, { className: "h-5 w-5 text-purple-400" }))] }), _jsx("p", { className: "text-sm text-gray-300 mb-3", children: strategy.description }), _jsxs("div", { className: "flex flex-wrap gap-2 text-xs", children: [_jsxs("div", { className: `px-2 py-1 rounded-full 
                      ${strategy.risk === "Low"
                                                    ? "bg-green-900/40 text-green-300"
                                                    : strategy.risk === "Medium"
                                                        ? "bg-amber-800/40 text-amber-300"
                                                        : "bg-red-900/40 text-red-300"}`, children: [strategy.risk, " Risk"] }), _jsxs("div", { className: "px-2 py-1 rounded-full bg-blue-900/40 text-blue-300", children: [strategy.impact, " Impact"] }), _jsx("div", { className: "px-2 py-1 rounded-full bg-purple-900/40 text-purple-300", children: strategy.timeframe })] })] }, index))) })] })), _jsx(DialogFooter, { className: "flex-col sm:flex-row gap-2", children: currentStep === 1 ? (_jsx(Button, { onClick: handleGenerateStrategies, className: "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 w-full", disabled: !goal || !market || isGenerating, children: isGenerating ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Generating Strategies..."] })) : ("Generate AI Strategies") })) : (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep(1), className: "sm:w-auto w-full border-gray-700 text-white bg-transparent hover:bg-gray-800", disabled: isGenerating, children: "Back" }), _jsx(Button, { onClick: handleCreateSelectedStrategy, className: "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 sm:w-auto w-full", disabled: selectedStrategyIndex === null || isGenerating, children: isGenerating ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Creating Strategy..."] })) : ("Create Selected Strategy") })] })) })] }) }));
}
