"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeadSelector;
var jsx_runtime_1 = require("react/jsx-runtime");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
function LeadSelector(_a) {
  var selectedLeadId = _a.selectedLeadId,
    onSelectLead = _a.onSelectLead,
    leads = _a.leads,
    isLoading = _a.isLoading;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-2",
    children: [
      (0, jsx_runtime_1.jsx)(label_1.Label, {
        htmlFor: "lead-select",
        children: "Select Lead (Optional)",
      }),
      (0, jsx_runtime_1.jsxs)(select_1.Select, {
        value: selectedLeadId,
        onValueChange: onSelectLead,
        disabled: isLoading,
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
  });
}
