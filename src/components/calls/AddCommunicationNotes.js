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
exports.default = AddCommunicationNotes;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var useCommunications_1 = require("@/hooks/useCommunications");
var lucide_react_1 = require("lucide-react");
function AddCommunicationNotes(_a) {
  var _this = this;
  var open = _a.open,
    onOpenChange = _a.onOpenChange,
    communicationId = _a.communicationId,
    _b = _a.existingNotes,
    existingNotes = _b === void 0 ? "" : _b;
  var _c = (0, react_1.useState)(existingNotes),
    notes = _c[0],
    setNotes = _c[1];
  var _d = (0, react_1.useState)(""),
    transcript = _d[0],
    setTranscript = _d[1];
  var _e = (0, react_1.useState)(false),
    generatingAiSummary = _e[0],
    setGeneratingAiSummary = _e[1];
  var _f = (0, useCommunications_1.useCommunications)(),
    updateCommunicationStatus = _f.updateCommunicationStatus,
    generateAISummary = _f.generateAISummary;
  var handleSave = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              updateCommunicationStatus(communicationId, "completed", notes),
            ];
          case 1:
            _a.sent();
            onOpenChange(false);
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Error saving notes:", error_1);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleGenerateAISummary = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result_1, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!transcript.trim()) return [2 /*return*/];
            setGeneratingAiSummary(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              generateAISummary(communicationId, transcript),
            ];
          case 2:
            result_1 = _a.sent();
            if (result_1.summary) {
              setNotes(function (prev) {
                return ""
                  .concat(prev ? prev + "\n\n" : "", "AI Summary: ")
                  .concat(result_1.summary);
              });
            }
            return [3 /*break*/, 5];
          case 3:
            error_2 = _a.sent();
            console.error("Error generating AI summary:", error_2);
            return [3 /*break*/, 5];
          case 4:
            setGeneratingAiSummary(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: open,
    onOpenChange: onOpenChange,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "max-w-lg",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              children: "Add Communication Notes",
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              children:
                "Add notes from your communication or generate an AI summary from a transcript.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4 my-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  htmlFor: "notes",
                  className: "text-sm font-medium mb-2 block",
                  children: "Notes",
                }),
                (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                  id: "notes",
                  value: notes,
                  onChange: function (e) {
                    return setNotes(e.target.value);
                  },
                  placeholder: "Enter your notes about this communication...",
                  rows: 5,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "border-t pt-4",
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  htmlFor: "transcript",
                  className: "text-sm font-medium mb-2 block",
                  children: "Meeting Transcript (optional)",
                }),
                (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                  id: "transcript",
                  value: transcript,
                  onChange: function (e) {
                    return setTranscript(e.target.value);
                  },
                  placeholder:
                    "Paste your call transcript here to generate an AI summary...",
                  rows: 5,
                  className: "mb-2",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  disabled: !transcript.trim() || generatingAiSummary,
                  onClick: handleGenerateAISummary,
                  children: generatingAiSummary
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                            className: "h-4 w-4 mr-2 animate-spin",
                          }),
                          "Generating...",
                        ],
                      })
                    : "Generate AI Summary",
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
          children: [
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              onClick: function () {
                return onOpenChange(false);
              },
              children: "Cancel",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: handleSave,
              children: "Save Notes",
            }),
          ],
        }),
      ],
    }),
  });
}
