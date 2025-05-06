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
exports.CustomReportBuilder = CustomReportBuilder;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var card_1 = require("@/components/ui/card");
var select_1 = require("@/components/ui/select");
var tabs_1 = require("@/components/ui/tabs");
var dialog_1 = require("@/components/ui/dialog");
var sonner_1 = require("sonner");
var AnalyticsChart_1 = require("./AnalyticsChart");
var EnhancedVisualizations_1 = require("./EnhancedVisualizations");
function CustomReportBuilder() {
  var _a = (0, react_1.useState)("builder"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)("New Report"),
    reportName = _b[0],
    setReportName = _b[1];
  var _c = (0, react_1.useState)(""),
    reportDescription = _c[0],
    setReportDescription = _c[1];
  var _d = (0, react_1.useState)([]),
    reportElements = _d[0],
    setReportElements = _d[1];
  var _e = (0, react_1.useState)([]),
    savedReports = _e[0],
    setSavedReports = _e[1];
  var _f = (0, react_1.useState)(null),
    selectedReport = _f[0],
    setSelectedReport = _f[1];
  var _g = (0, react_1.useState)(false),
    isAddElementOpen = _g[0],
    setIsAddElementOpen = _g[1];
  var _h = (0, react_1.useState)({
      type: "basic",
      chartType: "line",
      dataSource: "leads",
    }),
    newElement = _h[0],
    setNewElement = _h[1];
  // Mock data sources for demonstration
  var dataSources = [
    { id: "leads", name: "Leads" },
    { id: "campaigns", name: "Campaigns" },
    { id: "communications", name: "Communications" },
    { id: "website_visits", name: "Website Visits" },
    { id: "aibots_usage", name: "AI Bots Usage" },
  ];
  var chartTypes = [
    { id: "line", name: "Line Chart" },
    { id: "bar", name: "Bar Chart" },
    { id: "pie", name: "Pie Chart" },
    { id: "area", name: "Area Chart" },
    { id: "funnel", name: "Funnel Analysis" },
    { id: "heatmap", name: "Heatmap" },
    { id: "treemap", name: "Treemap" },
    { id: "bubble", name: "Bubble Chart" },
  ];
  // Sample data for demonstrations
  var getDemoData = function (dataSource, chartType) {
    switch (dataSource) {
      case "leads":
        if (chartType === "funnel") {
          return [
            { name: "Visitors", value: 5000 },
            { name: "Leads", value: 2500 },
            { name: "Qualified", value: 1500 },
            { name: "Proposals", value: 800 },
            { name: "Negotiations", value: 400 },
            { name: "Clients", value: 200 },
          ];
        } else if (chartType === "heatmap") {
          return Array.from({ length: 100 }, function (_, i) {
            return {
              name: "Cell ".concat(i),
              value: Math.floor(Math.random() * 100),
            };
          });
        } else if (chartType === "treemap") {
          return [
            { name: "New", value: 400 },
            { name: "Contacted", value: 300 },
            { name: "Qualified", value: 200 },
            { name: "Proposal", value: 150 },
            { name: "Negotiation", value: 100 },
            { name: "Closed", value: 80 },
            { name: "Lost", value: 40 },
          ];
        } else if (chartType === "bubble") {
          return [
            {
              name: "Quality Score",
              data: Array.from({ length: 15 }, function () {
                return {
                  x: Math.floor(Math.random() * 100),
                  y: Math.floor(Math.random() * 100),
                  z: Math.floor(Math.random() * 100),
                  name: "Lead",
                };
              }),
            },
          ];
        } else {
          return Array.from({ length: 12 }, function (_, i) {
            return {
              name: "Month ".concat(i + 1),
              value: Math.floor(Math.random() * 100),
              value2: Math.floor(Math.random() * 80),
            };
          });
        }
      case "campaigns":
        return Array.from({ length: 8 }, function (_, i) {
          return {
            name: "Campaign ".concat(i + 1),
            value: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 80),
          };
        });
      case "communications":
        return Array.from({ length: 6 }, function (_, i) {
          return {
            name: "Channel ".concat(i + 1),
            value: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 80),
          };
        });
      default:
        return Array.from({ length: 10 }, function (_, i) {
          return {
            name: "Item ".concat(i + 1),
            value: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 80),
          };
        });
    }
  };
  var handleAddElement = function () {
    if (!newElement.title) {
      sonner_1.toast.error("Please provide a title for the report element");
      return;
    }
    var element = {
      id: "element-".concat(Date.now()),
      type: newElement.type || "basic",
      title: newElement.title || "New Element",
      chartType: newElement.chartType || "line",
      dataSource: newElement.dataSource || "leads",
      config: newElement.config || {},
    };
    setReportElements(
      __spreadArray(__spreadArray([], reportElements, true), [element], false),
    );
    setIsAddElementOpen(false);
    setNewElement({
      type: "basic",
      chartType: "line",
      dataSource: "leads",
    });
    sonner_1.toast.success("Report element added");
  };
  var handleRemoveElement = function (id) {
    setReportElements(
      reportElements.filter(function (element) {
        return element.id !== id;
      }),
    );
    sonner_1.toast.success("Element removed");
  };
  var handleSaveReport = function () {
    if (!reportName) {
      sonner_1.toast.error("Please provide a name for the report");
      return;
    }
    if (reportElements.length === 0) {
      sonner_1.toast.error("Please add at least one element to the report");
      return;
    }
    var newReport = {
      id:
        (selectedReport === null || selectedReport === void 0
          ? void 0
          : selectedReport.id) || "report-".concat(Date.now()),
      name: reportName,
      description: reportDescription,
      elements: reportElements,
      createdAt:
        (selectedReport === null || selectedReport === void 0
          ? void 0
          : selectedReport.createdAt) || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (selectedReport) {
      // Update existing report
      setSavedReports(
        savedReports.map(function (report) {
          return report.id === selectedReport.id ? newReport : report;
        }),
      );
      sonner_1.toast.success("Report updated successfully");
    } else {
      // Create new report
      setSavedReports(
        __spreadArray(
          __spreadArray([], savedReports, true),
          [newReport],
          false,
        ),
      );
      sonner_1.toast.success("Report saved successfully");
    }
    setSelectedReport(newReport);
  };
  var handleLoadReport = function (report) {
    setReportName(report.name);
    setReportDescription(report.description);
    setReportElements(report.elements);
    setSelectedReport(report);
    setActiveTab("builder");
    sonner_1.toast.success("Loaded report: ".concat(report.name));
  };
  var handleNewReport = function () {
    setReportName("New Report");
    setReportDescription("");
    setReportElements([]);
    setSelectedReport(null);
    setActiveTab("builder");
  };
  var renderReportElement = function (element) {
    var _a;
    var data = getDemoData(element.dataSource, element.chartType);
    // Advanced visualization types
    if (
      ["heatmap", "treemap", "funnel", "bubble"].includes(element.chartType)
    ) {
      return (0, jsx_runtime_1.jsx)(
        EnhancedVisualizations_1.EnhancedVisualization,
        {
          type: element.chartType,
          data: data,
          title: element.title,
          config: element.config,
        },
      );
    }
    // Basic chart types
    return (0, jsx_runtime_1.jsx)(AnalyticsChart_1.default, {
      title: element.title,
      description: "Data source: ".concat(
        (_a = dataSources.find(function (ds) {
          return ds.id === element.dataSource;
        })) === null || _a === void 0
          ? void 0
          : _a.name,
      ),
      chartType: element.chartType,
      data: data,
      dataKeys: ["value", "value2"],
      colors: ["#8884d8", "#82ca9d"],
      xAxisDataKey: "name",
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-2xl font-bold",
                children: "Custom Reports",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "Build, save, and analyze custom reports for your business",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                onClick: handleNewReport,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "New Report",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                onClick: handleSaveReport,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "Save Report",
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        value: activeTab,
        onValueChange: setActiveTab,
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid grid-cols-2 mb-6",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "builder",
                children: "Report Builder",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "saved",
                children: "Saved Reports",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "builder",
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.Card, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  className: "pt-6",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)(label_1.Label, {
                                htmlFor: "reportName",
                                children: "Report Name",
                              }),
                              (0, jsx_runtime_1.jsx)(input_1.Input, {
                                id: "reportName",
                                value: reportName,
                                onChange: function (e) {
                                  return setReportName(e.target.value);
                                },
                                placeholder: "Enter report name",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)(label_1.Label, {
                                htmlFor: "reportDescription",
                                children: "Description (Optional)",
                              }),
                              (0, jsx_runtime_1.jsx)(input_1.Input, {
                                id: "reportDescription",
                                value: reportDescription,
                                onChange: function (e) {
                                  return setReportDescription(e.target.value);
                                },
                                placeholder: "Enter report description",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "flex items-center justify-end",
                        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "outline",
                          onClick: function () {
                            return sonner_1.toast.success(
                              "Report exported as PDF",
                            );
                          },
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                              className: "mr-2 h-4 w-4",
                            }),
                            "Export Report",
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between items-center",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-lg font-medium",
                    children: "Report Elements",
                  }),
                  (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, {
                    open: isAddElementOpen,
                    onOpenChange: setIsAddElementOpen,
                    children: [
                      (0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, {
                        asChild: true,
                        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                              className: "mr-2 h-4 w-4",
                            }),
                            "Add Element",
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
                        children: [
                          (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
                            children: [
                              (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                                children: "Add Report Element",
                              }),
                              (0, jsx_runtime_1.jsx)(
                                dialog_1.DialogDescription,
                                {
                                  children:
                                    "Configure a new visualization element for your report",
                                },
                              ),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                                    htmlFor: "elementTitle",
                                    children: "Element Title",
                                  }),
                                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                                    id: "elementTitle",
                                    value: newElement.title || "",
                                    onChange: function (e) {
                                      return setNewElement(
                                        __assign(__assign({}, newElement), {
                                          title: e.target.value,
                                        }),
                                      );
                                    },
                                    placeholder: "Enter element title",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                                    htmlFor: "dataSource",
                                    children: "Data Source",
                                  }),
                                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                    value: newElement.dataSource,
                                    onValueChange: function (value) {
                                      return setNewElement(
                                        __assign(__assign({}, newElement), {
                                          dataSource: value,
                                        }),
                                      );
                                    },
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectTrigger,
                                        {
                                          id: "dataSource",
                                          children: (0, jsx_runtime_1.jsx)(
                                            select_1.SelectValue,
                                            {
                                              placeholder: "Select data source",
                                            },
                                          ),
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectContent,
                                        {
                                          children: dataSources.map(
                                            function (source) {
                                              return (0, jsx_runtime_1.jsx)(
                                                select_1.SelectItem,
                                                {
                                                  value: source.id,
                                                  children: source.name,
                                                },
                                                source.id,
                                              );
                                            },
                                          ),
                                        },
                                      ),
                                    ],
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                                    htmlFor: "chartType",
                                    children: "Visualization Type",
                                  }),
                                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                    value: newElement.chartType,
                                    onValueChange: function (value) {
                                      return setNewElement(
                                        __assign(__assign({}, newElement), {
                                          chartType: value,
                                        }),
                                      );
                                    },
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectTrigger,
                                        {
                                          id: "chartType",
                                          children: (0, jsx_runtime_1.jsx)(
                                            select_1.SelectValue,
                                            {
                                              placeholder: "Select chart type",
                                            },
                                          ),
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectContent,
                                        {
                                          children: chartTypes.map(
                                            function (chart) {
                                              return (0, jsx_runtime_1.jsx)(
                                                select_1.SelectItem,
                                                {
                                                  value: chart.id,
                                                  children: chart.name,
                                                },
                                                chart.id,
                                              );
                                            },
                                          ),
                                        },
                                      ),
                                    ],
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
                                  return setIsAddElementOpen(false);
                                },
                                children: "Cancel",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                onClick: handleAddElement,
                                children: "Add Element",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              reportElements.length === 0
                ? (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "border border-dashed rounded-md p-8 text-center bg-background text-muted-foreground",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Layout, {
                        className:
                          "h-12 w-12 mx-auto mb-4 text-muted-foreground/50",
                      }),
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "text-lg font-medium mb-1",
                        children: "No elements added yet",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "mb-4",
                        children:
                          "Add visualization elements to create your custom report",
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "secondary",
                        onClick: function () {
                          return setIsAddElementOpen(true);
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                            className: "mr-2 h-4 w-4",
                          }),
                          "Add Your First Element",
                        ],
                      }),
                    ],
                  })
                : (0, jsx_runtime_1.jsx)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: reportElements.map(function (element) {
                      return (0, jsx_runtime_1.jsxs)(
                        "div",
                        {
                          className: "relative group",
                          children: [
                            renderReportElement(element),
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                              className:
                                "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity",
                              size: "icon",
                              variant: "destructive",
                              onClick: function () {
                                return handleRemoveElement(element.id);
                              },
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.Trash,
                                { className: "h-4 w-4" },
                              ),
                            }),
                          ],
                        },
                        element.id,
                      );
                    }),
                  }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "saved",
            className: "space-y-6",
            children:
              savedReports.length === 0
                ? (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "border border-dashed rounded-md p-8 text-center bg-background text-muted-foreground",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                        className:
                          "h-12 w-12 mx-auto mb-4 text-muted-foreground/50",
                      }),
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "text-lg font-medium mb-1",
                        children: "No saved reports",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "mb-4",
                        children:
                          "Build and save your custom reports for quick access",
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "secondary",
                        onClick: handleNewReport,
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                            className: "mr-2 h-4 w-4",
                          }),
                          "Create Your First Report",
                        ],
                      }),
                    ],
                  })
                : (0, jsx_runtime_1.jsx)("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                    children: savedReports.map(function (report) {
                      return (0, jsx_runtime_1.jsx)(
                        card_1.Card,
                        {
                          className:
                            "cursor-pointer hover:bg-accent/50 transition-colors",
                          children: (0, jsx_runtime_1.jsxs)(
                            card_1.CardContent,
                            {
                              className: "p-4",
                              onClick: function () {
                                return handleLoadReport(report);
                              },
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "flex justify-between items-start mb-2",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("h3", {
                                          className: "font-medium truncate",
                                          children: report.name,
                                        }),
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className:
                                            "text-xs text-muted-foreground",
                                          children: new Date(
                                            report.updatedAt,
                                          ).toLocaleDateString(),
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className:
                                        "text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1",
                                      children: [
                                        report.elements.length,
                                        " elements",
                                      ],
                                    }),
                                  ],
                                }),
                                report.description &&
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className:
                                      "text-sm text-muted-foreground line-clamp-2",
                                    children: report.description,
                                  }),
                              ],
                            },
                          ),
                        },
                        report.id,
                      );
                    }),
                  }),
          }),
        ],
      }),
    ],
  });
}
