import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageTitle } from "@/components/ui/page-title";
import ExecutiveBoard from "@/components/ExecutiveBoard";
export default function Executives() {
    const executives = [
        {
            id: "1",
            name: "AI CEO",
            role: "Chief Executive Officer",
            avatar: "/assets/avatars/ai-ceo.png",
            status: "active",
            specialties: ["Strategy", "Leadership"],
            lastActivity: "Today at 10:30 AM",
        },
        {
            id: "2",
            name: "AI CMO",
            role: "Chief Marketing Officer",
            avatar: "/assets/avatars/ai-cmo.png",
            status: "active",
            specialties: ["Marketing", "Brand Strategy"],
            lastActivity: "Today at 9:45 AM",
        },
        {
            id: "3",
            name: "AI CFO",
            role: "Chief Financial Officer",
            avatar: "/assets/avatars/ai-cfo.png",
            status: "learning",
            specialties: ["Finance", "Budgeting"],
            lastActivity: "Yesterday at 4:15 PM",
        },
    ];
    const handleSelectExecutive = (executiveId) => {
        console.log(`Selected executive: ${executiveId}`);
    };
    return (_jsxs("div", { className: "container mx-auto px-4", children: [_jsx(PageTitle, { title: "Executive Team", description: "Your AI executive team", children: "Executive Team" }), _jsxs("div", { className: "my-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Your AI Executive Team" }), _jsx(ExecutiveBoard, { executives: executives, onSelectExecutive: handleSelectExecutive }), _jsx("button", { onClick: handleSelectExecutive, children: "View Executive" })] })] }));
}
