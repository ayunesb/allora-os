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
exports.CustomerJourneyMapper = CustomerJourneyMapper;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var tabs_1 = require("@/components/ui/tabs");
var label_1 = require("@/components/ui/label");
var dialog_1 = require("@/components/ui/dialog");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
// Sample data
var DEFAULT_JOURNEY = [
  {
    id: "awareness",
    title: "Awareness",
    description:
      "Customer becomes aware of a need or problem and discovers your brand",
    touchpoints: [
      {
        id: "social_ad",
        title: "Social Media Ad",
        channel: "Facebook",
        content: "Awareness campaign highlighting industry challenges",
        metrics: ["Impressions", "Reach", "Frequency"],
        status: "active",
      },
      {
        id: "blog_post",
        title: "Blog Post",
        channel: "Website",
        content: "Educational content about industry trends",
        metrics: ["Page Views", "Time on Page", "Bounce Rate"],
        status: "active",
      },
    ],
  },
  {
    id: "consideration",
    title: "Consideration",
    description: "Customer evaluates your solution against alternatives",
    touchpoints: [
      {
        id: "email_nurture",
        title: "Email Sequence",
        channel: "Email",
        content: "Product features and benefits",
        metrics: ["Open Rate", "Click Rate", "Responses"],
        status: "active",
      },
      {
        id: "case_study",
        title: "Case Study",
        channel: "Website",
        content: "Success stories from similar customers",
        metrics: ["Downloads", "Form Fills", "Follow-up Requests"],
        status: "draft",
      },
    ],
  },
  {
    id: "conversion",
    title: "Conversion",
    description: "Customer makes purchase decision",
    touchpoints: [
      {
        id: "sales_call",
        title: "Sales Call",
        channel: "Phone",
        content: "Personalized presentation and proposal",
        metrics: ["Call Duration", "Next Steps", "Close Rate"],
        status: "active",
      },
    ],
  },
  {
    id: "retention",
    title: "Retention",
    description: "Customer continues using your product/service",
    touchpoints: [
      {
        id: "onboarding",
        title: "Onboarding Sequence",
        channel: "Email/In-app",
        content: "Getting started guides and tips",
        metrics: ["Completion Rate", "Feature Adoption", "Support Tickets"],
        status: "active",
      },
    ],
  },
];
function CustomerJourneyMapper() {
  var _a;
  var _b = (0, react_1.useState)(DEFAULT_JOURNEY),
    journeyStages = _b[0],
    setJourneyStages = _b[1];
  var _c = (0, react_1.useState)("default"),
    selectedJourney = _c[0],
    setSelectedJourney = _c[1];
  var _d = (0, react_1.useState)("flow"),
    activeView = _d[0],
    setActiveView = _d[1];
  var _e = (0, react_1.useState)(null),
    editingStage = _e[0],
    setEditingStage = _e[1];
  var _f = (0, react_1.useState)(null),
    editingTouchpoint = _f[0],
    setEditingTouchpoint = _f[1];
  var _g = (0, react_1.useState)(false),
    openStageDialog = _g[0],
    setOpenStageDialog = _g[1];
  var _h = (0, react_1.useState)(false),
    openTouchpointDialog = _h[0],
    setOpenTouchpointDialog = _h[1];
  // Handle stage editing
  var handleAddStage = function () {
    setEditingStage({
      id: "",
      title: "",
      description: "",
      touchpoints: [],
    });
    setOpenStageDialog(true);
  };
  var handleEditStage = function (stage) {
    setEditingStage(__assign({}, stage));
    setOpenStageDialog(true);
  };
  var handleSaveStage = function (formData) {
    if (
      editingStage === null || editingStage === void 0
        ? void 0
        : editingStage.id
    ) {
      // Update existing stage
      setJourneyStages(function (prev) {
        return prev.map(function (stage) {
          return stage.id === editingStage.id
            ? __assign(__assign({}, stage), formData)
            : stage;
        });
      });
      sonner_1.toast.success("Stage updated successfully");
    } else {
      // Add new stage
      var newStage_1 = {
        id: "stage_".concat(Date.now()),
        title: formData.title,
        description: formData.description,
        touchpoints: [],
      };
      setJourneyStages(function (prev) {
        return __spreadArray(
          __spreadArray([], prev, true),
          [newStage_1],
          false,
        );
      });
      sonner_1.toast.success("New stage added successfully");
    }
    setOpenStageDialog(false);
  };
  // Handle touchpoint editing
  var handleAddTouchpoint = function (stageId) {
    setEditingTouchpoint({
      id: "",
      title: "",
      channel: "",
      content: "",
      metrics: [],
      status: "draft",
    });
    setEditingStage(
      journeyStages.find(function (stage) {
        return stage.id === stageId;
      }) || null,
    );
    setOpenTouchpointDialog(true);
  };
  var handleEditTouchpoint = function (stageId, touchpoint) {
    setEditingTouchpoint(__assign({}, touchpoint));
    setEditingStage(
      journeyStages.find(function (stage) {
        return stage.id === stageId;
      }) || null,
    );
    setOpenTouchpointDialog(true);
  };
  var handleSaveTouchpoint = function (formData) {
    if (!editingStage) return;
    var updatedTouchpoint = {
      id:
        (editingTouchpoint === null || editingTouchpoint === void 0
          ? void 0
          : editingTouchpoint.id) || "touchpoint_".concat(Date.now()),
      title: formData.title,
      channel: formData.channel,
      content: formData.content,
      metrics: formData.metrics.split(",").map(function (m) {
        return m.trim();
      }),
      status: formData.status,
    };
    if (
      editingTouchpoint === null || editingTouchpoint === void 0
        ? void 0
        : editingTouchpoint.id
    ) {
      // Update existing touchpoint
      setJourneyStages(function (prev) {
        return prev.map(function (stage) {
          return stage.id === editingStage.id
            ? __assign(__assign({}, stage), {
                touchpoints: stage.touchpoints.map(function (tp) {
                  return tp.id === updatedTouchpoint.id
                    ? updatedTouchpoint
                    : tp;
                }),
              })
            : stage;
        });
      });
      sonner_1.toast.success("Touchpoint updated successfully");
    } else {
      // Add new touchpoint
      setJourneyStages(function (prev) {
        return prev.map(function (stage) {
          return stage.id === editingStage.id
            ? __assign(__assign({}, stage), {
                touchpoints: __spreadArray(
                  __spreadArray([], stage.touchpoints, true),
                  [updatedTouchpoint],
                  false,
                ),
              })
            : stage;
        });
      });
      sonner_1.toast.success("New touchpoint added successfully");
    }
    setOpenTouchpointDialog(false);
  };
  var handleDeleteTouchpoint = function (stageId, touchpointId) {
    setJourneyStages(function (prev) {
      return prev.map(function (stage) {
        return stage.id === stageId
          ? __assign(__assign({}, stage), {
              touchpoints: stage.touchpoints.filter(function (tp) {
                return tp.id !== touchpointId;
              }),
            })
          : stage;
      });
    });
    sonner_1.toast.success("Touchpoint removed");
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Customer Journey Mapper",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children:
                    "Visualize and optimize your customer's path to purchase",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: selectedJourney,
                  onValueChange: setSelectedJourney,
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      className: "w-[180px]",
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Select Journey",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "default",
                          children: "Default Journey",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "b2b_saas",
                          children: "B2B SaaS Journey",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "ecommerce",
                          children: "E-commerce Journey",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "outline",
                  size: "sm",
                  onClick: function () {},
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.FilePlus, {
                      className: "h-4 w-4 mr-1",
                    }),
                    "Export",
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "p-0",
        children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          value: activeView,
          onValueChange: function (value) {
            return setActiveView(value);
          },
          className: "w-full",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "border-b px-6",
              children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "mb-0",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "flow",
                    children: "Journey Flow",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "metrics",
                    children: "Journey Metrics",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "p-6",
              children: [
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "flow",
                  className: "mt-0",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-1 gap-8",
                    children: [
                      journeyStages.map(function (stage, index) {
                        return (0, jsx_runtime_1.jsxs)(
                          "div",
                          {
                            className: "relative",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className:
                                  "flex justify-between items-start bg-muted/30 p-4 rounded-lg mb-2",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    children: [
                                      (0, jsx_runtime_1.jsxs)("h3", {
                                        className:
                                          "text-lg font-semibold flex items-center",
                                        children: [
                                          (0, jsx_runtime_1.jsx)("div", {
                                            className:
                                              "flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full w-6 h-6 mr-2 text-sm",
                                            children: index + 1,
                                          }),
                                          stage.title,
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children: stage.description,
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex space-x-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: function () {
                                          return handleEditStage(stage);
                                        },
                                        children: (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Edit,
                                          { className: "h-4 w-4" },
                                        ),
                                      }),
                                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: function () {
                                          return handleAddTouchpoint(stage.id);
                                        },
                                        children: (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.PlusCircle,
                                          { className: "h-4 w-4" },
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "grid grid-cols-1 gap-3 pl-8",
                                children: [
                                  stage.touchpoints.map(function (touchpoint) {
                                    return (0, jsx_runtime_1.jsx)(
                                      card_1.Card,
                                      {
                                        className:
                                          "relative border-l-4 ".concat(
                                            touchpoint.status === "active"
                                              ? "border-l-green-500"
                                              : touchpoint.status === "draft"
                                                ? "border-l-amber-500"
                                                : "border-l-red-500",
                                          ),
                                        children: (0, jsx_runtime_1.jsx)(
                                          card_1.CardContent,
                                          {
                                            className: "p-4",
                                            children: (0, jsx_runtime_1.jsxs)(
                                              "div",
                                              {
                                                className:
                                                  "flex justify-between items-start",
                                                children: [
                                                  (0, jsx_runtime_1.jsxs)(
                                                    "div",
                                                    {
                                                      children: [
                                                        (0, jsx_runtime_1.jsx)(
                                                          "h4",
                                                          {
                                                            className:
                                                              "font-medium",
                                                            children:
                                                              touchpoint.title,
                                                          },
                                                        ),
                                                        (0, jsx_runtime_1.jsxs)(
                                                          "div",
                                                          {
                                                            className:
                                                              "flex items-center text-sm text-muted-foreground",
                                                            children: [
                                                              (0,
                                                              jsx_runtime_1.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "bg-muted px-2 py-0.5 rounded text-xs mr-2",
                                                                  children:
                                                                    touchpoint.channel,
                                                                },
                                                              ),
                                                              touchpoint.content,
                                                            ],
                                                          },
                                                        ),
                                                        (0, jsx_runtime_1.jsx)(
                                                          "div",
                                                          {
                                                            className:
                                                              "flex flex-wrap gap-1 mt-2",
                                                            children:
                                                              touchpoint.metrics.map(
                                                                function (
                                                                  metric,
                                                                  i,
                                                                ) {
                                                                  return (0,
                                                                  jsx_runtime_1.jsx)(
                                                                    "span",
                                                                    {
                                                                      className:
                                                                        "text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full",
                                                                      children:
                                                                        metric,
                                                                    },
                                                                    i,
                                                                  );
                                                                },
                                                              ),
                                                          },
                                                        ),
                                                      ],
                                                    },
                                                  ),
                                                  (0, jsx_runtime_1.jsxs)(
                                                    "div",
                                                    {
                                                      className:
                                                        "flex space-x-1",
                                                      children: [
                                                        (0, jsx_runtime_1.jsx)(
                                                          button_1.Button,
                                                          {
                                                            variant: "ghost",
                                                            size: "sm",
                                                            className:
                                                              "h-7 w-7 p-0",
                                                            onClick:
                                                              function () {
                                                                return handleEditTouchpoint(
                                                                  stage.id,
                                                                  touchpoint,
                                                                );
                                                              },
                                                            children: (0,
                                                            jsx_runtime_1.jsx)(
                                                              lucide_react_1.Edit,
                                                              {
                                                                className:
                                                                  "h-3.5 w-3.5",
                                                              },
                                                            ),
                                                          },
                                                        ),
                                                        (0, jsx_runtime_1.jsx)(
                                                          button_1.Button,
                                                          {
                                                            variant: "ghost",
                                                            size: "sm",
                                                            className:
                                                              "h-7 w-7 p-0",
                                                            onClick:
                                                              function () {
                                                                return handleDeleteTouchpoint(
                                                                  stage.id,
                                                                  touchpoint.id,
                                                                );
                                                              },
                                                            children: (0,
                                                            jsx_runtime_1.jsx)(
                                                              lucide_react_1.Trash,
                                                              {
                                                                className:
                                                                  "h-3.5 w-3.5",
                                                              },
                                                            ),
                                                          },
                                                        ),
                                                      ],
                                                    },
                                                  ),
                                                ],
                                              },
                                            ),
                                          },
                                        ),
                                      },
                                      touchpoint.id,
                                    );
                                  }),
                                  stage.touchpoints.length === 0 &&
                                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                      variant: "outline",
                                      className: "border-dashed",
                                      onClick: function () {
                                        return handleAddTouchpoint(stage.id);
                                      },
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.PlusCircle,
                                          { className: "h-4 w-4 mr-2" },
                                        ),
                                        "Add First Touchpoint",
                                      ],
                                    }),
                                ],
                              }),
                              index < journeyStages.length - 1 &&
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "flex justify-center my-4",
                                  children: (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.ArrowDown,
                                    {
                                      className:
                                        "h-6 w-6 text-muted-foreground",
                                    },
                                  ),
                                }),
                            ],
                          },
                          stage.id,
                        );
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "outline",
                        className: "mt-4 border-dashed",
                        onClick: handleAddStage,
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.PlusSquare, {
                            className: "h-4 w-4 mr-2",
                          }),
                          "Add New Stage",
                        ],
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "metrics",
                  className: "mt-0",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-6",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)(card_1.Card, {
                            children: [
                              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                className: "pb-2",
                                children: (0, jsx_runtime_1.jsxs)(
                                  card_1.CardTitle,
                                  {
                                    className: "text-base flex items-center",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Target,
                                        {
                                          className:
                                            "h-4 w-4 mr-2 text-primary",
                                        },
                                      ),
                                      "Journey Completion",
                                    ],
                                  },
                                ),
                              }),
                              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                                children: [
                                  (0, jsx_runtime_1.jsx)("div", {
                                    className: "text-3xl font-bold",
                                    children: "68%",
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Average journey completion rate",
                                  }),
                                  (0, jsx_runtime_1.jsx)("div", {
                                    className:
                                      "w-full bg-muted rounded-full h-2.5 mt-2",
                                    children: (0, jsx_runtime_1.jsx)("div", {
                                      className:
                                        "bg-primary h-2.5 rounded-full",
                                      style: { width: "68%" },
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)(card_1.Card, {
                            children: [
                              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                className: "pb-2",
                                children: (0, jsx_runtime_1.jsxs)(
                                  card_1.CardTitle,
                                  {
                                    className: "text-base flex items-center",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.MoveVertical,
                                        {
                                          className:
                                            "h-4 w-4 mr-2 text-primary",
                                        },
                                      ),
                                      "Conversion Points",
                                    ],
                                  },
                                ),
                              }),
                              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                                children: [
                                  (0, jsx_runtime_1.jsx)("div", {
                                    className: "text-3xl font-bold",
                                    children: "12",
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children:
                                      "Total conversion points across journey",
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex justify-between mt-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)("span", {
                                        className: "text-xs",
                                        children: "Awareness: 3",
                                      }),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        className: "text-xs",
                                        children: "Consideration: 5",
                                      }),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        className: "text-xs",
                                        children: "Conversion: 4",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)(card_1.Card, {
                            children: [
                              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                className: "pb-2",
                                children: (0, jsx_runtime_1.jsxs)(
                                  card_1.CardTitle,
                                  {
                                    className: "text-base flex items-center",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.UserPlus,
                                        {
                                          className:
                                            "h-4 w-4 mr-2 text-primary",
                                        },
                                      ),
                                      "Customer Acquisition",
                                    ],
                                  },
                                ),
                              }),
                              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                                children: [
                                  (0, jsx_runtime_1.jsx)("div", {
                                    className: "text-3xl font-bold",
                                    children: "$42",
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Average cost per acquisition",
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className:
                                      "flex items-center text-green-500 text-xs mt-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.ArrowDown,
                                        {
                                          className: "h-3 w-3 mr-1 rotate-180",
                                        },
                                      ),
                                      "12% lower than previous period",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(card_1.Card, {
                        children: [
                          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                            className: "pb-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                                className: "text-lg flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.BarChart,
                                    { className: "h-5 w-5 mr-2 text-primary" },
                                  ),
                                  "Journey Performance by Stage",
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                                children:
                                  "Track engagement and conversion metrics across your customer journey",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                            children: (0, jsx_runtime_1.jsx)("div", {
                              className: "space-y-4",
                              children: journeyStages.map(
                                function (stage, index) {
                                  return (0, jsx_runtime_1.jsxs)(
                                    "div",
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsxs)("div", {
                                          className:
                                            "flex justify-between items-center mb-2",
                                          children: [
                                            (0, jsx_runtime_1.jsx)("h3", {
                                              className: "font-medium",
                                              children: stage.title,
                                            }),
                                            (0, jsx_runtime_1.jsxs)("div", {
                                              className: "flex items-center",
                                              children: [
                                                (0, jsx_runtime_1.jsx)("span", {
                                                  className: "text-sm mr-2",
                                                  children:
                                                    index === 0
                                                      ? "100%"
                                                      : index === 1
                                                        ? "72%"
                                                        : index === 2
                                                          ? "45%"
                                                          : "28%",
                                                }),
                                                (0, jsx_runtime_1.jsx)(
                                                  lucide_react_1.Link,
                                                  {
                                                    className:
                                                      "h-4 w-4 text-muted-foreground",
                                                  },
                                                ),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, jsx_runtime_1.jsx)("div", {
                                          className:
                                            "w-full bg-muted rounded-full h-2.5",
                                          children: (0, jsx_runtime_1.jsx)(
                                            "div",
                                            {
                                              className:
                                                "bg-primary h-2.5 rounded-full",
                                              style: {
                                                width:
                                                  index === 0
                                                    ? "100%"
                                                    : index === 1
                                                      ? "72%"
                                                      : index === 2
                                                        ? "45%"
                                                        : "28%",
                                              },
                                            },
                                          ),
                                        }),
                                        (0, jsx_runtime_1.jsx)("div", {
                                          className:
                                            "grid grid-cols-3 gap-2 mt-2",
                                          children: stage.touchpoints.map(
                                            function (touchpoint) {
                                              return (0, jsx_runtime_1.jsxs)(
                                                "div",
                                                {
                                                  className:
                                                    "text-xs flex justify-between bg-muted/40 p-2 rounded",
                                                  children: [
                                                    (0, jsx_runtime_1.jsx)(
                                                      "span",
                                                      {
                                                        children:
                                                          touchpoint.title,
                                                      },
                                                    ),
                                                    (0, jsx_runtime_1.jsx)(
                                                      "span",
                                                      {
                                                        className:
                                                          "font-medium",
                                                        children:
                                                          touchpoint.status ===
                                                          "active"
                                                            ? "+24%"
                                                            : touchpoint.status ===
                                                                "draft"
                                                              ? "N/A"
                                                              : "-5%",
                                                      },
                                                    ),
                                                  ],
                                                },
                                                touchpoint.id,
                                              );
                                            },
                                          ),
                                        }),
                                      ],
                                    },
                                    stage.id,
                                  );
                                },
                              ),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
        open: openStageDialog,
        onOpenChange: setOpenStageDialog,
        children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                  children: (
                    editingStage === null || editingStage === void 0
                      ? void 0
                      : editingStage.id
                  )
                    ? "Edit Journey Stage"
                    : "Add Journey Stage",
                }),
                (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
                  children: "Define a stage in your customer journey",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("form", {
              onSubmit: function (e) {
                e.preventDefault();
                var formData = new FormData(e.currentTarget);
                handleSaveStage({
                  title: formData.get("title"),
                  description: formData.get("description"),
                });
              },
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4 py-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "title",
                          children: "Stage Name",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "title",
                          name: "title",
                          placeholder: "e.g. Awareness, Consideration",
                          defaultValue:
                            (editingStage === null || editingStage === void 0
                              ? void 0
                              : editingStage.title) || "",
                          required: true,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "description",
                          children: "Description",
                        }),
                        (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                          id: "description",
                          name: "description",
                          placeholder:
                            "Describe this stage in the customer journey",
                          defaultValue:
                            (editingStage === null || editingStage === void 0
                              ? void 0
                              : editingStage.description) || "",
                          required: true,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "submit",
                    children: (
                      editingStage === null || editingStage === void 0
                        ? void 0
                        : editingStage.id
                    )
                      ? "Update Stage"
                      : "Add Stage",
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
        open: openTouchpointDialog,
        onOpenChange: setOpenTouchpointDialog,
        children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                  children: (
                    editingTouchpoint === null || editingTouchpoint === void 0
                      ? void 0
                      : editingTouchpoint.id
                  )
                    ? "Edit Touchpoint"
                    : "Add Touchpoint",
                }),
                (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, {
                  children: [
                    "Define a customer interaction point in the ",
                    editingStage === null || editingStage === void 0
                      ? void 0
                      : editingStage.title,
                    " stage",
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("form", {
              onSubmit: function (e) {
                e.preventDefault();
                var formData = new FormData(e.currentTarget);
                handleSaveTouchpoint({
                  title: formData.get("title"),
                  channel: formData.get("channel"),
                  content: formData.get("content"),
                  metrics: formData.get("metrics"),
                  status: formData.get("status"),
                });
              },
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4 py-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "title",
                          children: "Touchpoint Name",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "title",
                          name: "title",
                          placeholder: "e.g. Welcome Email, Product Demo",
                          defaultValue:
                            (editingTouchpoint === null ||
                            editingTouchpoint === void 0
                              ? void 0
                              : editingTouchpoint.title) || "",
                          required: true,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "channel",
                          children: "Channel",
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.Select, {
                          name: "channel",
                          defaultValue:
                            (editingTouchpoint === null ||
                            editingTouchpoint === void 0
                              ? void 0
                              : editingTouchpoint.channel) || "",
                          required: true,
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                              children: (0, jsx_runtime_1.jsx)(
                                select_1.SelectValue,
                                { placeholder: "Select channel" },
                              ),
                            }),
                            (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                              children: [
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "Email",
                                  children: "Email",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "Website",
                                  children: "Website",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "Social Media",
                                  children: "Social Media",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "In-app",
                                  children: "In-app",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "Phone",
                                  children: "Phone",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "SMS",
                                  children: "SMS",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "Direct Mail",
                                  children: "Direct Mail",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "Event",
                                  children: "Event",
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
                          htmlFor: "content",
                          children: "Content/Message",
                        }),
                        (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                          id: "content",
                          name: "content",
                          placeholder:
                            "What message does this touchpoint deliver?",
                          defaultValue:
                            (editingTouchpoint === null ||
                            editingTouchpoint === void 0
                              ? void 0
                              : editingTouchpoint.content) || "",
                          required: true,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "metrics",
                          children: "Key Metrics (comma separated)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "metrics",
                          name: "metrics",
                          placeholder: "e.g. Open Rate, CTR, Conversion Rate",
                          defaultValue:
                            ((_a =
                              editingTouchpoint === null ||
                              editingTouchpoint === void 0
                                ? void 0
                                : editingTouchpoint.metrics) === null ||
                            _a === void 0
                              ? void 0
                              : _a.join(", ")) || "",
                          required: true,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "status",
                          children: "Status",
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.Select, {
                          name: "status",
                          defaultValue:
                            (editingTouchpoint === null ||
                            editingTouchpoint === void 0
                              ? void 0
                              : editingTouchpoint.status) || "draft",
                          required: true,
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                              children: (0, jsx_runtime_1.jsx)(
                                select_1.SelectValue,
                                { placeholder: "Select status" },
                              ),
                            }),
                            (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                              children: [
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "active",
                                  children: "Active",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "draft",
                                  children: "Draft",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "inactive",
                                  children: "Inactive",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "submit",
                    children: (
                      editingTouchpoint === null || editingTouchpoint === void 0
                        ? void 0
                        : editingTouchpoint.id
                    )
                      ? "Update Touchpoint"
                      : "Add Touchpoint",
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
exports.default = CustomerJourneyMapper;
