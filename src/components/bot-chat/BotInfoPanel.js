import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const BotInfoPanel = ({ bot, description: propDescription, specialties: propSpecialties, expertise: propExpertise, }) => {
    // Use props if provided, otherwise use bot object
    const description = propDescription || (bot === null || bot === void 0 ? void 0 : bot.description);
    const specialties = propSpecialties || (bot === null || bot === void 0 ? void 0 : bot.specialties);
    const expertise = propExpertise || (bot === null || bot === void 0 ? void 0 : bot.expertise);
    if (!bot && !description && !expertise) {
        return (_jsx(Card, { className: "h-full", children: _jsx(CardContent, { className: "pt-6", children: _jsx("div", { className: "text-center text-muted-foreground", children: "No bot information available" }) }) }));
    }
    return (_jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg font-medium", children: (bot === null || bot === void 0 ? void 0 : bot.name) ? `About ${bot.name}` : "Bot Information" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [(bot === null || bot === void 0 ? void 0 : bot.avatar) && (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "relative h-20 w-20 rounded-full overflow-hidden", children: _jsx("img", { src: bot.avatar, alt: bot.name, className: "object-cover w-full h-full" }) }) })), description && (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-1", children: "About" }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] })), expertise && (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-1", children: "Expertise" }), _jsx(Badge, { variant: "outline", className: "bg-primary/10 text-primary", children: expertise })] })), specialties && specialties.length > 0 && (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Specialties" }), _jsx("div", { className: "flex flex-wrap gap-2", children: specialties.map((specialty, index) => (_jsx(Badge, { variant: "outline", children: specialty }, index))) })] }))] }) })] }));
};
export default BotInfoPanel;
