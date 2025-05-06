"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunicationActions;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var ZoomScheduler_1 = require("./ZoomScheduler");
var WhatsAppSender_1 = require("./WhatsAppSender");
var PhoneDialer_1 = require("./PhoneDialer");
var AiScriptGenerator_1 = require("./AiScriptGenerator");
function CommunicationActions() {
  var _a = (0, react_1.useState)(""),
    phoneNumber = _a[0],
    setPhoneNumber = _a[1];
  var _b = (0, react_1.useState)("phone"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "h-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Communication Tools",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Call, message, or schedule meetings with leads",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          defaultValue: "phone",
          value: activeTab,
          onValueChange: function (v) {
            return setActiveTab(v);
          },
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "grid w-full grid-cols-4",
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "phone",
                  className: "flex items-center space-x-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", { children: "Call" }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "zoom",
                  className: "flex items-center space-x-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Video, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", { children: "Zoom" }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "whatsapp",
                  className: "flex items-center space-x-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", { children: "WhatsApp" }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "ai",
                  className: "flex items-center space-x-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)("span", { children: "AI" }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "phone",
              children: (0, jsx_runtime_1.jsx)(PhoneDialer_1.default, {
                phoneNumber: phoneNumber,
                onPhoneNumberChange: setPhoneNumber,
              }),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "zoom",
              children: (0, jsx_runtime_1.jsx)(ZoomScheduler_1.default, {}),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "whatsapp",
              children: (0, jsx_runtime_1.jsx)(WhatsAppSender_1.default, {
                phoneNumber: phoneNumber,
                onPhoneNumberChange: setPhoneNumber,
              }),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "ai",
              children: (0, jsx_runtime_1.jsx)(AiScriptGenerator_1.default, {}),
            }),
          ],
        }),
      }),
    ],
  });
}
