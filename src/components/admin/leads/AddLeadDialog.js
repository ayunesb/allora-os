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
exports.AddLeadDialog = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var useLeads_1 = require("@/hooks/admin/useLeads");
var AddLeadDialog = function (_a) {
  var onLeadAdded = _a.onLeadAdded,
    campaigns = _a.campaigns,
    isMobileView = _a.isMobileView;
  var _b = (0, react_1.useState)(false),
    open = _b[0],
    setOpen = _b[1];
  var _c = (0, react_1.useState)(""),
    name = _c[0],
    setName = _c[1];
  var _d = (0, react_1.useState)(""),
    email = _d[0],
    setEmail = _d[1];
  var _e = (0, react_1.useState)(""),
    phone = _e[0],
    setPhone = _e[1];
  var _f = (0, react_1.useState)(""),
    campaignId = _f[0],
    setCampaignId = _f[1];
  var _g = (0, react_1.useState)("new"),
    status = _g[0],
    setStatus = _g[1];
  var _h = (0, useLeads_1.useLeads)(),
    addLead = _h.addLead,
    isAddingLead = _h.isAddingLead;
  var handleSubmit = function (e) {
    return __awaiter(void 0, void 0, void 0, function () {
      var lead;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.preventDefault();
            return [
              4 /*yield*/,
              addLead({
                name: name,
                email: email,
                phone: phone,
                campaign_id: campaignId,
                status: status,
              }),
            ];
          case 1:
            lead = _a.sent();
            if (lead) {
              resetForm();
              setOpen(false);
              onLeadAdded();
            }
            return [2 /*return*/];
        }
      });
    });
  };
  var resetForm = function () {
    setName("");
    setEmail("");
    setPhone("");
    setCampaignId("");
    setStatus("new");
  };
  return (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, {
    open: open,
    onOpenChange: setOpen,
    children: [
      (0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          size: "sm",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
              className: "h-4 w-4 mr-2",
            }),
            isMobileView ? "Add" : "Add Lead",
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, {
        className: "sm:max-w-[425px]",
        children: (0, jsx_runtime_1.jsxs)("form", {
          onSubmit: handleSubmit,
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                  children: "Add New Lead",
                }),
                (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
                  children:
                    "Create a new lead in the system. Fill out the required information.",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid gap-4 py-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-4 items-center gap-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "name",
                      className: "text-right",
                      children: "Name",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "name",
                      value: name,
                      onChange: function (e) {
                        return setName(e.target.value);
                      },
                      className: "col-span-3",
                      required: true,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-4 items-center gap-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "email",
                      className: "text-right",
                      children: "Email",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "email",
                      type: "email",
                      value: email,
                      onChange: function (e) {
                        return setEmail(e.target.value);
                      },
                      className: "col-span-3",
                      required: true,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-4 items-center gap-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "phone",
                      className: "text-right",
                      children: "Phone",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "phone",
                      type: "tel",
                      value: phone,
                      onChange: function (e) {
                        return setPhone(e.target.value);
                      },
                      className: "col-span-3",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-4 items-center gap-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "campaign",
                      className: "text-right",
                      children: "Campaign",
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: campaignId,
                      onValueChange: setCampaignId,
                      required: true,
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          className: "col-span-3",
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectValue,
                            { placeholder: "Select a campaign" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                          children: campaigns.map(function (campaign) {
                            return (0, jsx_runtime_1.jsx)(
                              select_1.SelectItem,
                              { value: campaign.id, children: campaign.name },
                              campaign.id,
                            );
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-4 items-center gap-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "status",
                      className: "text-right",
                      children: "Status",
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: status,
                      onValueChange: function (value) {
                        return setStatus(value);
                      },
                      required: true,
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          className: "col-span-3",
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectValue,
                            { placeholder: "Select a status" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "new",
                              children: "New",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "contacted",
                              children: "Contacted",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "qualified",
                              children: "Qualified",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "client",
                              children: "Client",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "closed",
                              children: "Closed",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  type: "button",
                  variant: "outline",
                  onClick: function () {
                    return setOpen(false);
                  },
                  children: "Cancel",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  type: "submit",
                  disabled: isAddingLead,
                  children: isAddingLead ? "Adding..." : "Add Lead",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
exports.AddLeadDialog = AddLeadDialog;
