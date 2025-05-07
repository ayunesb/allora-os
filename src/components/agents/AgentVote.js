import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThumbsUp, ThumbsDown } from "lucide-react";
export default function AgentVote({ onVote }) {
    return (_jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: () => onVote(true), className: "hover:text-green-400", children: _jsx(ThumbsUp, {}) }), _jsx("button", { onClick: () => onVote(false), className: "hover:text-red-400", children: _jsx(ThumbsDown, {}) })] }));
}
