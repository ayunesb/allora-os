import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Edit2 } from "lucide-react";
const ParticipantsList = ({ participants = [], // Provide default empty array
onEditParticipants, }) => {
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { children: "Participants" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: onEditParticipants, className: "flex items-center gap-1", children: [_jsx(Edit2, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Edit Team" })] })] }), Array.isArray(participants) && participants.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: participants.map((bot) => (_jsxs("div", { className: "flex items-center space-x-3 p-3 border rounded-md", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: bot.avatar, alt: bot.name }), _jsx(AvatarFallback, { children: bot.name.charAt(0) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium truncate", children: bot.name }), _jsx("p", { className: "text-sm text-muted-foreground truncate", children: bot.title })] })] }, bot.id))) })) : (_jsxs("div", { className: "p-4 border rounded-md text-center", children: [_jsx(Users, { className: "h-6 w-6 text-muted-foreground mx-auto mb-2" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "No participants added yet" })] }))] }));
};
export default ParticipantsList;
