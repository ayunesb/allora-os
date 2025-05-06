"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingZoomMeeting = UpcomingZoomMeeting;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var AuthContext_1 = require("@/context/AuthContext");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
function UpcomingZoomMeeting() {
  var _this = this;
  var _a;
  var _b = (0, react_1.useState)(false),
    hasUpcomingMeeting = _b[0],
    setHasUpcomingMeeting = _b[1];
  var _c = (0, react_1.useState)(null),
    meetingData = _c[0],
    setMeetingData = _c[1];
  var profile = (0, AuthContext_1.useAuth)().profile;
  (0, react_1.useEffect)(
    function () {
      // Check if we should show a demo meeting
      var checkForMeeting = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a,
            meetings,
            error,
            featureFlags,
            meetingTime,
            demoMeeting,
            error_1;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (
                  !(profile === null || profile === void 0
                    ? void 0
                    : profile.company_id)
                )
                  return [2 /*return*/];
                _b.label = 1;
              case 1:
                _b.trys.push([1, 4, , 5]);
                return [
                  4 /*yield*/,
                  client_1.supabase
                    .from("zoom_meetings")
                    .select("*")
                    .eq("company_id", profile.company_id)
                    .gt("meeting_time", new Date().toISOString())
                    .order("meeting_time", { ascending: true })
                    .limit(1),
                ];
              case 2:
                (_a = _b.sent()), (meetings = _a.data), (error = _a.error);
                if (error) throw error;
                if (meetings && meetings.length > 0) {
                  setHasUpcomingMeeting(true);
                  setMeetingData(meetings[0]);
                  return [2 /*return*/];
                }
                return [
                  4 /*yield*/,
                  client_1.supabase
                    .from("feature_flags")
                    .select("*")
                    .eq("feature_name", "demo_zoom_meeting")
                    .eq("is_enabled", true)
                    .limit(1),
                ];
              case 3:
                featureFlags = _b.sent().data;
                if (featureFlags && featureFlags.length > 0) {
                  meetingTime = new Date();
                  meetingTime.setDate(meetingTime.getDate() + 2);
                  meetingTime.setHours(10, 0, 0, 0);
                  demoMeeting = {
                    title: "Strategy Review with AI Executive Team",
                    meeting_time: meetingTime.toISOString(),
                    duration: 45,
                    zoom_url: "https://zoom.us/j/123456789",
                    meeting_id: "123 456 789",
                    password: "allora",
                    host: "AI CEO",
                    company_id: profile.company_id,
                    participants: ["You", "AI CEO", "AI CMO", "AI CTO"],
                  };
                  setHasUpcomingMeeting(true);
                  setMeetingData(demoMeeting);
                }
                return [3 /*break*/, 5];
              case 4:
                error_1 = _b.sent();
                console.error("Error checking for meetings:", error_1);
                return [3 /*break*/, 5];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      };
      checkForMeeting();
    },
    [profile === null || profile === void 0 ? void 0 : profile.company_id],
  );
  var handleCopyMeetingId = function () {
    if (
      meetingData === null || meetingData === void 0
        ? void 0
        : meetingData.meeting_id
    ) {
      navigator.clipboard.writeText(meetingData.meeting_id);
      sonner_1.toast.success("Meeting ID copied to clipboard");
    }
  };
  var handleJoinMeeting = function () {
    if (
      meetingData === null || meetingData === void 0
        ? void 0
        : meetingData.zoom_url
    ) {
      window.open(meetingData.zoom_url, "_blank");
    }
  };
  if (!hasUpcomingMeeting) {
    return null;
  }
  var formatDate = function (dateString) {
    var date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-lg",
            children: "Upcoming Strategy Meeting",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Your next meeting with the AI executive team",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-start gap-3",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.CalendarDays, {
                className: "h-5 w-5 text-primary mt-0.5",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "font-medium",
                    children:
                      (meetingData === null || meetingData === void 0
                        ? void 0
                        : meetingData.title) || "Strategy Review",
                  }),
                  (0, jsx_runtime_1.jsxs)("p", {
                    className: "text-sm text-muted-foreground",
                    children: [
                      meetingData
                        ? formatDate(meetingData.meeting_time)
                        : "Loading...",
                      (
                        meetingData === null || meetingData === void 0
                          ? void 0
                          : meetingData.duration
                      )
                        ? " (".concat(meetingData.duration, " mins)")
                        : "",
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-start gap-3",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                className: "h-5 w-5 text-primary mt-0.5",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "font-medium",
                    children: "Participants",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      ((_a =
                        meetingData === null || meetingData === void 0
                          ? void 0
                          : meetingData.participants) === null || _a === void 0
                        ? void 0
                        : _a.join(", ")) || "AI Executive Team",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-3 mt-2 pt-2 border-t",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className:
                  "text-xs bg-primary/10 p-1.5 rounded flex items-center gap-1.5",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: "ID:",
                  }),
                  " ",
                  (meetingData === null || meetingData === void 0
                    ? void 0
                    : meetingData.meeting_id) || "123 456 789",
                  (0, jsx_runtime_1.jsx)("button", {
                    onClick: handleCopyMeetingId,
                    className: "text-primary hover:text-primary/80",
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, {
                      className: "h-3.5 w-3.5",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "text-xs bg-primary/10 p-1.5 rounded",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: "Password:",
                  }),
                  " ",
                  (meetingData === null || meetingData === void 0
                    ? void 0
                    : meetingData.password) || "allora",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                className: "ml-auto",
                size: "sm",
                onClick: handleJoinMeeting,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                    className: "h-4 w-4 mr-1.5",
                  }),
                  "Join Meeting",
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
