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
exports.default = CommunicationNotes;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var textarea_1 = require("@/components/ui/textarea");
var skeleton_1 = require("@/components/ui/skeleton");
var tabs_1 = require("@/components/ui/tabs");
var sonner_1 = require("sonner");
function CommunicationNotes(_a) {
  var _this = this;
  var communications = _a.communications,
    isLoading = _a.isLoading,
    onClose = _a.onClose,
    communicationId = _a.communicationId;
  var _b = (0, react_1.useState)("summaries"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  var _c = (0, react_1.useState)(null),
    editingNoteId = _c[0],
    setEditingNoteId = _c[1];
  var _d = (0, react_1.useState)(""),
    noteContent = _d[0],
    setNoteContent = _d[1];
  var _e = (0, react_1.useState)(false),
    saving = _e[0],
    setSaving = _e[1];
  // If communicationId is provided, filter the communications to show only the selected one
  var filteredCommunications = communicationId
    ? communications.filter(function (comm) {
        return comm.id === communicationId;
      })
    : communications;
  var handleEditNote = function (communication) {
    setEditingNoteId(communication.id);
    setNoteContent(communication.notes || "");
  };
  var handleSaveNote = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!editingNoteId) return [2 /*return*/];
            setSaving(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 800);
              }),
            ];
          case 2:
            _a.sent();
            // In a real app, this would save to the database
            sonner_1.toast.success("Note saved successfully");
            setEditingNoteId(null);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            sonner_1.toast.error("Failed to save note");
            console.error("Error saving note:", error_1);
            return [3 /*break*/, 5];
          case 4:
            setSaving(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleCancelEdit = function () {
    setEditingNoteId(null);
    setNoteContent("");
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-6 w-48",
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-4 w-72",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className: "space-y-4",
          children: [
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-32 w-full",
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-32 w-full",
            }),
          ],
        }),
      ],
    });
  }
  if (communicationId && filteredCommunications.length === 0) {
    return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
      open: true,
      onOpenChange: function () {
        return onClose && onClose();
      },
      children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
        children: [
          (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                children: "Communication Details",
              }),
              (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
                children:
                  "Could not find the communication you're looking for.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
            children: (0, jsx_runtime_1.jsx)(dialog_1.DialogClose, {
              asChild: true,
              children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                children: "Close",
              }),
            }),
          }),
        ],
      }),
    });
  }
  // If we're using this as a modal for a specific communication
  if (communicationId) {
    var communication_1 = filteredCommunications[0];
    return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
      open: true,
      onOpenChange: function () {
        return onClose && onClose();
      },
      children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
        className: "max-w-xl",
        children: [
          (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
                    className: "h-5 w-5",
                  }),
                  "Communication Notes",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, {
                children: [
                  communication_1.type.charAt(0).toUpperCase() +
                    communication_1.type.slice(1),
                  " on ",
                  " ",
                  new Date(communication_1.created_at).toLocaleDateString(),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            value: activeTab,
            onValueChange: setActiveTab,
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "grid grid-cols-2 mb-4",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "notes",
                    children: "Manual Notes",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "summaries",
                    children: "AI Summary",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "notes",
                className: "space-y-4",
                children:
                  editingNoteId === communication_1.id
                    ? (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                            value: noteContent,
                            onChange: function (e) {
                              return setNoteContent(e.target.value);
                            },
                            placeholder: "Enter your notes...",
                            className: "min-h-[150px]",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-end gap-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                variant: "outline",
                                size: "sm",
                                onClick: handleCancelEdit,
                                disabled: saving,
                                children: [
                                  (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                                    className: "h-4 w-4 mr-1",
                                  }),
                                  "Cancel",
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                size: "sm",
                                onClick: handleSaveNote,
                                disabled: saving,
                                children: [
                                  saving
                                    ? (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Loader2,
                                        {
                                          className:
                                            "h-4 w-4 mr-1 animate-spin",
                                        },
                                      )
                                    : (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Check,
                                        { className: "h-4 w-4 mr-1" },
                                      ),
                                  "Save",
                                ],
                              }),
                            ],
                          }),
                        ],
                      })
                    : (0, jsx_runtime_1.jsx)("div", {
                        children: communication_1.notes
                          ? (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "border rounded-md p-3 bg-muted/50",
                                  children: (0, jsx_runtime_1.jsx)("p", {
                                    className: "whitespace-pre-wrap",
                                    children: communication_1.notes,
                                  }),
                                }),
                                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                  variant: "outline",
                                  size: "sm",
                                  onClick: function () {
                                    return handleEditNote(communication_1);
                                  },
                                  className: "mt-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Pencil,
                                      { className: "h-4 w-4 mr-1" },
                                    ),
                                    "Edit Note",
                                  ],
                                }),
                              ],
                            })
                          : (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "text-center py-8 border rounded-md border-dashed",
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-muted-foreground mb-4",
                                  children: "No notes have been added yet",
                                }),
                                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                  variant: "outline",
                                  onClick: function () {
                                    return handleEditNote(communication_1);
                                  },
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.PlusCircle,
                                      { className: "h-4 w-4 mr-2" },
                                    ),
                                    "Add Note",
                                  ],
                                }),
                              ],
                            }),
                      }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "summaries",
                children: communication_1.ai_summary
                  ? (0, jsx_runtime_1.jsx)("div", {
                      className: "border rounded-md p-3 bg-muted/50",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "whitespace-pre-wrap",
                        children: communication_1.ai_summary,
                      }),
                    })
                  : (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "text-center py-8 border rounded-md border-dashed",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground mb-4",
                          children: "No AI summary available",
                        }),
                        (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "outline",
                          disabled: true,
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                              className: "h-4 w-4 mr-2 animate-spin",
                            }),
                            "Generate Summary",
                          ],
                        }),
                      ],
                    }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
            children: (0, jsx_runtime_1.jsx)(dialog_1.DialogClose, {
              asChild: true,
              children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                children: "Close",
              }),
            }),
          }),
        ],
      }),
    });
  }
  // Default display for the main page
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
                className: "h-5 w-5",
              }),
              "Communication Notes & Summaries",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Manual notes and AI-generated summaries from your calls and meetings",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          defaultValue: "summaries",
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "grid grid-cols-2 mb-4",
              children: [
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "notes",
                  children: "Manual Notes",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "summaries",
                  children: "AI Summaries",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "notes",
              className: "space-y-4",
              children:
                filteredCommunications.length === 0
                  ? (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "text-center py-8 border rounded-md border-dashed",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-muted-foreground",
                        children: "No communications with notes found",
                      }),
                    })
                  : filteredCommunications
                      .filter(function (comm) {
                        return comm.notes;
                      })
                      .slice(0, 3)
                      .map(function (comm) {
                        var _a;
                        return (0, jsx_runtime_1.jsxs)(
                          "div",
                          {
                            className: "border rounded-md p-4 space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between items-start",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("h3", {
                                    className: "font-medium capitalize",
                                    children: [
                                      comm.type,
                                      " with ",
                                      ((_a = comm.leads) === null ||
                                      _a === void 0
                                        ? void 0
                                        : _a.name) || "Unknown",
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "text-xs text-muted-foreground",
                                    children: new Date(
                                      comm.created_at,
                                    ).toLocaleDateString(),
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm whitespace-pre-wrap",
                                children: comm.notes,
                              }),
                            ],
                          },
                          comm.id,
                        );
                      }),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "summaries",
              className: "space-y-4",
              children:
                filteredCommunications.length === 0
                  ? (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "text-center py-8 border rounded-md border-dashed",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-muted-foreground",
                        children: "No communications with AI summaries found",
                      }),
                    })
                  : filteredCommunications
                      .filter(function (comm) {
                        return comm.ai_summary;
                      })
                      .slice(0, 3)
                      .map(function (comm) {
                        var _a;
                        return (0, jsx_runtime_1.jsxs)(
                          "div",
                          {
                            className: "border rounded-md p-4 space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between items-start",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("h3", {
                                    className: "font-medium capitalize",
                                    children: [
                                      comm.type,
                                      " with ",
                                      ((_a = comm.leads) === null ||
                                      _a === void 0
                                        ? void 0
                                        : _a.name) || "Unknown",
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "text-xs text-muted-foreground",
                                    children: new Date(
                                      comm.created_at,
                                    ).toLocaleDateString(),
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm whitespace-pre-wrap",
                                children: comm.ai_summary,
                              }),
                            ],
                          },
                          comm.id,
                        );
                      }),
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "border-t pt-4",
        children: (0, jsx_runtime_1.jsx)("p", {
          className: "text-xs text-muted-foreground",
          children:
            "AI summaries are automatically generated after Zoom calls and WhatsApp chats. You can also add your own notes to any communication.",
        }),
      }),
    ],
  });
}
