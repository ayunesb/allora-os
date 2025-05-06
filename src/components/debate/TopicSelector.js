import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
const TopicSelector = ({ selectedTopic, debateTopics = [], // Ensure this has a default value to prevent the iterator error
onTopicChange, }) => {
    var _a;
    const [open, setOpen] = React.useState(false);
    // Ensure debateTopics is an array before trying to find in it
    const currentTopic = Array.isArray(debateTopics)
        ? (_a = debateTopics.find((topic) => topic.id === selectedTopic)) === null || _a === void 0 ? void 0 : _a.topic
        : "";
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "topic", children: "Topic" }), _jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: "w-full justify-between", children: [currentTopic || "Select a topic...", _jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })] }) }), _jsx(PopoverContent, { className: "w-full p-0", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search topics..." }), _jsx(CommandEmpty, { children: "No topic found." }), Array.isArray(debateTopics) && debateTopics.length > 0 ? (_jsx(CommandGroup, { children: _jsx(CommandList, { children: debateTopics.map((topic) => (_jsxs(CommandItem, { value: topic.id, onSelect: () => {
                                                onTopicChange(topic.id);
                                                setOpen(false);
                                            }, children: [_jsx(Check, { className: cn("mr-2 h-4 w-4", selectedTopic === topic.id
                                                        ? "opacity-100"
                                                        : "opacity-0") }), topic.topic] }, topic.id))) }) })) : (_jsx("div", { className: "py-6 text-center text-sm", children: "No debate topics available" }))] }) })] })] }));
};
export default TopicSelector;
