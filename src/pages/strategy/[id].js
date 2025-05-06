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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";
export default function StrategyDetails() {
    const { id: strategyId } = useParams();
    const [versions, setVersions] = useState([]);
    useEffect(() => {
        function fetchVersions() {
            return __awaiter(this, void 0, void 0, function* () {
                const { data, error } = yield supabase
                    .from("strategy_versions")
                    .select("*")
                    .eq("strategy_id", strategyId)
                    .order("version", { ascending: true });
                if (!error) {
                    setVersions(data || []);
                }
            });
        }
        fetchVersions();
    }, [strategyId]);
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Strategy Versions" }), _jsx("div", { children: versions.map((version, index) => (_jsxs("div", { className: "mb-4 p-4 border rounded", children: [_jsxs("h2", { className: "text-lg font-semibold", children: ["Version ", version.version] }), _jsx("pre", { className: "bg-gray-100 p-2 rounded overflow-auto", children: JSON.stringify(version.changes, null, 2) })] }, version.id))) })] }));
}
