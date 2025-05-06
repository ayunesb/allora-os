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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { fetchRecentMemories } from "@/services/memoryService";
import { formatDistanceToNow } from "date-fns";
import { Brain } from "lucide-react";
export function ExecutiveMemory({ executiveName }) {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    useEffect(() => {
        function loadMemories() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(user === null || user === void 0 ? void 0 : user.id))
                    return;
                setLoading(true);
                const recentMemories = yield fetchRecentMemories(user.id, executiveName, 10);
                setMemories(recentMemories);
                setLoading(false);
            });
        }
        loadMemories();
    }, [user === null || user === void 0 ? void 0 : user.id, executiveName]);
    if (loading) {
        return (_jsx(Card, { children: _jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Brain, { className: "mr-2 h-5 w-5" }), "Executive Memory"] }), _jsx(CardDescription, { children: "Loading executive memories..." })] }) }));
    }
    if (!memories.length) {
        return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Brain, { className: "mr-2 h-5 w-5" }), "Executive Memory"] }), _jsx(CardDescription, { children: "No memories found for this executive" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "As your AI executives make decisions, they will remember them for future reference." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Brain, { className: "mr-2 h-5 w-5" }), "Executive Memory"] }), _jsx(CardDescription, { children: executiveName
                            ? `${executiveName}'s past decisions`
                            : "Recent decisions across executives" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: memories.map((memory) => (_jsxs("div", { className: "border-b pb-3 last:border-0", children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "font-medium", children: memory.executive_name }), _jsx("span", { className: "text-xs text-muted-foreground", children: memory.timestamp &&
                                            formatDistanceToNow(new Date(memory.timestamp), {
                                                addSuffix: true,
                                            }) })] }), _jsxs("p", { className: "text-sm mb-1", children: [_jsx("span", { className: "text-muted-foreground", children: "Task:" }), " ", memory.task] }), _jsxs("p", { className: "text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Decision:" }), " ", memory.decision] })] }, memory.id))) }) })] }));
}
