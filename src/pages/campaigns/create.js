"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignBuilder;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var input_2 = require("@/components/ui/input");
var lucide_react_1 = require("lucide-react");
function CampaignBuilder() {
  var _a = (0, react_1.useState)(""),
    campaignName = _a[0],
    setCampaignName = _a[1];
  var _b = (0, react_1.useState)([]),
    blocks = _b[0],
    setBlocks = _b[1];
  var addBlock = function (type) {
    setBlocks(
      __spreadArray(
        __spreadArray([], blocks, true),
        [
          {
            id: crypto.randomUUID(),
            type: type,
            content: "",
            delay: 0,
          },
        ],
        false,
      ),
    );
  };
  var removeBlock = function (id) {
    setBlocks(
      blocks.filter(function (block) {
        return block.id !== id;
      }),
    );
  };
  var updateBlockContent = function (id, content) {
    setBlocks(
      blocks.map(function (block) {
        return block.id === id
          ? __assign(__assign({}, block), { content: content })
          : block;
      }),
    );
  };
  var updateBlockDelay = function (id, delay) {
    setBlocks(
      blocks.map(function (block) {
        return block.id === id
          ? __assign(__assign({}, block), { delay: delay })
          : block;
      }),
    );
  };
  var getBlockIcon = function (type) {
    switch (type) {
      case "email":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, {
          className: "h-5 w-5",
        });
      case "sms":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
          className: "h-5 w-5",
        });
      case "meta":
        return (0, jsx_runtime_1.jsx)("div", {
          className:
            "h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-bold",
          children: "f",
        });
      case "tiktok":
        return (0, jsx_runtime_1.jsx)("div", {
          className:
            "h-5 w-5 rounded-full bg-black flex items-center justify-center text-xs text-white font-bold",
          children: "T",
        });
      default:
        return null;
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container py-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mb-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "\uD83C\uDFAF Visual Campaign Builder",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "Create multi-channel marketing campaigns with drag-and-drop blocks",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            children: "Save Campaign",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mb-6",
        children: (0, jsx_runtime_1.jsx)(input_1.Input, {
          placeholder: "Campaign Name",
          value: campaignName,
          onChange: function (e) {
            return setCampaignName(e.target.value);
          },
          className: "max-w-md",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid md:grid-cols-[1fr_3fr] gap-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-lg font-medium mb-3",
                children: "Blocks",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "space-y-2",
                children: ["email", "sms", "meta", "tiktok"].map(
                  function (type) {
                    return (0, jsx_runtime_1.jsxs)(
                      button_1.Button,
                      {
                        variant: "outline",
                        className: "w-full justify-start",
                        onClick: function () {
                          return addBlock(type);
                        },
                        children: [
                          getBlockIcon(type),
                          (0, jsx_runtime_1.jsxs)("span", {
                            className: "ml-2",
                            children: ["Add ", type.toUpperCase()],
                          }),
                        ],
                      },
                      type,
                    );
                  },
                ),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-lg font-medium mb-3",
                children: "Campaign Flow",
              }),
              blocks.length === 0
                ? (0, jsx_runtime_1.jsx)(card_1.Card, {
                    children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      className: "p-6 text-center text-muted-foreground",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        children:
                          "Add blocks from the left panel to build your campaign flow",
                      }),
                    }),
                  })
                : (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      blocks.map(function (block, index) {
                        return (0, jsx_runtime_1.jsxs)(
                          "div",
                          {
                            className: "relative",
                            children: [
                              index > 0 &&
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "absolute left-1/2 -top-4 transform -translate-x-1/2 flex flex-col items-center",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className: "h-4 w-px bg-border",
                                    }),
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.ArrowRight,
                                      {
                                        className:
                                          "h-4 w-4 text-muted-foreground rotate-90",
                                      },
                                    ),
                                  ],
                                }),
                              (0, jsx_runtime_1.jsx)(card_1.Card, {
                                className: "border-l-4",
                                style: {
                                  borderLeftColor:
                                    block.type === "email"
                                      ? "var(--primary)"
                                      : block.type === "sms"
                                        ? "var(--green-500)"
                                        : block.type === "meta"
                                          ? "var(--blue-500)"
                                          : "var(--violet-500)",
                                },
                                children: (0, jsx_runtime_1.jsxs)(
                                  card_1.CardContent,
                                  {
                                    className: "p-4 pt-4",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between mb-3",
                                        children: [
                                          (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-center",
                                            children: [
                                              getBlockIcon(block.type),
                                              (0, jsx_runtime_1.jsxs)("span", {
                                                className: "ml-2 font-medium",
                                                children: [
                                                  block.type.toUpperCase(),
                                                  " Block",
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, jsx_runtime_1.jsxs)("div", {
                                            className:
                                              "flex items-center space-x-2",
                                            children: [
                                              (0, jsx_runtime_1.jsxs)("div", {
                                                className:
                                                  "flex items-center space-x-1 text-xs text-muted-foreground",
                                                children: [
                                                  (0, jsx_runtime_1.jsx)(
                                                    "span",
                                                    { children: "Wait" },
                                                  ),
                                                  (0, jsx_runtime_1.jsx)(
                                                    input_1.Input,
                                                    {
                                                      type: "number",
                                                      value: block.delay,
                                                      onChange: function (e) {
                                                        return updateBlockDelay(
                                                          block.id,
                                                          parseInt(
                                                            e.target.value,
                                                          ) || 0,
                                                        );
                                                      },
                                                      className:
                                                        "w-16 h-6 text-xs py-0",
                                                      min: "0",
                                                    },
                                                  ),
                                                  (0, jsx_runtime_1.jsx)(
                                                    "span",
                                                    { children: "days" },
                                                  ),
                                                ],
                                              }),
                                              (0, jsx_runtime_1.jsx)(
                                                button_1.Button,
                                                {
                                                  variant: "ghost",
                                                  size: "icon",
                                                  className: "h-7 w-7",
                                                  onClick: function () {
                                                    return removeBlock(
                                                      block.id,
                                                    );
                                                  },
                                                  children: (0,
                                                  jsx_runtime_1.jsx)(
                                                    lucide_react_1.Trash,
                                                    { className: "h-4 w-4" },
                                                  ),
                                                },
                                              ),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)(input_2.Textarea, {
                                        value: block.content,
                                        onChange: function (e) {
                                          return updateBlockContent(
                                            block.id,
                                            e.target.value,
                                          );
                                        },
                                        placeholder: "Enter your ".concat(
                                          block.type,
                                          " content here...",
                                        ),
                                        className: "min-h-[100px]",
                                      }),
                                      block.type === "email" &&
                                        (0, jsx_runtime_1.jsx)("div", {
                                          className: "mt-3",
                                          children: (0, jsx_runtime_1.jsx)(
                                            button_1.Button,
                                            {
                                              variant: "outline",
                                              size: "sm",
                                              children: "Add Subject Line",
                                            },
                                          ),
                                        }),
                                    ],
                                  },
                                ),
                              }),
                            ],
                          },
                          block.id,
                        );
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "outline",
                        className: "w-full",
                        onClick: function () {
                          return addBlock("email");
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                            className: "h-4 w-4 mr-2",
                          }),
                          "Add Block",
                        ],
                      }),
                    ],
                  }),
            ],
          }),
        ],
      }),
    ],
  });
}
