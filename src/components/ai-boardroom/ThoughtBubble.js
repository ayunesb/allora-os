import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const ThoughtBubble = ({ reaction, executives }) => {
    const executive = executives.find((e) => e.id === reaction.executiveId);
    if (!executive)
        return null;
    // Position the thought bubble near the right edge
    const positionStyle = {
        right: "20px",
        top: "10px",
    };
    return (_jsxs(motion.div, { className: "absolute z-10 flex items-start gap-2", style: positionStyle, initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute -left-2 top-3 w-2 h-2 rotate-45 bg-gray-700" }), _jsx("div", { className: "bg-gray-700 rounded-lg py-1 px-2 text-xs text-white max-w-[150px]", children: reaction.thought })] }), _jsxs(Avatar, { className: "h-6 w-6 border border-gray-800", children: [_jsx(AvatarImage, { src: executive.avatar, alt: executive.name }), _jsx(AvatarFallback, { className: "bg-purple-900 text-white text-xs", children: executive.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("") })] })] }));
};
export default ThoughtBubble;
