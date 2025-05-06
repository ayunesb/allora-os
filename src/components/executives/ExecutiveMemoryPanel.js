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
import { fetchRecentMemories } from "@/services/memoryService";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { Brain } from "lucide-react";
export function ExecutiveMemoryPanel() {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    useEffect(() => {
        function loadMemories() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(user === null || user === void 0 ? void 0 : user.id))
                    return;
                setLoading(true);
                try {
                    const recentMemories = yield fetchRecentMemories(user.id, undefined, 5);
                    setMemories(recentMemories);
                }
                catch (error) {
                    console.error("Failed to load executive memories:", error);
                }
                finally {
                    setLoading(false);
                }
            });
        }
        loadMemories();
        // Refresh memories every minute
        const interval = setInterval(loadMemories, 60000);
        return () => clearInterval(interval);
    }, [user === null || user === void 0 ? void 0 : user.id]);
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Brain, { className: "mr-2 h-5 w-5" }), "Executive Memory"] }), _jsx(CardDescription, { children: "Recent decisions across all executives" })] }), _jsx(CardContent, { children: loading ? (_jsx("div", { className: "py-4 text-center text-muted-foreground", children: "Loading memories..." })) : memories.length === 0 ? (_jsx("div", { className: "py-4 text-center text-muted-foreground", children: "No executive memories yet. Memories will appear here as your executives make decisions." })) : (_jsx("div", { className: "space-y-4", children: memories.map((memory) => (_jsxs("div", { className: "border-b pb-3 last:border-0", children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "font-medium", children: memory.executive_name }), _jsx("span", { className: "text-xs text-muted-foreground", children: memory.timestamp &&
                                            formatDistanceToNow(new Date(memory.timestamp), {
                                                addSuffix: true,
                                            }) })] }), _jsxs("p", { className: "text-sm mb-1", children: [_jsx("span", { className: "text-muted-foreground", children: "Task:" }), " ", memory.task] }), _jsxs("p", { className: "text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Decision:" }), " ", memory.decision] })] }, memory.id))) })) })] }));
}
