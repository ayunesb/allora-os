"use strict";
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
exports.default = CallsHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var useCommunications_1 = require("@/hooks/useCommunications");
function CallsHeader() {
  var _a = (0, useCommunications_1.useCommunications)(),
    upcomingCommunications = _a.upcomingCommunications,
    pastCommunications = _a.pastCommunications;
  var stats = (0, react_1.useMemo)(
    function () {
      var totalCommunications =
        upcomingCommunications.length + pastCommunications.length;
      var completedCommunications = pastCommunications.filter(function (c) {
        return c.status === "completed";
      }).length;
      var scheduledCommunications = upcomingCommunications.length;
      var phoneCalls = __spreadArray(
        __spreadArray([], upcomingCommunications, true),
        pastCommunications,
        true,
      ).filter(function (c) {
        return c.type === "phone";
      }).length;
      var zoomMeetings = __spreadArray(
        __spreadArray([], upcomingCommunications, true),
        pastCommunications,
        true,
      ).filter(function (c) {
        return c.type === "zoom";
      }).length;
      var whatsappChats = __spreadArray(
        __spreadArray([], upcomingCommunications, true),
        pastCommunications,
        true,
      ).filter(function (c) {
        return c.type === "whatsapp";
      }).length;
      return {
        totalCommunications: totalCommunications,
        completedCommunications: completedCommunications,
        scheduledCommunications: scheduledCommunications,
        phoneCalls: phoneCalls,
        zoomMeetings: zoomMeetings,
        whatsappChats: whatsappChats,
      };
    },
    [upcomingCommunications, pastCommunications],
  );
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold tracking-tight",
            children: "Client Communications",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground",
            children:
              "Manage all your communications with leads and clients in one place",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-1 text-primary",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                    className: "h-3 w-3 sm:h-4 sm:w-4",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-xs sm:text-sm font-medium",
                    children: stats.phoneCalls,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs text-muted-foreground mt-1 hidden sm:block",
                children: "Phone Calls",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-1 text-primary",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Video, {
                    className: "h-3 w-3 sm:h-4 sm:w-4",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-xs sm:text-sm font-medium",
                    children: stats.zoomMeetings,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs text-muted-foreground mt-1 hidden sm:block",
                children: "Zoom Meetings",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-1 text-primary",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                    className: "h-3 w-3 sm:h-4 sm:w-4",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-xs sm:text-sm font-medium",
                    children: stats.whatsappChats,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs text-muted-foreground mt-1 hidden sm:block",
                children: "WhatsApp Chats",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
