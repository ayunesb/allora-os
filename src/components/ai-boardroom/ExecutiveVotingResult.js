import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
const ExecutiveVotingResult = ({ votes, executives }) => {
    const optionA = votes.filter((v) => v.choice === "option_a");
    const optionB = votes.filter((v) => v.choice === "option_b");
    const percentA = Math.round((optionA.length / votes.length) * 100);
    const percentB = Math.round((optionB.length / votes.length) * 100);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "rounded-lg bg-gray-900 border border-gray-800 overflow-hidden mx-auto max-w-2xl", children: [_jsxs("div", { className: "p-4 border-b border-gray-800", children: [_jsx("h3", { className: "text-lg font-medium text-white", children: "Executive Vote Results" }), _jsx("p", { className: "text-sm text-gray-400", children: "Your executive team has voted on the best approach" })] }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-purple-500 mr-2" }), _jsx("span", { className: "text-sm font-medium text-white", children: "Aggressive Approach" })] }), _jsxs("span", { className: "text-sm text-gray-400", children: [percentA, "%"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Progress, { value: percentA, className: "h-8 bg-gray-800" }), _jsx("div", { className: "absolute top-0 left-0 right-0 bottom-0 flex items-center px-2", children: optionA.map((vote, index) => {
                                                    const exec = executives.find((e) => e.id === vote.executiveId);
                                                    if (!exec)
                                                        return null;
                                                    return (_jsx("div", { className: "relative", style: {
                                                            left: `${(index / Math.max(optionA.length - 1, 1)) * 90}%`,
                                                        }, children: _jsxs(Avatar, { className: "h-6 w-6 border border-gray-700", children: [_jsx(AvatarImage, { src: exec.avatar, alt: exec.name }), _jsx(AvatarFallback, { className: "bg-purple-900 text-white text-xs", children: exec.name
                                                                        .split(" ")
                                                                        .map((n) => n[0])
                                                                        .join("") })] }) }, vote.executiveId));
                                                }) })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-blue-500 mr-2" }), _jsx("span", { className: "text-sm font-medium text-white", children: "Cautious Approach" })] }), _jsxs("span", { className: "text-sm text-gray-400", children: [percentB, "%"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Progress, { value: percentB, className: "h-8 bg-gray-800", color: "blue" }), _jsx("div", { className: "absolute top-0 left-0 right-0 bottom-0 flex items-center px-2", children: optionB.map((vote, index) => {
                                                    const exec = executives.find((e) => e.id === vote.executiveId);
                                                    if (!exec)
                                                        return null;
                                                    return (_jsx("div", { className: "relative", style: {
                                                            left: `${(index / Math.max(optionB.length - 1, 1)) * 90}%`,
                                                        }, children: _jsxs(Avatar, { className: "h-6 w-6 border border-gray-700", children: [_jsx(AvatarImage, { src: exec.avatar, alt: exec.name }), _jsx(AvatarFallback, { className: "bg-blue-900 text-white text-xs", children: exec.name
                                                                        .split(" ")
                                                                        .map((n) => n[0])
                                                                        .join("") })] }) }, vote.executiveId));
                                                }) })] })] })] }), _jsxs("div", { className: "mt-6 pt-4 border-t border-gray-800", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-2", children: "Individual Executive Votes" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: votes.map((vote) => {
                                    const exec = executives.find((e) => e.id === vote.executiveId);
                                    if (!exec)
                                        return null;
                                    return (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded-md bg-gray-800/50", children: [_jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: exec.avatar, alt: exec.name }), _jsx(AvatarFallback, { className: "bg-purple-900 text-white", children: exec.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("") })] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-white", children: exec.name }), _jsx("div", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${vote.choice === "option_a"
                                                                    ? "bg-purple-950/70 text-purple-300"
                                                                    : "bg-blue-950/70 text-blue-300"}`, children: vote.choice === "option_a" ? "Aggressive" : "Cautious" })] }), _jsx("div", { className: "flex items-center justify-between mt-0.5", children: _jsxs("span", { className: "text-xs text-gray-400", children: [vote.confidence, "% confidence"] }) })] })] }, vote.executiveId));
                                }) })] })] })] }));
};
export default ExecutiveVotingResult;
