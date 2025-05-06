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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function PluginInspector({ plugin }) {
    const [pluginData, setPluginData] = useState(null);
    useEffect(() => {
        const supabase = createClientComponentClient();
        const fetchPluginData = () => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from("plugin_card_with_xp")
                .select("*")
                .eq("id", plugin.id);
            if (error) {
                console.error("Error fetching plugin data:", error);
            }
            else {
                setPluginData(data[0]);
            }
        });
        fetchPluginData();
    }, [plugin.id]);
    if (!pluginData) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold", children: pluginData.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["XP: ", pluginData.total_xp, " / 100"] }), _jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden mt-1", children: _jsx("div", { className: "h-full bg-green-500 transition-all duration-500", style: {
                        width: `${Math.min((pluginData.total_xp / 100) * 100, 100)}%`,
                    } }) }), pluginData.total_xp >= 100 && (_jsx("span", { className: "text-xs text-yellow-500 font-semibold animate-pulse", children: "\uD83E\uDDEC Ready to evolve" }))] }));
}
