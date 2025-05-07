import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";
import { Trash, Plus, Mail, MessageSquare, ArrowRight } from "lucide-react";
export default function CampaignBuilder() {
    const [campaignName, setCampaignName] = useState("");
    const [blocks, setBlocks] = useState([]);
    const addBlock = (type) => {
        setBlocks([
            ...blocks,
            {
                id: crypto.randomUUID(),
                type,
                content: "",
                delay: 0,
            },
        ]);
    };
    const removeBlock = (id) => {
        setBlocks(blocks.filter((block) => block.id !== id));
    };
    const updateBlockContent = (id, content) => {
        setBlocks(blocks.map((block) => (block.id === id ? Object.assign(Object.assign({}, block), { content }) : block)));
    };
    const updateBlockDelay = (id, delay) => {
        setBlocks(blocks.map((block) => (block.id === id ? Object.assign(Object.assign({}, block), { delay }) : block)));
    };
    const getBlockIcon = (type) => {
        switch (type) {
            case "email":
                return _jsx(Mail, { className: "h-5 w-5" });
            case "sms":
                return _jsx(MessageSquare, { className: "h-5 w-5" });
            case "meta":
                return (_jsx("div", { className: "h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-bold", children: "f" }));
            case "tiktok":
                return (_jsx("div", { className: "h-5 w-5 rounded-full bg-black flex items-center justify-center text-xs text-white font-bold", children: "T" }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "container py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83C\uDFAF Visual Campaign Builder" }), _jsx("p", { className: "text-muted-foreground", children: "Create multi-channel marketing campaigns with drag-and-drop blocks" })] }), _jsx(Button, { children: "Save Campaign" })] }), _jsx("div", { className: "mb-6", children: _jsx(Input, { placeholder: "Campaign Name", value: campaignName, onChange: (e) => setCampaignName(e.target.value), className: "max-w-md" }) }), _jsxs("div", { className: "grid md:grid-cols-[1fr_3fr] gap-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium mb-3", children: "Blocks" }), _jsx("div", { className: "space-y-2", children: ["email", "sms", "meta", "tiktok"].map((type) => (_jsxs(Button, { variant: "outline", className: "w-full justify-start", onClick: () => addBlock(type), children: [getBlockIcon(type), _jsxs("span", { className: "ml-2", children: ["Add ", type.toUpperCase()] })] }, type))) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium mb-3", children: "Campaign Flow" }), blocks.length === 0 ? (_jsx(Card, { children: _jsx(CardContent, { className: "p-6 text-center text-muted-foreground", children: _jsx("p", { children: "Add blocks from the left panel to build your campaign flow" }) }) })) : (_jsxs("div", { className: "space-y-4", children: [blocks.map((block, index) => (_jsxs("div", { className: "relative", children: [index > 0 && (_jsxs("div", { className: "absolute left-1/2 -top-4 transform -translate-x-1/2 flex flex-col items-center", children: [_jsx("div", { className: "h-4 w-px bg-border" }), _jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground rotate-90" })] })), _jsx(Card, { className: "border-l-4", style: {
                                                    borderLeftColor: block.type === "email"
                                                        ? "var(--primary)"
                                                        : block.type === "sms"
                                                            ? "var(--green-500)"
                                                            : block.type === "meta"
                                                                ? "var(--blue-500)"
                                                                : "var(--violet-500)",
                                                }, children: _jsxs(CardContent, { className: "p-4 pt-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center", children: [getBlockIcon(block.type), _jsxs("span", { className: "ml-2 font-medium", children: [block.type.toUpperCase(), " Block"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "flex items-center space-x-1 text-xs text-muted-foreground", children: [_jsx("span", { children: "Wait" }), _jsx(Input, { type: "number", value: block.delay, onChange: (e) => updateBlockDelay(block.id, parseInt(e.target.value) || 0), className: "w-16 h-6 text-xs py-0", min: "0" }), _jsx("span", { children: "days" })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7", onClick: () => removeBlock(block.id), children: _jsx(Trash, { className: "h-4 w-4" }) })] })] }), _jsx(Textarea, { value: block.content, onChange: (e) => updateBlockContent(block.id, e.target.value), placeholder: `Enter your ${block.type} content here...`, className: "min-h-[100px]" }), block.type === "email" && (_jsx("div", { className: "mt-3", children: _jsx(Button, { variant: "outline", size: "sm", children: "Add Subject Line" }) }))] }) })] }, block.id))), _jsxs(Button, { variant: "outline", className: "w-full", onClick: () => addBlock("email"), children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Block"] })] }))] })] })] }));
}
