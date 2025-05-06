"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AiCallScript;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var avatar_1 = require("@/components/ui/avatar");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var useCallScriptTracking_1 = require("@/hooks/useCallScriptTracking");
var AiCallScriptFeedback_1 = require("./AiCallScriptFeedback");
var dialog_1 = require("@/components/ui/dialog");
function AiCallScript(_a) {
  var id = _a.id,
    title = _a.title,
    target = _a.target,
    duration = _a.duration,
    primaryBot = _a.primaryBot,
    _b = _a.collaborators,
    collaborators = _b === void 0 ? [] : _b,
    content = _a.content,
    onUse = _a.onUse,
    type = _a.type;
  var _c = (0, useCallScriptTracking_1.useCallScriptTracking)(),
    trackScriptUse = _c.trackScriptUse,
    trackScriptView = _c.trackScriptView;
  var _d = (0, react_1.useState)(false),
    scriptDialogOpen = _d[0],
    setScriptDialogOpen = _d[1];
  var handleUse = function () {
    trackScriptUse(id, title, type, primaryBot);
    onUse(id, title);
  };
  var handleViewScript = function () {
    trackScriptView(id, title, type);
    setScriptDialogOpen(true);
  };
  // Track view when component renders
  react_1.default.useEffect(
    function () {
      trackScriptView(id, title, type);
    },
    [id, title, type, trackScriptView],
  );
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "border rounded-lg p-4 bg-card h-full flex flex-col",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-3 items-start mb-3",
            children: [
              (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                className: "h-10 w-10 border border-primary/20",
                children: [
                  (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                    src: "/avatars/".concat(
                      primaryBot.name.toLowerCase().replace(/\s+/g, "-"),
                      ".png",
                    ),
                    alt: primaryBot.name,
                  }),
                  (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                    children: primaryBot.name.charAt(0),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "font-semibold mb-1 pr-6",
                    children: title,
                  }),
                  (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                    variant: "outline",
                    className: "bg-primary/5",
                    children:
                      type === "call" ? "Call Script" : "Message Template",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2 mb-4 text-sm flex-grow",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-muted-foreground",
                    children: "Created by:",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: primaryBot.name,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-muted-foreground",
                    children: "Target:",
                  }),
                  (0, jsx_runtime_1.jsx)("span", { children: target }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-muted-foreground",
                    children: "Duration:",
                  }),
                  (0, jsx_runtime_1.jsx)("span", { children: duration }),
                ],
              }),
              collaborators.length > 0 &&
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-muted-foreground block mb-1",
                      children: "Collaborated with:",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "flex flex-wrap gap-1 mt-1",
                      children: collaborators.map(function (bot, index) {
                        return (0, jsx_runtime_1.jsx)(
                          badge_1.Badge,
                          {
                            variant: "secondary",
                            className: "text-xs",
                            children: bot.name,
                          },
                          index,
                        );
                      }),
                    }),
                  ],
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex space-x-2 mt-auto",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "default",
                size: "sm",
                className: "flex-1",
                onClick: handleUse,
                children: [
                  type === "call"
                    ? (0, jsx_runtime_1.jsx)(lucide_react_1.Play, {
                        className: "mr-2 h-4 w-4",
                      })
                    : (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                        className: "mr-2 h-4 w-4",
                      }),
                  "Use",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                size: "sm",
                className: "flex-1",
                onClick: handleViewScript,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "View ",
                  type === "call" ? "Script" : "Template",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-end mt-2",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "ghost",
              size: "sm",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                  className: "mr-2 h-4 w-4",
                }),
                "Download",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(AiCallScriptFeedback_1.default, {
            id: id,
            title: title,
            type: type,
            primaryBot: primaryBot,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
        open: scriptDialogOpen,
        onOpenChange: setScriptDialogOpen,
        children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
          className: "max-w-3xl max-h-[80vh] overflow-y-auto",
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                  children: title,
                }),
                (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, {
                  children: [
                    type === "call" ? "Call Script" : "Message Template",
                    " created by ",
                    primaryBot.name,
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "mt-4 space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between text-sm",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-muted-foreground",
                      children: "Target:",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "font-medium",
                      children: target,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between text-sm",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-muted-foreground",
                      children: "Duration:",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "font-medium",
                      children: duration,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "border-t pt-4 mt-4",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-medium mb-2",
                      children:
                        type === "call" ? "Script Content" : "Template Content",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "bg-muted/30 rounded-md p-4 whitespace-pre-line",
                      children:
                        content ||
                        (type === "call"
                          ? "# "
                              .concat(
                                title,
                                "\n\n## Introduction\n- Greet the prospect warmly and introduce yourself and ",
                              )
                              .concat(
                                primaryBot.name,
                                "'s company\n- Briefly explain the purpose of your call\n\n## Value Proposition\n- Present your main value proposition tailored to ",
                              )
                              .concat(
                                target,
                                "\n- Highlight 2-3 key benefits\n\n## Questions to Ask\n- What challenges are they currently facing?\n- How are they currently solving these problems?\n- What would an ideal solution look like for them?\n\n## Addressing Objections\n- Price: Focus on ROI and long-term value\n- Timing: Emphasize opportunity cost of delay\n- Need to consult others: Offer to schedule a follow-up with all stakeholders\n\n## Call to Action\n- Schedule a demo/follow-up meeting\n- Send additional information\n- Confirm next steps\n\n## Closing\n- Thank them for their time\n- Restate any commitments made\n- Provide your contact information",
                              )
                          : "# "
                              .concat(
                                title,
                                "\n\nHi [Name],\n\nI hope this message finds you well. I'm reaching out regarding our AI-powered business strategy platform that has been helping companies like yours achieve significant growth.\n\n## Key Points\n- Our platform provides personalized strategic advice for businesses in your industry\n- ",
                              )
                              .concat(
                                primaryBot.name,
                                " has analyzed market trends and created recommendations specifically for companies like yours\n- Clients implementing our strategies have seen an average 25% improvement in key metrics\n\n## Next Steps\nI'd love to schedule a brief call to discuss how our solution could specifically benefit your business. Would you be available for a 15-minute conversation this week?\n\nAlternatively, I can send you some additional information about our platform if you'd prefer to review it at your convenience.\n\nBest regards,\n[Your Name]\n[Your Contact Information]",
                              )),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
