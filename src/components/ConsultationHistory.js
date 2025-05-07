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
import { getUserConsultationHistory } from "@/utils/consultation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, User, Bot } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
export default function ConsultationHistory() {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        function loadConsultations() {
            return __awaiter(this, void 0, void 0, function* () {
                setLoading(true);
                try {
                    const history = yield getUserConsultationHistory();
                    setConsultations(history);
                }
                catch (error) {
                    console.error("Failed to load consultation history:", error);
                }
                finally {
                    setLoading(false);
                }
            });
        }
        loadConsultations();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center p-8", children: _jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }) }));
    }
    if (consultations.length === 0) {
        return (_jsx(Card, { children: _jsxs(CardContent, { className: "flex flex-col items-center justify-center p-8 text-center", children: [_jsx(MessageSquare, { className: "h-12 w-12 text-muted-foreground mb-4" }), _jsx("h3", { className: "text-lg font-medium mb-2", children: "No consultations yet" }), _jsx("p", { className: "text-muted-foreground", children: "Your conversations with executive advisors will appear here" })] }) }));
    }
    return (_jsx("div", { className: "space-y-6", children: consultations.map((consultation) => (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx("span", { children: consultation.botName }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["(", consultation.botRole, ")"] })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Calendar, { className: "h-3 w-3" }), _jsx("span", { children: format(new Date(consultation.messages[0].timestamp), "MMM d, yyyy") })] })] }), _jsx(CardContent, { children: _jsx(ScrollArea, { className: "h-[200px] rounded-md border p-4", children: consultation.messages.map((message, index) => (_jsxs("div", { className: "mb-4 last:mb-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [message.type === "user" ? (_jsx(User, { className: "h-4 w-4 text-primary" })) : (_jsx(Bot, { className: "h-4 w-4 text-primary" })), _jsx("span", { className: "text-xs font-medium", children: message.type === "user" ? "You" : consultation.botName }), _jsx("span", { className: "text-xs text-muted-foreground", children: format(new Date(message.timestamp), "h:mm a") })] }), _jsx("p", { className: "text-sm pl-6", children: message.content }), index < consultation.messages.length - 1 && (_jsx(Separator, { className: "my-2" }))] }, index))) }) })] }, consultation.id))) }));
}
