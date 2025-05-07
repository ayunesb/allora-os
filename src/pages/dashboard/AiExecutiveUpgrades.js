import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpgradeExecutiveBot } from "@/components/ai-executives/UpgradeExecutiveBot";
import { UpgradeAllExecutives } from "@/components/ai-executives/UpgradeAllExecutives";
import { executiveBots } from "@/backend/executiveBots";
import { formatRoleTitle } from "@/utils/consultation/botRoleUtils";
export default function AiExecutiveUpgrades() {
    const [activeTab, setActiveTab] = useState("ceo");
    const [upgradedBots, setUpgradedBots] = useState([]);
    const handleUpgradeComplete = (upgradedBot) => {
        setUpgradedBots((prev) => {
            // Remove any existing entry for this bot
            const filtered = prev.filter((bot) => bot.name !== upgradedBot.name);
            // Add the new upgraded bot
            return [...filtered, upgradedBot];
        });
    };
    const handleBulkUpgradeComplete = (newUpgradedBots) => {
        setUpgradedBots((prev) => {
            // Create a map of existing bots for easy lookup
            const existingBots = new Map(prev.map((bot) => [bot.name, bot]));
            // Merge with new bots, overwriting any existing entries
            for (const bot of newUpgradedBots) {
                existingBots.set(bot.name, bot);
            }
            return Array.from(existingBots.values());
        });
    };
    // Check if a bot is upgraded
    const isBotUpgraded = (botName) => {
        return upgradedBots.some((bot) => bot.name === botName);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "AI Executive Upgrades - Allora AI" }) }), _jsx("div", { className: "container mx-auto px-4 py-6", children: _jsxs("div", { className: "flex flex-col space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "AI Executive Upgrades" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Upgrade your AI executives with the Allora Executive OS and personalized cognitive enhancements" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx("div", { className: "md:col-span-2", children: _jsxs(Tabs, { defaultValue: "ceo", onValueChange: setActiveTab, className: "w-full", children: [_jsx("div", { className: "flex justify-between items-center mb-4", children: _jsx(TabsList, { children: Object.keys(executiveBots).map((role) => (_jsx(TabsTrigger, { value: role, className: "capitalize", children: role }, role))) }) }), Object.entries(executiveBots).map(([role, bots]) => (_jsx(TabsContent, { value: role, className: "mt-0", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: bots.map((botName) => (_jsx(UpgradeExecutiveBot, { botName: botName, botRole: formatRoleTitle(role), onUpgradeComplete: handleUpgradeComplete }, `${role}-${botName}`))) }) }, role)))] }) }), _jsxs("div", { className: "space-y-6", children: [_jsx(UpgradeAllExecutives, { onUpgradeComplete: handleBulkUpgradeComplete }), _jsxs("div", { className: "border border-border rounded-lg p-4", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Executive OS Features" }), _jsxs("ul", { className: "space-y-2 text-sm", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0", children: "1" }), _jsx("span", { children: "First Principles & OODA Loop Thinking Models" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0", children: "2" }), _jsx("span", { children: "Daily Decision Frameworks & Eisenhower Matrix" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0", children: "3" }), _jsx("span", { children: "5-Level Delegation System" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0", children: "4" }), _jsx("span", { children: "Crisis Management & Strategic Sprints" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0", children: "5" }), _jsx("span", { children: "Personalized Cognitive Boosts & Mental Models" })] })] })] })] })] })] }) })] }));
}
