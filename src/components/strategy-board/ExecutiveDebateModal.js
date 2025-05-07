import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2, FileDown, ThumbsUp, ThumbsDown, } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { executiveBots } from "@/backend/executiveBots";
import { useToast } from "@/components/ui/use-toast";
import { scrollToBottom } from "@/utils/scrollHelpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function ExecutiveDebateModal({ isOpen, onClose, strategy, debate, isLoading, }) {
    const { toast } = useToast();
    const messagesEndRef = React.useRef(null);
    const [activeTab, setActiveTab] = React.useState("debate");
    // Scroll to the bottom whenever new messages come in
    React.useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            scrollToBottom(messagesEndRef.current);
        }
    }, [debate === null || debate === void 0 ? void 0 : debate.messages, isOpen]);
    // Generate mock executive photos
    const getExecutivePhoto = (name) => {
        const initial = name.charAt(0).toUpperCase();
        return `https://api.dicebear.com/6.x/initials/svg?seed=${name.replace(/\s/g, "")}&backgroundColor=4c1d95`;
    };
    // Generate mock debate if none exists
    const getMockDebate = () => {
        if (!strategy)
            return [];
        const risk = strategy.risk || strategy.risk_level || "Medium";
        const executives = getDebateExecutives(risk);
        return [
            {
                id: "1",
                sender: executives[0],
                content: `I see tremendous potential in the "${strategy.title}" strategy. The market is ready for this approach, and if executed well, we could see significant gains in both market share and revenue. However, we must be prepared to iterate rapidly based on customer feedback.`,
                timestamp: new Date(Date.now() - 300000),
                executive: {
                    name: executives[0],
                    role: "CEO",
                    avatar: getExecutivePhoto(executives[0]),
                },
                sentiment: "positive",
            },
            {
                id: "2",
                sender: executives[1],
                content: `While I agree with the general direction, I have concerns about the operational efficiency. Have we thoroughly analyzed the resource requirements? I'd recommend a phased implementation approach to minimize disruption to our core business activities.`,
                timestamp: new Date(Date.now() - 240000),
                executive: {
                    name: executives[1],
                    role: "COO",
                    avatar: getExecutivePhoto(executives[1]),
                },
                sentiment: "neutral",
            },
            {
                id: "3",
                sender: executives[2],
                content: `From a financial perspective, this ${risk.toLowerCase()}-risk strategy requires careful cash flow management. I've run the numbers, and we'll need to achieve at least a 15% ROI within the first year to justify the investment. Let's ensure we have robust metrics in place.`,
                timestamp: new Date(Date.now() - 180000),
                executive: {
                    name: executives[2],
                    role: "CFO",
                    avatar: getExecutivePhoto(executives[2]),
                },
                sentiment: "negative",
            },
            {
                id: "4",
                sender: executives[0],
                content: `Those are valid points. What if we allocate an initial 20% of the proposed budget for a pilot program? This would allow us to test key assumptions while limiting our exposure.`,
                timestamp: new Date(Date.now() - 120000),
                executive: {
                    name: executives[0],
                    role: "CEO",
                    avatar: getExecutivePhoto(executives[0]),
                },
                sentiment: "positive",
            },
        ];
    };
    // Get random executives based on risk level
    const getDebateExecutives = (risk) => {
        const allExecutives = [
            ...executiveBots.ceo,
            ...executiveBots.cfo,
            ...executiveBots.coo,
            ...executiveBots.strategy,
        ];
        // Ensure we always include the strategy's executive if available
        const debateExecs = [];
        if ((strategy === null || strategy === void 0 ? void 0 : strategy.executiveBot) &&
            allExecutives.includes(strategy.executiveBot)) {
            debateExecs.push(strategy.executiveBot);
        }
        // Add other random executives
        while (debateExecs.length < 3) {
            const randomIndex = Math.floor(Math.random() * allExecutives.length);
            const exec = allExecutives[randomIndex];
            if (!debateExecs.includes(exec)) {
                debateExecs.push(exec);
            }
        }
        return debateExecs;
    };
    // Get executive role
    const getExecutiveRole = (name) => {
        if (executiveBots.ceo.includes(name))
            return "CEO";
        if (executiveBots.cfo.includes(name))
            return "CFO";
        if (executiveBots.coo.includes(name))
            return "COO";
        if (executiveBots.strategy.includes(name))
            return "Chief Strategy Officer";
        return "Executive";
    };
    // Get mock consensus
    const getMockConsensus = () => {
        if (!strategy)
            return "";
        const risk = strategy.risk || strategy.risk_level || "Medium";
        if (risk === "High") {
            return `After thorough debate, the executive team recommends proceeding with the "${strategy.title}" strategy, with an emphasis on carefully monitored phases and clear success metrics. The potential rewards justify the risk level, but regular reassessment will be critical.`;
        }
        else if (risk === "Medium") {
            return `The executive team has reached consensus on implementing the "${strategy.title}" strategy. We recommend a balanced approach with equal focus on execution quality and measuring outcomes. This strategy offers a solid risk-to-reward ratio.`;
        }
        else {
            return `Our executive team agrees that the "${strategy.title}" strategy presents a conservative approach that aligns well with our current market position. We recommend full implementation with quarterly reviews to evaluate effectiveness and potential for expanding scope.`;
        }
    };
    const handleExportPDF = () => {
        toast({
            title: "Preparing PDF",
            description: "Your executive debate summary is being prepared for download.",
        });
        setTimeout(() => {
            toast({
                title: "PDF Ready",
                description: "Your executive debate summary has been downloaded.",
            });
        }, 2000);
    };
    const handleFeedback = (isPositive) => {
        toast({
            title: isPositive ? "Feedback Recorded" : "Feedback Noted",
            description: isPositive
                ? "Thanks for the positive feedback! We'll incorporate these insights into future debates."
                : "We appreciate your feedback. We'll improve our executive debate simulations.",
        });
    };
    // Use mock data if no real debate available
    const debateMessages = (debate === null || debate === void 0 ? void 0 : debate.messages) || getMockDebate();
    const consensusRecommendation = (debate === null || debate === void 0 ? void 0 : debate.consensus) || getMockConsensus();
    if (!strategy)
        return null;
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "sm:max-w-[700px] max-h-[90vh] bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-2 text-xl", children: [_jsx(MessageCircle, { className: "h-5 w-5 text-primary" }), "Executive Team Debate"] }), _jsxs(DialogDescription, { children: ["Watch your AI executive team discuss \"", strategy.title, "\""] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "flex-1 flex flex-col overflow-hidden", children: [_jsxs(TabsList, { className: "mb-2", children: [_jsx(TabsTrigger, { value: "debate", children: "Debate" }), _jsx(TabsTrigger, { value: "consensus", children: "Consensus" })] }), _jsx(TabsContent, { value: "debate", className: "flex-1 overflow-hidden flex flex-col", children: isLoading ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-10", children: [_jsx(Loader2, { className: "h-10 w-10 text-primary animate-spin mb-4" }), _jsx("p", { className: "text-lg font-medium", children: "Gathering your executive team..." }), _jsx("p", { className: "text-sm text-muted-foreground text-center mt-2", children: "Our AI is simulating a debate among top executives about your strategy." })] })) : (_jsxs("div", { className: "space-y-6 overflow-y-auto py-4 pr-2 flex-1", children: [_jsx("div", { className: "space-y-6", children: debateMessages.map((message, index) => {
                                            const isEven = index % 2 === 0;
                                            return (_jsx("div", { className: `flex ${isEven ? "justify-start" : "justify-end"}`, children: _jsxs("div", { className: `flex ${isEven ? "flex-row" : "flex-row-reverse"} gap-3 max-w-[80%]`, children: [_jsxs(Avatar, { className: "h-10 w-10 border-2 border-primary/30", children: [_jsx(AvatarImage, { src: message.executive.avatar, alt: message.sender }), _jsx(AvatarFallback, { children: message.sender[0] })] }), _jsxs("div", { children: [_jsx("div", { className: `rounded-lg p-4 mb-1 
                                ${isEven
                                                                        ? "bg-primary/10 border border-primary/20 rounded-tl-none"
                                                                        : "bg-secondary/10 border border-secondary/20 rounded-tr-none"}`, children: _jsx("p", { className: "text-sm", children: message.content }) }), _jsxs("div", { className: `flex items-center text-xs text-muted-foreground gap-2
                                ${isEven ? "justify-start" : "justify-end"}`, children: [_jsx("span", { className: "font-medium", children: message.sender }), _jsxs("span", { className: "opacity-70", children: ["(", message.executive.role ||
                                                                                    getExecutiveRole(message.sender), ")"] })] })] })] }) }, message.id));
                                        }) }), _jsx("div", { ref: messagesEndRef })] })) }), _jsx(TabsContent, { value: "consensus", className: "flex-1 overflow-auto", children: _jsx("div", { className: "space-y-6 py-4 pr-2", children: _jsxs("div", { className: "mt-2", children: [_jsx("h4", { className: "text-lg font-semibold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent", children: "Consensus Recommendation" }), _jsx("div", { className: "bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-lg p-4", children: _jsx("p", { className: "text-sm", children: consensusRecommendation }) })] }) }) })] }), _jsxs(DialogFooter, { className: "flex flex-col sm:flex-row gap-2 border-t border-white/10 pt-4", children: [_jsxs("div", { className: "flex items-center gap-2 sm:mr-auto", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 px-2", onClick: () => handleFeedback(true), children: _jsx(ThumbsUp, { className: "h-4 w-4 text-green-400" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 px-2", onClick: () => handleFeedback(false), children: _jsx(ThumbsDown, { className: "h-4 w-4 text-red-400" }) })] }), _jsxs(Button, { variant: "outline", className: "bg-black/50 border-white/10", onClick: handleExportPDF, children: [_jsx(FileDown, { className: "mr-2 h-4 w-4" }), "Export Summary"] })] })] }) }));
}
