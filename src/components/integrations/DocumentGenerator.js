"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentGenerator = DocumentGenerator;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var dialog_1 = require("@/components/ui/dialog");
var label_1 = require("@/components/ui/label");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var sonner_1 = require("sonner");
var select_1 = require("@/components/ui/select");
var tabs_1 = require("@/components/ui/tabs");
function DocumentGenerator() {
  var _a = (0, react_1.useState)(false),
    isGenerating = _a[0],
    setIsGenerating = _a[1];
  var _b = (0, react_1.useState)(null),
    selectedDocument = _b[0],
    setSelectedDocument = _b[1];
  var _c = (0, react_1.useState)("templates"),
    selectedTab = _c[0],
    setSelectedTab = _c[1];
  var _d = (0, react_1.useState)(""),
    docName = _d[0],
    setDocName = _d[1];
  var _e = (0, react_1.useState)(""),
    docDetails = _e[0],
    setDocDetails = _e[1];
  var _f = (0, react_1.useState)("proposal"),
    docType = _f[0],
    setDocType = _f[1];
  var documentTemplates = [
    {
      id: "business-proposal",
      title: "Business Proposal",
      description:
        "Generate a comprehensive business proposal based on your company data and AI insights",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
        className: "h-12 w-12 text-blue-500",
      }),
      type: "proposal",
    },
    {
      id: "quarterly-report",
      title: "Quarterly Report",
      description:
        "Create a quarterly performance report with key metrics and growth analysis",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FileSpreadsheet, {
        className: "h-12 w-12 text-green-500",
      }),
      type: "report",
    },
    {
      id: "market-analysis",
      title: "Market Analysis",
      description:
        "Generate a detailed market analysis with competitive insights",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FilePieChart, {
        className: "h-12 w-12 text-purple-500",
      }),
      type: "analysis",
    },
    {
      id: "executive-summary",
      title: "Executive Summary",
      description:
        "Create a concise executive summary of your business strategy",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FileCheck, {
        className: "h-12 w-12 text-orange-500",
      }),
      type: "summary",
    },
  ];
  var handleGenerateDocument = function () {
    if (!docName.trim()) {
      sonner_1.toast.error("Please enter a document name");
      return;
    }
    setIsGenerating(true);
    // Simulate document generation
    setTimeout(function () {
      setIsGenerating(false);
      sonner_1.toast.success(
        "".concat(docName, " has been generated successfully"),
      );
    }, 3000);
  };
  var handleOpenTemplate = function (template) {
    setSelectedDocument(template);
    setDocName(
      "".concat(template.title, " - ").concat(new Date().toLocaleDateString()),
    );
    setDocType(template.type);
  };
  var recentDocuments = [
    {
      name: "Q2 Marketing Proposal",
      date: "2025-04-08",
      type: "proposal",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
        className: "h-5 w-5 text-blue-500",
      }),
    },
    {
      name: "Meta Ads Market Analysis",
      date: "2025-04-05",
      type: "analysis",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FilePieChart, {
        className: "h-5 w-5 text-purple-500",
      }),
    },
    {
      name: "Q1 Performance Report",
      date: "2025-03-28",
      type: "report",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FileSpreadsheet, {
        className: "h-5 w-5 text-green-500",
      }),
    },
  ];
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mb-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-xl font-semibold",
                children: "Document Generation",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "Create professional business documents powered by AI insights",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: function () {
              return setSelectedTab("custom");
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "mr-2 h-4 w-4",
              }),
              "New Document",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        value: selectedTab,
        onValueChange: setSelectedTab,
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid grid-cols-3 w-[400px]",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "templates",
                children: "Templates",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "recent",
                children: "Recent Documents",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "custom",
                children: "Custom Document",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "templates",
            className: "space-y-6",
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: documentTemplates.map(function (template) {
                return (0, jsx_runtime_1.jsxs)(
                  card_1.Card,
                  {
                    className:
                      "cursor-pointer hover:shadow-md transition-shadow",
                    onClick: function () {
                      return handleOpenTemplate(template);
                    },
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                        className: "flex flex-row items-center gap-4",
                        children: [
                          template.icon,
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                                children: template.title,
                              }),
                              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                                children: template.description,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "ghost",
                          className: "ml-auto",
                          children: [
                            "Use Template ",
                            (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                              className: "ml-2 h-4 w-4",
                            }),
                          ],
                        }),
                      }),
                    ],
                  },
                  template.id,
                );
              }),
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "recent",
            className: "space-y-6",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Recently Generated Documents",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children:
                        "Access your recently created documents and reports",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "space-y-4",
                    children: recentDocuments.map(function (doc, index) {
                      return (0, jsx_runtime_1.jsxs)(
                        "div",
                        {
                          className:
                            "flex items-center justify-between py-3 border-b last:border-b-0",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center",
                              children: [
                                doc.icon,
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "ml-3",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("h4", {
                                      className: "text-sm font-medium",
                                      children: doc.name,
                                    }),
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      className:
                                        "text-xs text-muted-foreground",
                                      children: ["Created: ", doc.date],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex space-x-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  variant: "ghost",
                                  size: "icon",
                                  children: (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Settings,
                                    { className: "h-4 w-4" },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  variant: "ghost",
                                  size: "icon",
                                  children: (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Download,
                                    { className: "h-4 w-4" },
                                  ),
                                }),
                              ],
                            }),
                          ],
                        },
                        index,
                      );
                    }),
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "custom",
            className: "space-y-6",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Generate Custom Document",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children:
                        "Create a new document with your specific requirements",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "doc-name",
                          children: "Document Name",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "doc-name",
                          placeholder: "Enter document name",
                          value: docName,
                          onChange: function (e) {
                            return setDocName(e.target.value);
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "doc-type",
                          children: "Document Type",
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.Select, {
                          value: docType,
                          onValueChange: setDocType,
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                              id: "doc-type",
                              children: (0, jsx_runtime_1.jsx)(
                                select_1.SelectValue,
                                { placeholder: "Select document type" },
                              ),
                            }),
                            (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                              children: [
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "proposal",
                                  children: "Business Proposal",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "report",
                                  children: "Business Report",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "analysis",
                                  children: "Market Analysis",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "summary",
                                  children: "Executive Summary",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "plan",
                                  children: "Action Plan",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "presentation",
                                  children: "Presentation",
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
                          htmlFor: "doc-details",
                          children: "Additional Details",
                        }),
                        (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                          id: "doc-details",
                          placeholder:
                            "Enter any specific information you'd like to include in this document",
                          rows: 4,
                          value: docDetails,
                          onChange: function (e) {
                            return setDocDetails(e.target.value);
                          },
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
                  className: "flex justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      onClick: function () {
                        return setSelectedTab("templates");
                      },
                      children: "Cancel",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      onClick: handleGenerateDocument,
                      disabled: isGenerating,
                      children: isGenerating
                        ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                                className: "mr-2 h-4 w-4 animate-spin",
                              }),
                              "Generating...",
                            ],
                          })
                        : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
                            children: "Generate Document",
                          }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
        open: !!selectedDocument,
        onOpenChange: function (open) {
          return !open && setSelectedDocument(null);
        },
        children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
          className: "sm:max-w-[540px]",
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
              children: [
                (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, {
                  className: "flex items-center",
                  children: [
                    selectedDocument === null || selectedDocument === void 0
                      ? void 0
                      : selectedDocument.icon,
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "ml-3",
                      children:
                        selectedDocument === null || selectedDocument === void 0
                          ? void 0
                          : selectedDocument.title,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
                  children:
                    selectedDocument === null || selectedDocument === void 0
                      ? void 0
                      : selectedDocument.description,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid gap-4 py-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "template-name",
                      children: "Document Name",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "template-name",
                      value: docName,
                      onChange: function (e) {
                        return setDocName(e.target.value);
                      },
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "template-details",
                      children: "Additional Details",
                    }),
                    (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                      id: "template-details",
                      placeholder:
                        "Enter any specific information you'd like to include",
                      rows: 3,
                      value: docDetails,
                      onChange: function (e) {
                        return setDocDetails(e.target.value);
                      },
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
                    return setSelectedDocument(null);
                  },
                  children: "Cancel",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: handleGenerateDocument,
                  disabled: isGenerating,
                  children: isGenerating
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                            className: "mr-2 h-4 w-4 animate-spin",
                          }),
                          "Generating...",
                        ],
                      })
                    : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
                        children: "Generate Document",
                      }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
