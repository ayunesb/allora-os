"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotSearchAndFilter = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var BotSearchAndFilter = function (_a) {
  var searchQuery = _a.searchQuery,
    setSearchQuery = _a.setSearchQuery,
    roleFilter = _a.roleFilter,
    setRoleFilter = _a.setRoleFilter;
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    className: "p-4 mb-6",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "grid gap-4 md:grid-cols-2",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "search-bots",
              className: "mb-2 block",
              children: "Search Executives",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "relative",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
                  className:
                    "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
                }),
                (0, jsx_runtime_1.jsx)(input_1.Input, {
                  id: "search-bots",
                  type: "search",
                  placeholder: "Search by name, role or specialty...",
                  className: "pl-8",
                  value: searchQuery,
                  onChange: function (e) {
                    return setSearchQuery(e.target.value);
                  },
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "role-filter",
              className: "mb-2 block",
              children: "Filter by Role",
            }),
            (0, jsx_runtime_1.jsxs)(select_1.Select, {
              value: roleFilter,
              onValueChange: setRoleFilter,
              children: [
                (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                  id: "role-filter",
                  children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                    placeholder: "Select a role",
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                      value: "all",
                      children: "All Roles",
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectGroup, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectLabel, {
                          children: "C-Suite",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "ceo",
                          children: "CEO",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "coo",
                          children: "COO",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "cfo",
                          children: "CFO",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "cto",
                          children: "CTO",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "cio",
                          children: "CIO",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "cmo",
                          children: "CMO",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "chro",
                          children: "CHRO",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectGroup, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectLabel, {
                          children: "Leadership",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "vp_sales",
                          children: "VP of Sales",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "vp_product",
                          children: "VP of Product",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "vp_operations",
                          children: "VP of Operations",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "vp_marketing",
                          children: "VP of Marketing",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "sales_business_development",
                          children: "Sales & BD",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "strategy",
                          children: "Strategy",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectGroup, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectLabel, {
                          children: "Technology",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "data_scientist",
                          children: "Data Scientist",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "ml_engineer",
                          children: "ML Engineer",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "software_engineer",
                          children: "Software Engineer",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "cloud_architect",
                          children: "Cloud Architect",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "blockchain_developer",
                          children: "Blockchain Developer",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "vr_ar_developer",
                          children: "VR/AR Developer",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectGroup, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectLabel, {
                          children: "Marketing & Growth",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "marketing",
                          children: "Marketing",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "digital_marketing",
                          children: "Digital Marketing",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "growth_hacker",
                          children: "Growth Hacker",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "seo_specialist",
                          children: "SEO Specialist",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "ppc_specialist",
                          children: "PPC Specialist",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "brand_strategist",
                          children: "Brand Strategy",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectGroup, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectLabel, {
                          children: "Finance & Investment",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "venture_capitalist",
                          children: "Venture Capital",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "investment_banker",
                          children: "Investment Banking",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "risk_manager",
                          children: "Risk Management",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "financial_advisor",
                          children: "Financial Advisor",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectGroup, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectLabel, {
                          children: "Operations",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "operations_efficiency",
                          children: "Operations",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "supply_chain_manager",
                          children: "Supply Chain",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "manufacturing_engineer",
                          children: "Manufacturing",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "transportation_manager",
                          children: "Transportation",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "aviation_manager",
                          children: "Aviation",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectGroup, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectLabel, {
                          children: "Sales & Customer Success",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "cold_calling",
                          children: "Cold Calling",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "lead_qualification",
                          children: "Lead Qualification",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "customer_success",
                          children: "Customer Success",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "call_center_manager",
                          children: "Call Center",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectGroup, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectLabel, {
                          children: "Special Experts",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "ai_ethics_researcher",
                          children: "AI Ethics",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "cybersecurity_specialist",
                          children: "Cybersecurity",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "sustainability_officer",
                          children: "Sustainability",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "legal_counsel",
                          children: "Legal",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "compliance_officer",
                          children: "Compliance",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "business_analyst",
                          children: "Business Analysis",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
exports.BotSearchAndFilter = BotSearchAndFilter;
