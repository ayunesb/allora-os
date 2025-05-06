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
exports.default = WhatsAppSender;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var tabs_1 = require("@/components/ui/tabs");
var communications_1 = require("@/hooks/communications");
var useLeads_1 = require("@/hooks/admin/useLeads");
var twilioHelpers_1 = require("@/utils/twilioHelpers");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
// Import component parts
var LeadSelector_1 = require("./whatsapp/LeadSelector");
var DirectMessageTab_1 = require("./whatsapp/DirectMessageTab");
var TemplateTab_1 = require("./whatsapp/TemplateTab");
var WhatsAppFooter_1 = require("./whatsapp/WhatsAppFooter");
function WhatsAppSender(_a) {
  var _this = this;
  var phoneNumber = _a.phoneNumber,
    onPhoneNumberChange = _a.onPhoneNumberChange;
  var _b = (0, react_1.useState)(""),
    selectedLeadId = _b[0],
    setSelectedLeadId = _b[1];
  var _c = (0, react_1.useState)("direct"),
    activeTab = _c[0],
    setActiveTab = _c[1];
  var _d = (0, react_1.useState)([]),
    templates = _d[0],
    setTemplates = _d[1];
  var _e = (0, react_1.useState)(false),
    isLoadingTemplates = _e[0],
    setIsLoadingTemplates = _e[1];
  var _f = (0, react_1.useState)(null),
    templateError = _f[0],
    setTemplateError = _f[1];
  var _g = (0, useLeads_1.useLeads)(),
    leads = _g.leads,
    leadsLoading = _g.isLoading;
  var _h = (0, communications_1.useCommunications)(),
    logCommunication = _h.logCommunication,
    isLoadingMutation = _h.isLoadingMutation;
  (0, react_1.useEffect)(function () {
    function fetchTemplates() {
      return __awaiter(this, void 0, void 0, function () {
        var templatesList, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoadingTemplates(true);
              setTemplateError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [4 /*yield*/, (0, twilioHelpers_1.getWhatsAppTemplates)()];
            case 2:
              templatesList = _a.sent();
              setTemplates(templatesList);
              if (templatesList.length === 0) {
                setTemplateError(
                  "No WhatsApp templates found. Templates may not be configured properly.",
                );
              }
              return [3 /*break*/, 5];
            case 3:
              error_1 = _a.sent();
              console.error("Error fetching WhatsApp templates:", error_1);
              setTemplateError(
                "Error fetching WhatsApp templates: ".concat(
                  error_1.message || "Unknown error",
                ),
              );
              sonner_1.toast.error("Failed to load WhatsApp templates");
              return [3 /*break*/, 5];
            case 4:
              setIsLoadingTemplates(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    }
    fetchTemplates();
  }, []);
  var handleSelectLead = function (leadId) {
    setSelectedLeadId(leadId);
    var selectedLead =
      leads === null || leads === void 0
        ? void 0
        : leads.find(function (lead) {
            return lead.id === leadId;
          });
    if (
      selectedLead === null || selectedLead === void 0
        ? void 0
        : selectedLead.phone
    ) {
      onPhoneNumberChange(selectedLead.phone);
    } else {
      onPhoneNumberChange("");
    }
  };
  // Create a wrapper function to ensure correct parameter passing
  var handleMessageSent = function (communicationData) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!selectedLeadId) return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              logCommunication(selectedLeadId, communicationData),
            ];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsx)(LeadSelector_1.default, {
        selectedLeadId: selectedLeadId,
        onSelectLead: handleSelectLead,
        leads: leads,
        isLoading: leadsLoading,
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "whatsapp-phone",
            children: "Phone Number",
          }),
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            id: "whatsapp-phone",
            placeholder: "+1 (555) 123-4567",
            value: phoneNumber,
            onChange: function (e) {
              return onPhoneNumberChange(e.target.value);
            },
          }),
        ],
      }),
      templateError &&
        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
          variant: "destructive",
          className: "my-4",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
              children: templateError,
            }),
          ],
        }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        value: activeTab,
        onValueChange: setActiveTab,
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid grid-cols-2 w-full",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "direct",
                children: "Direct Message",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "template",
                children: "Template",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "direct",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)(DirectMessageTab_1.default, {
              phoneNumber: phoneNumber,
              selectedLeadId: selectedLeadId,
              onMessageSent: handleMessageSent,
              isLoadingMutation: isLoadingMutation,
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "template",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)(TemplateTab_1.default, {
              phoneNumber: phoneNumber,
              selectedLeadId: selectedLeadId,
              templates: templates,
              isLoadingTemplates: isLoadingTemplates,
              onMessageSent: handleMessageSent,
              isLoadingMutation: isLoadingMutation,
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(WhatsAppFooter_1.default, {}),
    ],
  });
}
