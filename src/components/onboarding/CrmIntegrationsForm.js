"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
exports.CrmIntegrationsForm = CrmIntegrationsForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var label_1 = require("@/components/ui/label");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var switch_1 = require("@/components/ui/switch");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
// CRM system options - expanded list
var crmSystems = [
  { value: "salesforce", label: "Salesforce" },
  { value: "hubspot", label: "HubSpot" },
  { value: "zoho", label: "Zoho CRM" },
  { value: "pipedrive", label: "Pipedrive" },
  { value: "microsoft_dynamics", label: "Microsoft Dynamics 365" },
  { value: "sugarcrm", label: "SugarCRM" },
  { value: "freshsales", label: "Freshsales" },
  { value: "none", label: "None" },
];
// Marketing platform options - expanded list
var marketingPlatforms = [
  { value: "google_ads", label: "Google Ads" },
  { value: "meta_ads", label: "Meta Ads (Facebook/Instagram)" },
  { value: "mailchimp", label: "Mailchimp" },
  { value: "hubspot_marketing", label: "HubSpot Marketing" },
  { value: "marketo", label: "Marketo" },
  { value: "activecampaign", label: "ActiveCampaign" },
  { value: "linkedin_ads", label: "LinkedIn Ads" },
  { value: "tiktok_ads", label: "TikTok Ads" },
  { value: "klaviyo", label: "Klaviyo" },
  { value: "none", label: "None" },
];
// Document generation options
var documentTypes = [
  { value: "proposals", label: "Business Proposals" },
  { value: "reports", label: "Performance Reports" },
  { value: "presentations", label: "Presentations" },
  { value: "contracts", label: "Contracts" },
  { value: "marketing_materials", label: "Marketing Materials" },
];
function CrmIntegrationsForm(_a) {
  var _b, _c;
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails;
  var _d = (0, react_1.useState)(false),
    showShopName = _d[0],
    setShowShopName = _d[1];
  var _e = (0, react_1.useState)(false),
    showApiKeyField = _e[0],
    setShowApiKeyField = _e[1];
  var _f = (0, react_1.useState)(companyDetails.documentGenerationTypes || []),
    selectedDocTypes = _f[0],
    setSelectedDocTypes = _f[1];
  // Update shop name field visibility based on ecommerce toggle
  (0, react_1.useEffect)(
    function () {
      setShowShopName(!!companyDetails.usesEcommerce);
    },
    [companyDetails.usesEcommerce],
  );
  // Show API key field for selected CRM/Marketing platforms
  (0, react_1.useEffect)(
    function () {
      var platformsRequiringApi = [
        "salesforce",
        "hubspot",
        "google_ads",
        "meta_ads",
      ];
      setShowApiKeyField(
        platformsRequiringApi.includes(companyDetails.crmSystem || "") ||
          platformsRequiringApi.includes(
            companyDetails.marketingPlatform || "",
          ),
      );
    },
    [companyDetails.crmSystem, companyDetails.marketingPlatform],
  );
  // Handle field changes
  var handleChange = function (field, value) {
    var _a;
    updateCompanyDetails(
      __assign(
        __assign({}, companyDetails),
        ((_a = {}), (_a[field] = value), _a),
      ),
    );
  };
  // Handle document type selection
  var toggleDocType = function (type) {
    var currentSelection = __spreadArray([], selectedDocTypes, true);
    var index = currentSelection.indexOf(type);
    if (index >= 0) {
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(type);
    }
    setSelectedDocTypes(currentSelection);
    handleChange("documentGenerationTypes", currentSelection);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Integration Systems",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children:
              "Connect your CRM, marketing platforms, and enable document generation based on AI insights.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-6 md:grid-cols-2",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.Card, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-6",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium",
                    children: "CRM Systems",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "crm-system",
                        children: "Current CRM System",
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.Select, {
                        value: companyDetails.crmSystem || "",
                        onValueChange: function (value) {
                          return handleChange("crmSystem", value);
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                            id: "crm-system",
                            children: (0, jsx_runtime_1.jsx)(
                              select_1.SelectValue,
                              { placeholder: "Select CRM system" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                            children: crmSystems.map(function (system) {
                              return (0, jsx_runtime_1.jsx)(
                                select_1.SelectItem,
                                { value: system.value, children: system.label },
                                system.value,
                              );
                            }),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs text-muted-foreground mt-1",
                        children:
                          "Allora AI will sync data with your CRM system.",
                      }),
                    ],
                  }),
                  companyDetails.crmSystem &&
                    companyDetails.crmSystem !== "none" &&
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "mt-4",
                      children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "outline",
                        size: "sm",
                        className: "text-xs",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                            className: "mr-2 h-3 w-3",
                          }),
                          "Authorize ",
                          (_b = crmSystems.find(function (c) {
                            return c.value === companyDetails.crmSystem;
                          })) === null || _b === void 0
                            ? void 0
                            : _b.label,
                        ],
                      }),
                    }),
                ],
              }),
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.Card, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-6",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium",
                    children: "Marketing Platforms",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "marketing-platform",
                        children: "Current Marketing Platform",
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.Select, {
                        value: companyDetails.marketingPlatform || "",
                        onValueChange: function (value) {
                          return handleChange("marketingPlatform", value);
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                            id: "marketing-platform",
                            children: (0, jsx_runtime_1.jsx)(
                              select_1.SelectValue,
                              { placeholder: "Select marketing platform" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                            children: marketingPlatforms.map(
                              function (platform) {
                                return (0, jsx_runtime_1.jsx)(
                                  select_1.SelectItem,
                                  {
                                    value: platform.value,
                                    children: platform.label,
                                  },
                                  platform.value,
                                );
                              },
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs text-muted-foreground mt-1",
                        children:
                          "Connect your marketing accounts to optimize campaigns.",
                      }),
                    ],
                  }),
                  companyDetails.marketingPlatform &&
                    companyDetails.marketingPlatform !== "none" &&
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "mt-4",
                      children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "outline",
                        size: "sm",
                        className: "text-xs",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                            className: "mr-2 h-3 w-3",
                          }),
                          "Connect ",
                          (_c = marketingPlatforms.find(function (m) {
                            return m.value === companyDetails.marketingPlatform;
                          })) === null || _c === void 0
                            ? void 0
                            : _c.label,
                        ],
                      }),
                    }),
                ],
              }),
            }),
          }),
        ],
      }),
      showApiKeyField &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-2 pt-2 pl-4 border-l-2 border-muted",
          children: [
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "api-key",
              children: "API Key",
            }),
            (0, jsx_runtime_1.jsx)(input_1.Input, {
              id: "api-key",
              type: "password",
              placeholder: "Enter API key for integration",
              value: companyDetails.integrationApiKey || "",
              onChange: function (e) {
                return handleChange("integrationApiKey", e.target.value);
              },
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-xs text-muted-foreground mt-1",
              children:
                "This key will be securely stored and used for integration purposes only.",
            }),
          ],
        }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between space-y-0 pt-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "ecommerce-switch",
            children: "Do you use Shopify or another e-commerce platform?",
          }),
          (0, jsx_runtime_1.jsx)(switch_1.Switch, {
            id: "ecommerce-switch",
            checked: !!companyDetails.usesEcommerce,
            onCheckedChange: function (checked) {
              return handleChange("usesEcommerce", checked);
            },
          }),
        ],
      }),
      showShopName &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-2 pt-2 pl-4 border-l-2 border-muted",
          children: [
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "shop-name",
              children: "Shop Name",
            }),
            (0, jsx_runtime_1.jsx)(input_1.Input, {
              id: "shop-name",
              placeholder: "Your shop name",
              value: companyDetails.shopName || "",
              onChange: function (e) {
                return handleChange("shopName", e.target.value);
              },
            }),
          ],
        }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsx)("h4", {
            className: "font-medium",
            children: "Document Generation",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children:
              "Select which types of documents you'd like Allora AI to help you generate.",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex flex-wrap gap-2 pt-2",
            children: documentTypes.map(function (docType) {
              return (0, jsx_runtime_1.jsxs)(
                badge_1.Badge,
                {
                  variant: selectedDocTypes.includes(docType.value)
                    ? "default"
                    : "outline",
                  className: "cursor-pointer",
                  onClick: function () {
                    return toggleDocType(docType.value);
                  },
                  children: [
                    selectedDocTypes.includes(docType.value) &&
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                        className: "mr-1 h-3 w-3",
                      }),
                    docType.label,
                  ],
                },
                docType.value,
              );
            }),
          }),
        ],
      }),
    ],
  });
}
