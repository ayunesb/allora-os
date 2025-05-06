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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/exportUtils";
import { RefreshCw } from "lucide-react";
export function LogsPanel({ maxLogs = 100, showFilters = true, tenantId }) {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [actionType, setActionType] = useState("");
    const [result, setResult] = useState("");
    const fetchLogs = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            let query = supabase
                .from("audit_logs")
                .select("*")
                .order("timestamp", { ascending: false })
                .limit(maxLogs);
            // Apply filters
            if (tenantId) {
                query = query.eq("tenant_id", tenantId);
            }
            if (actionType) {
                query = query.eq("action", actionType);
            }
            if (result) {
                query = query.eq("result", result);
            }
            const { data, error } = yield query;
            if (error)
                throw error;
            setLogs(data || []);
        }
        catch (error) {
            console.error("Failed to fetch logs:", error);
        }
        finally {
            setIsLoading(false);
        }
    });
    useEffect(() => {
        fetchLogs();
    }, [tenantId, actionType, result]);
    // Filter logs based on search input
    const filteredLogs = filter
        ? logs.filter((log) => JSON.stringify(log).toLowerCase().includes(filter.toLowerCase()))
        : logs;
    // Extract unique action types for filter dropdown
    const actionTypes = [...new Set(logs.map((log) => log.action))];
    const resultTypes = [
        ...new Set(logs.map((log) => log.result).filter(Boolean)),
    ];
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [_jsx(CardTitle, { children: "Activity Logs" }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: fetchLogs, disabled: isLoading, children: [_jsx(RefreshCw, { className: `h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}` }), isLoading ? "Loading..." : "Refresh"] })] }), _jsxs(CardContent, { children: [showFilters && (_jsxs("div", { className: "flex flex-col gap-4 mb-6 sm:flex-row", children: [_jsx(Input, { placeholder: "Filter logs...", value: filter, onChange: (e) => setFilter(e.target.value), className: "sm:max-w-[220px]" }), _jsxs(Select, { value: actionType, onValueChange: setActionType, children: [_jsx(SelectTrigger, { className: "sm:max-w-[180px]", children: _jsx(SelectValue, { placeholder: "Action Type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "", children: "All Actions" }), actionTypes.map((type) => (_jsx(SelectItem, { value: type, children: type }, type)))] })] }), _jsxs(Select, { value: result, onValueChange: setResult, children: [_jsx(SelectTrigger, { className: "sm:max-w-[180px]", children: _jsx(SelectValue, { placeholder: "Result" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "", children: "All Results" }), resultTypes.map((type) => (_jsx(SelectItem, { value: type, children: type }, type)))] })] })] })), isLoading ? (_jsx("div", { className: "py-10 text-center", children: _jsx("p", { className: "text-muted-foreground", children: "Loading logs..." }) })) : filteredLogs.length === 0 ? (_jsx("div", { className: "py-10 text-center", children: _jsx("p", { className: "text-muted-foreground", children: "No logs found" }) })) : (_jsx("div", { className: "space-y-3", children: filteredLogs.map((log) => (_jsxs(Card, { className: "p-3 text-sm", children: [_jsxs("div", { className: "flex flex-wrap justify-between gap-2 mb-1", children: [_jsxs("span", { className: "font-semibold", children: [log.action, " ", log.resource && `- ${log.resource}`] }), _jsx("span", { className: "text-muted-foreground", children: formatDate(log.timestamp) })] }), log.result && (_jsx("div", { className: `inline-flex px-2 py-0.5 rounded-full text-xs ${log.result === "success"
                                        ? "bg-green-100 text-green-800"
                                        : log.result === "error"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-gray-100 text-gray-800"}`, children: log.result })), log.details && (_jsx("pre", { className: "mt-2 p-2 bg-muted text-xs overflow-auto rounded max-h-28", children: typeof log.details === "object"
                                        ? JSON.stringify(log.details, null, 2)
                                        : log.details }))] }, log.id))) }))] })] }));
}
