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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
export default function PluginDetailPage() {
    const { id } = useParams();
    const [plugin, setPlugin] = useState(null);
    useEffect(() => {
        if (id) {
            function fetchPlugin() {
                return __awaiter(this, void 0, void 0, function* () {
                    const { data } = yield supabase
                        .from("plugins")
                        .select("*")
                        .eq("id", id)
                        .single();
                    setPlugin(data);
                });
            }
            fetchPlugin();
        }
    }, [id]);
    if (!plugin)
        return _jsx("div", { className: "p-4 text-white", children: "Loading..." });
    return (_jsxs("div", { className: "p-6 text-white", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: plugin.name }), _jsx("p", { children: plugin.description })] }));
}
