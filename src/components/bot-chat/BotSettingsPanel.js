import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
const BotSettingsPanel = ({ botId, bot, onSettingChange }) => {
    const settings = (bot === null || bot === void 0 ? void 0 : bot.settings) || {
        autoRespond: false,
        proactiveInsights: true,
        responseLength: 50,
        creativityLevel: 70,
    };
    const handleToggleChange = (setting, checked) => {
        if (onSettingChange) {
            onSettingChange(setting, checked);
        }
    };
    const handleSliderChange = (setting, value) => {
        if (onSettingChange) {
            onSettingChange(setting, value[0]);
        }
    };
    return (_jsx(Card, { className: "h-full", children: _jsx(CardContent, { className: "pt-6 space-y-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "auto-respond", children: "Automatic Responses" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Allow this bot to respond proactively to relevant discussions" })] }), _jsx(Switch, { id: "auto-respond", checked: settings.autoRespond, onCheckedChange: (checked) => handleToggleChange("autoRespond", checked) })] }), _jsx(Separator, {}), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "proactive-insights", children: "Proactive Insights" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Let the bot suggest ideas based on your company data" })] }), _jsx(Switch, { id: "proactive-insights", checked: settings.proactiveInsights, onCheckedChange: (checked) => handleToggleChange("proactiveInsights", checked) })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { children: "Response Length" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Controls how detailed the responses will be" }), _jsxs("div", { className: "pt-2", children: [_jsx(Slider, { defaultValue: [settings.responseLength || 50], max: 100, step: 10, onValueChange: (value) => handleSliderChange("responseLength", value) }), _jsxs("div", { className: "flex justify-between mt-1 text-xs text-muted-foreground", children: [_jsx("span", { children: "Concise" }), _jsx("span", { children: "Detailed" })] })] })] }), _jsxs("div", { className: "space-y-1.5 pt-2", children: [_jsx(Label, { children: "Creativity Level" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Controls how creative versus factual the responses will be" }), _jsxs("div", { className: "pt-2", children: [_jsx(Slider, { defaultValue: [settings.creativityLevel || 70], max: 100, step: 10, onValueChange: (value) => handleSliderChange("creativityLevel", value) }), _jsxs("div", { className: "flex justify-between mt-1 text-xs text-muted-foreground", children: [_jsx("span", { children: "Factual" }), _jsx("span", { children: "Creative" })] })] })] })] })] }) }) }));
};
export default BotSettingsPanel;
