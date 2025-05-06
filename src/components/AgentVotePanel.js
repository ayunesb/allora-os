import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AgentVotePanel({ logId, agentId, xp, version, onVote }) {
    return (_jsxs("div", { className: "p-4 border rounded shadow", children: [_jsx("h2", { className: "text-lg font-bold", children: "Agent Details" }), _jsxs("p", { children: ["XP: ", xp] }), _jsxs("p", { children: ["Version: ", version] }), _jsxs("div", { className: "mt-4", children: [_jsx("button", { className: "px-4 py-2 bg-green-500 text-white rounded mr-2", onClick: () => onVote("up"), children: "Upvote" }), _jsx("button", { className: "px-4 py-2 bg-red-500 text-white rounded", onClick: () => onVote("down"), children: "Downvote" })] })] }));
}
