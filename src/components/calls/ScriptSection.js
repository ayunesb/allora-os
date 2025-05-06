"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScriptSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var AiCallScript_1 = require("@/components/calls/AiCallScript");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
function ScriptSection(_a) {
  var title = _a.title,
    scripts = _a.scripts,
    onUseScript = _a.onUseScript,
    type = _a.type,
    _b = _a.isAiSection,
    isAiSection = _b === void 0 ? false : _b;
  var filteredScripts = isAiSection
    ? scripts.filter(function (script) {
        return script.aiGenerated;
      })
    : scripts.filter(function (script) {
        return !script.aiGenerated;
      });
  var _c = (0, react_1.useState)(null),
    viewScriptId = _c[0],
    setViewScriptId = _c[1];
  var _d = (0, react_1.useState)(false),
    scriptDialogOpen = _d[0],
    setScriptDialogOpen = _d[1];
  var handleViewScript = function (scriptId) {
    setViewScriptId(scriptId);
    setScriptDialogOpen(true);
  };
  var currentScript = viewScriptId
    ? filteredScripts.find(function (script) {
        return script.id === viewScriptId;
      })
    : null;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "text-xl font-semibold mb-4",
        children: title,
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        children: isAiSection
          ? // AI Generated scripts
            filteredScripts.map(function (script) {
              return (0, jsx_runtime_1.jsx)(
                AiCallScript_1.default,
                {
                  id: script.id,
                  title: script.title,
                  target: script.target,
                  duration: script.duration,
                  primaryBot: script.primaryBot,
                  collaborators: script.collaborators,
                  content: script.content,
                  onUse: onUseScript,
                  type: type,
                },
                script.id,
              );
            })
          : // Standard scripts
            filteredScripts.map(function (script) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  className: "dashboard-card",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-xl font-bold mb-4",
                      children: script.title,
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2 mb-6",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-gray-400",
                              children: "Target:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: script.target,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-gray-400",
                              children: "Duration:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: script.duration,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-gray-400",
                              children: "Status:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                script.status === "Ready"
                                  ? "text-green-400"
                                  : "text-amber-400",
                              children: script.status,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "flex space-x-2",
                      children:
                        script.status === "Ready"
                          ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                              children: [
                                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                  variant: "outline",
                                  size: "sm",
                                  className: "flex-1",
                                  onClick: function () {
                                    return onUseScript(script.id, script.title);
                                  },
                                  children: [
                                    type === "call"
                                      ? (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Play,
                                          { className: "mr-2 h-4 w-4" },
                                        )
                                      : (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.MessageSquare,
                                          { className: "mr-2 h-4 w-4" },
                                        ),
                                    "Use",
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                  variant: "outline",
                                  size: "sm",
                                  className: "flex-1",
                                  onClick: function () {
                                    return handleViewScript(script.id);
                                  },
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.FileText,
                                      { className: "mr-2 h-4 w-4" },
                                    ),
                                    "View ",
                                    type === "call" ? "Script" : "Template",
                                  ],
                                }),
                              ],
                            })
                          : (0, jsx_runtime_1.jsx)(button_1.Button, {
                              disabled: true,
                              variant: "outline",
                              size: "sm",
                              className: "w-full",
                              children: "Coming Soon",
                            }),
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
                  ],
                },
                script.id,
              );
            }),
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
        open: scriptDialogOpen,
        onOpenChange: setScriptDialogOpen,
        children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, {
          className: "max-w-3xl max-h-[80vh] overflow-y-auto",
          children:
            currentScript &&
            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                      children: currentScript.title,
                    }),
                    (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
                      children:
                        type === "call" ? "Call Script" : "Message Template",
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
                          children: currentScript.target,
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
                          children: currentScript.duration,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "border-t pt-4 mt-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-lg font-medium mb-2",
                          children:
                            type === "call"
                              ? "Script Content"
                              : "Template Content",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "bg-muted/30 rounded-md p-4 whitespace-pre-line",
                          children:
                            currentScript.content ||
                            (type === "call"
                              ? "# "
                                  .concat(
                                    currentScript.title,
                                    "\n\n## Introduction\n- Greet the prospect warmly and introduce yourself and your company\n- Briefly explain the purpose of your call\n\n## Value Proposition\n- Present your main value proposition tailored to ",
                                  )
                                  .concat(
                                    currentScript.target,
                                    "\n- Highlight 2-3 key benefits\n\n## Questions to Ask\n- What challenges are they currently facing?\n- How are they currently solving these problems?\n- What would an ideal solution look like for them?\n\n## Addressing Objections\n- Price: Focus on ROI and long-term value\n- Timing: Emphasize opportunity cost of delay\n- Need to consult others: Offer to schedule a follow-up with all stakeholders\n\n## Call to Action\n- Schedule a demo/follow-up meeting\n- Send additional information\n- Confirm next steps\n\n## Closing\n- Thank them for their time\n- Restate any commitments made\n- Provide your contact information",
                                  )
                              : "# ".concat(
                                  currentScript.title,
                                  "\n\nHi [Name],\n\nI hope this message finds you well. I'm reaching out regarding our business platform that has been helping companies like yours achieve significant growth.\n\n## Key Points\n- Our platform provides personalized strategic advice for businesses in your industry\n- We've analyzed market trends and created recommendations specifically for companies like yours\n- Clients implementing our strategies have seen an average 20% improvement in key metrics\n\n## Next Steps\nI'd love to schedule a brief call to discuss how our solution could specifically benefit your business. Would you be available for a 15-minute conversation this week?\n\nBest regards,\n[Your Name]\n[Your Contact Information]",
                                )),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
        }),
      }),
    ],
  });
}
