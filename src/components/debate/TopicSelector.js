"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var label_1 = require("@/components/ui/label");
var command_1 = require("@/components/ui/command");
var popover_1 = require("@/components/ui/popover");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var TopicSelector = function (_a) {
  var _b;
  var selectedTopic = _a.selectedTopic,
    _c = _a.debateTopics,
    debateTopics = _c === void 0 ? [] : _c, // Ensure this has a default value to prevent the iterator error
    onTopicChange = _a.onTopicChange;
  var _d = react_1.default.useState(false),
    open = _d[0],
    setOpen = _d[1];
  // Ensure debateTopics is an array before trying to find in it
  var currentTopic = Array.isArray(debateTopics)
    ? (_b = debateTopics.find(function (topic) {
        return topic.id === selectedTopic;
      })) === null || _b === void 0
      ? void 0
      : _b.topic
    : "";
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-2",
    children: [
      (0, jsx_runtime_1.jsx)(label_1.Label, {
        htmlFor: "topic",
        children: "Topic",
      }),
      (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
        open: open,
        onOpenChange: setOpen,
        children: [
          (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
            asChild: true,
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              role: "combobox",
              "aria-expanded": open,
              className: "w-full justify-between",
              children: [
                currentTopic || "Select a topic...",
                (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronsUpDown, {
                  className: "ml-2 h-4 w-4 shrink-0 opacity-50",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
            className: "w-full p-0",
            children: (0, jsx_runtime_1.jsxs)(command_1.Command, {
              children: [
                (0, jsx_runtime_1.jsx)(command_1.CommandInput, {
                  placeholder: "Search topics...",
                }),
                (0, jsx_runtime_1.jsx)(command_1.CommandEmpty, {
                  children: "No topic found.",
                }),
                Array.isArray(debateTopics) && debateTopics.length > 0
                  ? (0, jsx_runtime_1.jsx)(command_1.CommandGroup, {
                      children: (0, jsx_runtime_1.jsx)(command_1.CommandList, {
                        children: debateTopics.map(function (topic) {
                          return (0, jsx_runtime_1.jsxs)(
                            command_1.CommandItem,
                            {
                              value: topic.id,
                              onSelect: function () {
                                onTopicChange(topic.id);
                                setOpen(false);
                              },
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                                  className: (0, utils_1.cn)(
                                    "mr-2 h-4 w-4",
                                    selectedTopic === topic.id
                                      ? "opacity-100"
                                      : "opacity-0",
                                  ),
                                }),
                                topic.topic,
                              ],
                            },
                            topic.id,
                          );
                        }),
                      }),
                    })
                  : (0, jsx_runtime_1.jsx)("div", {
                      className: "py-6 text-center text-sm",
                      children: "No debate topics available",
                    }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
exports.default = TopicSelector;
