import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useCeoSelection } from "@/hooks/useCeoSelection";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export function CeoMessageHeader() {
    var _a;
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    const { selectedCeo } = useCeoSelection();
    const companyName = ((_a = auth.profile) === null || _a === void 0 ? void 0 : _a.company) || "Your Company";
    return (_jsxs("div", { className: "flex items-start gap-4", children: [_jsxs(Avatar, { className: "h-12 w-12 border-2 border-primary/20", children: [_jsx(AvatarImage, { src: "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png", alt: selectedCeo.name }), _jsx(AvatarFallback, { className: "bg-primary/10", children: selectedCeo.name.charAt(0) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold mb-1 flex items-center", children: ["Message from Your Virtual CEO", _jsx("span", { className: "ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full", children: "AI Generated" })] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Personalized strategic guidance for ", companyName, " from", " ", selectedCeo.name, ", your AI Executive"] })] })] }));
}
