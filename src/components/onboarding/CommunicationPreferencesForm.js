import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { toast } from "sonner";
import { useAccessibility } from "@/context/AccessibilityContext";
// Sales style preferences
const salesStyles = [
    { value: "consultative", label: "Consultative" },
    { value: "hard_selling", label: "Hard Selling" },
    { value: "inbound_focused", label: "Inbound Focused" },
    { value: "product_led", label: "Product-Led Growth" },
    { value: "relationship_based", label: "Relationship-Based Selling" },
];
// Communication channels options
const communicationChannels = [
    { id: "email", label: "Email", key: "emailEnabled" },
    { id: "whatsapp", label: "WhatsApp", key: "whatsAppEnabled" },
    { id: "phone", label: "Phone Calls", key: "phoneEnabled" },
    { id: "zoom", label: "Zoom Meetings", key: "zoomEnabled" },
];
export function CommunicationPreferencesForm({ companyDetails, updateCompanyDetails, }) {
    const { highContrast, screenReaderFriendly } = useAccessibility();
    // Handle toggling communication channels
    const toggleChannel = (channelKey) => {
        updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { [channelKey]: !companyDetails[channelKey] }));
        // Also update the channels array to keep both in sync
        const channels = companyDetails.communicationChannels || [];
        const channelId = channelKey.replace("Enabled", "").toLowerCase();
        if (!companyDetails[channelKey]) {
            updateCompanyDetails({
                communicationChannels: [...channels, channelId],
            });
            toast.success(`${channelId.charAt(0).toUpperCase() + channelId.slice(1)} channel enabled`);
        }
        else {
            updateCompanyDetails({
                communicationChannels: channels.filter((c) => c !== channelId),
            });
            toast.info(`${channelId.charAt(0).toUpperCase() + channelId.slice(1)} channel disabled`);
        }
    };
    // Handle changing sales style
    const handleSalesStyleChange = (value) => {
        updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { salesStylePreference: value }));
        // Show success toast
        const selectedStyle = salesStyles.find((style) => style.value === value);
        if (selectedStyle) {
            toast.success(`Sales style updated to: ${selectedStyle.label}`);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Communication Preferences" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Tell us how you prefer to communicate with your customers and partners." })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium mb-3", children: "Preferred Communication Channels" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", role: screenReaderFriendly ? "group" : undefined, "aria-label": screenReaderFriendly ? "Communication channel options" : undefined, children: communicationChannels.map((channel) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: channel.id, checked: !!companyDetails[channel.key], onCheckedChange: () => toggleChannel(channel.key), "aria-label": `Enable ${channel.label}` }), _jsx("label", { htmlFor: channel.id, className: `text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${highContrast ? "text-foreground" : ""}`, children: channel.label })] }, channel.id))) })] }), _jsxs("div", { className: "space-y-2 pt-2", children: [_jsx(Label, { htmlFor: "sales-style", children: "Sales Style Preference" }), _jsxs(Select, { value: companyDetails.salesStylePreference || "", onValueChange: handleSalesStyleChange, "aria-label": "Select your sales style preference", children: [_jsx(SelectTrigger, { id: "sales-style", children: _jsx(SelectValue, { placeholder: "Select sales style" }) }), _jsx(SelectContent, { children: salesStyles.map((style) => (_jsx(SelectItem, { value: style.value, children: style.label }, style.value))) })] }), !companyDetails.salesStylePreference && (_jsx("p", { className: "text-xs text-amber-500 mt-1", children: "Please select a sales style preference to continue" }))] })] })] }));
}
