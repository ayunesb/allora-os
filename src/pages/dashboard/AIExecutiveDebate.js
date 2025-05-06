import { jsx as _jsx } from "react/jsx-runtime";
import { DebateGenerator } from "@/components/ai-executive-debate/DebateGenerator";
export default function AIExecutiveDebate() {
    return (_jsx("div", { className: "p-6", children: _jsx(DebateGenerator, {}) }));
}
