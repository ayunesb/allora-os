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
exports.default = ZoomScheduler;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var useCommunications_1 = require("@/hooks/useCommunications");
var sonner_1 = require("sonner");
var useLeads_1 = require("@/hooks/admin/useLeads");
var select_1 = require("@/components/ui/select");
function ZoomScheduler() {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    selectedLeadId = _a[0],
    setSelectedLeadId = _a[1];
  var _b = (0, react_1.useState)(""),
    meetingTitle = _b[0],
    setMeetingTitle = _b[1];
  var _c = (0, react_1.useState)(""),
    meetingDate = _c[0],
    setMeetingDate = _c[1];
  var _d = (0, react_1.useState)(""),
    meetingTime = _d[0],
    setMeetingTime = _d[1];
  var _e = (0, react_1.useState)(30),
    meetingDuration = _e[0],
    setMeetingDuration = _e[1];
  var _f = (0, react_1.useState)(""),
    meetingAgenda = _f[0],
    setMeetingAgenda = _f[1];
  var _g = (0, useLeads_1.useLeads)(),
    leads = _g.leads,
    leadsLoading = _g.isLoading;
  var _h = (0, useCommunications_1.useCommunications)(),
    createZoomMeeting = _h.createZoomMeeting,
    isLoadingMutation = _h.isLoadingMutation;
  var handleCreateMeeting = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var startTime, meetingData, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!selectedLeadId) {
              sonner_1.toast.error("Please select a lead");
              return [2 /*return*/];
            }
            if (!meetingTitle.trim()) {
              sonner_1.toast.error("Please enter a meeting title");
              return [2 /*return*/];
            }
            if (!meetingDate || !meetingTime) {
              sonner_1.toast.error("Please enter a meeting date and time");
              return [2 /*return*/];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            startTime = new Date(
              "".concat(meetingDate, "T").concat(meetingTime),
            );
            if (isNaN(startTime.getTime())) {
              sonner_1.toast.error("Invalid date or time");
              return [2 /*return*/];
            }
            meetingData = {
              topic: meetingTitle,
              startTime: startTime.toISOString(),
              duration: meetingDuration,
              agenda: meetingAgenda || undefined,
            };
            return [
              4 /*yield*/,
              createZoomMeeting(selectedLeadId, meetingData),
            ];
          case 2:
            _a.sent();
            // Reset form after successful creation
            setMeetingTitle("");
            setMeetingDate("");
            setMeetingTime("");
            setMeetingAgenda("");
            return [3 /*break*/, 4];
          case 3:
            error_1 = _a.sent();
            console.error("Error creating Zoom meeting:", error_1);
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "lead-select",
            children: "Select Lead",
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: selectedLeadId,
            onValueChange: setSelectedLeadId,
            disabled: leadsLoading,
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                id: "lead-select",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Select a lead",
                }),
              }),
              (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                children:
                  leads === null || leads === void 0
                    ? void 0
                    : leads.map(function (lead) {
                        return (0, jsx_runtime_1.jsx)(
                          select_1.SelectItem,
                          { value: lead.id, children: lead.name },
                          lead.id,
                        );
                      }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "meeting-title",
            children: "Meeting Title",
          }),
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            id: "meeting-title",
            placeholder: "Enter meeting title",
            value: meetingTitle,
            onChange: function (e) {
              return setMeetingTitle(e.target.value);
            },
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-2 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "meeting-date",
                children: "Date",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                id: "meeting-date",
                type: "date",
                value: meetingDate,
                onChange: function (e) {
                  return setMeetingDate(e.target.value);
                },
                min: new Date().toISOString().split("T")[0],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "meeting-time",
                children: "Time",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                id: "meeting-time",
                type: "time",
                value: meetingTime,
                onChange: function (e) {
                  return setMeetingTime(e.target.value);
                },
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "meeting-duration",
            children: "Duration (minutes)",
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: meetingDuration.toString(),
            onValueChange: function (value) {
              return setMeetingDuration(parseInt(value));
            },
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                id: "meeting-duration",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Select duration",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "15",
                    children: "15 minutes",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "30",
                    children: "30 minutes",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "45",
                    children: "45 minutes",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "60",
                    children: "1 hour",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "90",
                    children: "1.5 hours",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "120",
                    children: "2 hours",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "meeting-agenda",
            children: "Agenda (optional)",
          }),
          (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
            id: "meeting-agenda",
            placeholder: "Enter meeting agenda",
            value: meetingAgenda,
            onChange: function (e) {
              return setMeetingAgenda(e.target.value);
            },
            rows: 3,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        onClick: handleCreateMeeting,
        disabled:
          isLoadingMutation ||
          !selectedLeadId ||
          !meetingTitle ||
          !meetingDate ||
          !meetingTime,
        className: "w-full",
        children: isLoadingMutation
          ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                  className: "mr-2 h-4 w-4 animate-spin",
                }),
                "Creating Meeting...",
              ],
            })
          : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Video, {
                  className: "mr-2 h-4 w-4",
                }),
                "Schedule Zoom Meeting",
              ],
            }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-xs text-muted-foreground mt-2",
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            children:
              "A calendar invite will be sent to the lead automatically.",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            children:
              "You will receive the meeting link by email and it will appear in your timeline.",
          }),
        ],
      }),
    ],
  });
}
