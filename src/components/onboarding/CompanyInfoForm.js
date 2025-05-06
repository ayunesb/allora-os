"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CompanyInfoForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("@/components/ui/input");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var select_1 = require("@/components/ui/select");
var label_1 = require("@/components/ui/label");
// Company size options
var companySizes = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "500+", label: "500+ employees" },
];
// Revenue options
var revenueRanges = [
  { value: "<10k", label: "Less than $10K" },
  { value: "10k-50k", label: "$10K–$50K" },
  { value: "50k-200k", label: "$50K–$200K" },
  { value: ">200k", label: "More than $200K" },
];
// Geographic market options
var markets = [
  { value: "north_america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "latam", label: "LATAM" },
  { value: "asia", label: "Asia" },
  { value: "africa", label: "Africa" },
  { value: "global", label: "Global" },
];
function CompanyInfoForm(_a) {
  var companyName = _a.companyName,
    setCompanyName = _a.setCompanyName,
    _b = _a.companyDetails,
    companyDetails = _b === void 0 ? {} : _b,
    _c = _a.updateCompanyDetails,
    updateCompanyDetails = _c === void 0 ? function () {} : _c,
    error = _a.error;
  // Handle updating company details
  var handleDetailsChange = function (field, value) {
    var _a;
    if (updateCompanyDetails) {
      updateCompanyDetails(((_a = {}), (_a[field] = value), _a));
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Company Information",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children:
              "Tell us about your business so we can provide tailored strategies.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "company-name",
                children: [
                  "Company Name ",
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-destructive",
                    children: "*",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                id: "company-name",
                placeholder: "Acme Inc.",
                value: companyName,
                onChange: function (e) {
                  return setCompanyName(e.target.value);
                },
                className: error ? "border-destructive" : "",
              }),
              error &&
                (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                  variant: "destructive",
                  className: "py-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                      className: "h-4 w-4",
                    }),
                    (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                      className: "ml-2 text-xs",
                      children: error,
                    }),
                  ],
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "primary-offering",
                children: "Primary Offering (Products/Services)",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                id: "primary-offering",
                placeholder: "What does your company provide?",
                value:
                  (companyDetails === null || companyDetails === void 0
                    ? void 0
                    : companyDetails.primaryOffering) || "",
                onChange: function (e) {
                  return handleDetailsChange("primaryOffering", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "company-size",
                    children: "Company Size",
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    value:
                      (companyDetails === null || companyDetails === void 0
                        ? void 0
                        : companyDetails.companySize) || "",
                    onValueChange: function (value) {
                      return handleDetailsChange("companySize", value);
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                        id: "company-size",
                        children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                          placeholder: "Select company size",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                        children: companySizes.map(function (size) {
                          return (0, jsx_runtime_1.jsx)(
                            select_1.SelectItem,
                            { value: size.value, children: size.label },
                            size.value,
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
                    htmlFor: "monthly-revenue",
                    children: "Current Monthly Revenue",
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    value:
                      (companyDetails === null || companyDetails === void 0
                        ? void 0
                        : companyDetails.monthlyRevenue) || "",
                    onValueChange: function (value) {
                      return handleDetailsChange("monthlyRevenue", value);
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                        id: "monthly-revenue",
                        children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                          placeholder: "Select revenue range",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                        children: revenueRanges.map(function (range) {
                          return (0, jsx_runtime_1.jsx)(
                            select_1.SelectItem,
                            { value: range.value, children: range.label },
                            range.value,
                          );
                        }),
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
                htmlFor: "geographic-market",
                children: "Primary Geographic Market",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value:
                  (companyDetails === null || companyDetails === void 0
                    ? void 0
                    : companyDetails.geographicMarket) || "",
                onValueChange: function (value) {
                  return handleDetailsChange("geographicMarket", value);
                },
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "geographic-market",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select primary market",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                    children: markets.map(function (market) {
                      return (0, jsx_runtime_1.jsx)(
                        select_1.SelectItem,
                        { value: market.value, children: market.label },
                        market.value,
                      );
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
