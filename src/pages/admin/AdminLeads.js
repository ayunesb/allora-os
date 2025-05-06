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
exports.default = AdminLeads;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var button_1 = require("@/components/ui/button");
var responsive_table_1 = require("@/components/ui/responsive-table");
var input_1 = require("@/components/ui/input");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
var useLeadOperations_1 = require("@/hooks/admin/useLeadOperations");
var useAdvancedLeadScoring_1 = require("@/hooks/useAdvancedLeadScoring");
function AdminLeads() {
  var _this = this;
  var _a = (0, useLeadOperations_1.useLeadOperations)(),
    fetchLeads = _a.fetchLeads,
    updateLeadStatus = _a.updateLeadStatus,
    deleteLead = _a.deleteLead,
    isLoading = _a.isLoading;
  var _b = (0, useAdvancedLeadScoring_1.useAdvancedLeadScoring)(),
    getLeadScoreCategory = _b.getLeadScoreCategory,
    getNextBestAction = _b.getNextBestAction;
  var _c = (0, react_1.useState)([]),
    leads = _c[0],
    setLeads = _c[1];
  var _d = (0, react_1.useState)([]),
    filteredLeads = _d[0],
    setFilteredLeads = _d[1];
  var _e = (0, react_1.useState)(""),
    searchQuery = _e[0],
    setSearchQuery = _e[1];
  var _f = (0, react_1.useState)("all"),
    activeFilter = _f[0],
    setActiveFilter = _f[1];
  var _g = (0, react_1.useState)("score"),
    sortBy = _g[0],
    setSortBy = _g[1];
  var _h = (0, react_1.useState)("desc"),
    sortOrder = _h[0],
    setSortOrder = _h[1];
  (0, react_1.useEffect)(
    function () {
      var loadLeads = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var fetchedLeads;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, fetchLeads()];
              case 1:
                fetchedLeads = _a.sent();
                setLeads(fetchedLeads);
                setFilteredLeads(fetchedLeads);
                return [2 /*return*/];
            }
          });
        });
      };
      loadLeads();
    },
    [fetchLeads],
  );
  (0, react_1.useEffect)(
    function () {
      var result = __spreadArray([], leads, true);
      // Apply search filter
      if (searchQuery) {
        var query_1 = searchQuery.toLowerCase();
        result = result.filter(function (lead) {
          var _a, _b;
          return (
            lead.name.toLowerCase().includes(query_1) ||
            ((_a = lead.email) === null || _a === void 0
              ? void 0
              : _a.toLowerCase().includes(query_1)) ||
            ((_b = lead.company) === null || _b === void 0
              ? void 0
              : _b.toLowerCase().includes(query_1))
          );
        });
      }
      // Apply status filter
      if (activeFilter !== "all") {
        result = result.filter(function (lead) {
          return lead.status === activeFilter;
        });
      }
      // Apply sorting
      result.sort(function (a, b) {
        var comparison = 0;
        if (sortBy === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (sortBy === "score") {
          var scoreA = a.score || 0;
          var scoreB = b.score || 0;
          comparison = scoreA - scoreB;
        } else if (sortBy === "created_at") {
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
      setFilteredLeads(result);
    },
    [leads, searchQuery, activeFilter, sortBy, sortOrder],
  );
  // Explicitly type the handleSort parameter
  var handleSort = function (column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };
  // Explicitly type the parameters for handleStatusUpdate
  var handleStatusUpdate = function (leadId, status) {
    return __awaiter(_this, void 0, void 0, function () {
      var success;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, updateLeadStatus(leadId, status)];
          case 1:
            success = _a.sent();
            if (success) {
              setLeads(function (prev) {
                return prev.map(function (lead) {
                  return lead.id === leadId
                    ? __assign(__assign({}, lead), { status: status })
                    : lead;
                });
              });
            }
            return [2 /*return*/, success];
        }
      });
    });
  };
  // Explicitly type the parameters for handleDelete
  var handleDelete = function (leadId) {
    return __awaiter(_this, void 0, void 0, function () {
      var success;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, deleteLead(leadId)];
          case 1:
            success = _a.sent();
            if (success) {
              setLeads(function (prev) {
                return prev.filter(function (lead) {
                  return lead.id !== leadId;
                });
              });
            }
            return [2 /*return*/, success];
        }
      });
    });
  };
  // Fix the spread type issue by ensuring the object is of the correct type
  var handleUpdateLead = function (leadId, updatedData) {
    setLeads(function (prevLeads) {
      return prevLeads.map(function (lead) {
        return lead.id === leadId
          ? __assign(__assign({}, lead), updatedData)
          : lead;
      });
    });
  };
  // Explicitly type the parameters
  var handleDeleteLead = function (leadId) {
    setLeads(function (prevLeads) {
      return prevLeads.filter(function (lead) {
        return lead.id !== leadId;
      });
    });
  };
  var handleStatusChange = function (status) {
    // ...existing code...
  };
  // Explicitly type the renderStatusBadge parameter
  var renderStatusBadge = function (status) {
    switch (status) {
      case "new":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30",
          children: status,
        });
      case "contacted":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
          children: status,
        });
      case "qualified":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30",
          children: status,
        });
      case "proposal":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30",
          children: status,
        });
      case "negotiation":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30",
          children: status,
        });
      case "closed":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "secondary",
          children: status,
        });
      case "lost":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30",
          children: status,
        });
      default:
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          children: status,
        });
    }
  };
  // Explicitly type the renderLeadScore parameter
  var renderLeadScore = function (lead) {
    var scoreCategory = getLeadScoreCategory(lead);
    var colorClass = "";
    if (scoreCategory === "hot") {
      colorClass = "text-red-600 dark:text-red-400";
    } else if (scoreCategory === "warm") {
      colorClass = "text-yellow-600 dark:text-yellow-400";
    } else {
      colorClass = "text-blue-600 dark:text-blue-400";
    }
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col",
      children: [
        (0, jsx_runtime_1.jsx)("span", {
          className: "font-medium ".concat(colorClass),
          children: scoreCategory.toUpperCase(),
        }),
        (0, jsx_runtime_1.jsxs)("span", {
          className: "text-xs text-muted-foreground",
          children: [lead.score || 0, " pts"],
        }),
      ],
    });
  };
  var scoreHeaderRender = function () {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "flex items-center cursor-pointer",
      onClick: function () {
        return handleSort("score");
      },
      children: [
        "Score",
        (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, {
          className: "ml-1 h-4 w-4",
        }),
      ],
    });
  };
  var columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      render: function (item) {
        return (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-col",
          children: [
            (0, jsx_runtime_1.jsx)("span", {
              className: "font-medium",
              children: item.name,
            }),
            item.company &&
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs text-muted-foreground",
                children: item.company,
              }),
          ],
        });
      },
    },
    {
      key: "email",
      title: "Contact",
      hideOnMobile: true,
      render: function (item) {
        return (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-col",
          children: [
            item.email &&
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-sm",
                children: item.email,
              }),
            item.phone &&
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs text-muted-foreground",
                children: item.phone,
              }),
          ],
        });
      },
    },
    {
      key: "status",
      title: "Status",
      render: function (item) {
        return renderStatusBadge(item.status);
      },
    },
    {
      key: "score",
      title: "Score",
      titleRender: scoreHeaderRender,
      sortable: true,
      render: function (item) {
        return renderLeadScore(item);
      },
    },
    {
      key: "action",
      title: "Next Action",
      hideOnMobile: true,
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("div", {
          className: "max-w-[200px] truncate text-sm",
          children: getNextBestAction(item),
        });
      },
    },
  ];
  var mobileColumns = [
    {
      key: "name",
      title: "Lead",
      render: function (item) {
        return (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "font-medium",
              children: item.name,
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-xs text-muted-foreground",
              children: item.company,
            }),
          ],
        });
      },
    },
    {
      key: "status",
      title: "Status",
      render: function (item) {
        return renderStatusBadge(item.status);
      },
    },
    {
      key: "score",
      title: "Score",
      render: function (item) {
        return renderLeadScore(item);
      },
    },
  ];
  // Explicitly type the actions parameter
  var actions = function (item) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "flex gap-2 justify-end",
      children: [
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          size: "icon",
          variant: "ghost",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
            className: "h-4 w-4",
          }),
        }),
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          size: "icon",
          variant: "ghost",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, {
            className: "h-4 w-4",
          }),
        }),
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          size: "icon",
          variant: "ghost",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
            className: "h-4 w-4",
          }),
        }),
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          size: "icon",
          variant: "ghost",
          className: "text-destructive hover:text-destructive",
          onClick: function () {
            return handleDelete(item.id);
          },
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
            className: "h-4 w-4",
          }),
        }),
      ],
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "Lead Management",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "primary",
            className: "w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "h-4 w-4 mr-2",
              }),
              "Add Lead",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "all",
        value: activeFilter,
        onValueChange: setActiveFilter,
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "relative w-full max-w-md",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
                    className:
                      "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    placeholder: "Search leads...",
                    className: "pl-8",
                    value: searchQuery,
                    onChange: function (e) {
                      return setSearchQuery(e.target.value);
                    },
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "all",
                    children: "All",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "new",
                    children: "New",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "contacted",
                    children: "Contacted",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "qualified",
                    children: "Qualified",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "proposal",
                    children: "Proposal",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: activeFilter,
            className: "mt-4",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children:
                          activeFilter === "all"
                            ? "All Leads"
                            : "".concat(
                                activeFilter.charAt(0).toUpperCase() +
                                  activeFilter.slice(1),
                                " Leads",
                              ),
                      }),
                      isLoading &&
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-sm text-muted-foreground",
                          children: "Loading...",
                        }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)(
                    responsive_table_1.ResponsiveTable,
                    {
                      data: filteredLeads,
                      columns: columns,
                      mobileColumns: mobileColumns,
                      actions: actions,
                      emptyState: (0, jsx_runtime_1.jsx)("div", {
                        className: "py-8 text-center",
                        children: (0, jsx_runtime_1.jsx)(
                          typography_1.TypographyP,
                          {
                            children: "No leads found matching your criteria.",
                          },
                        ),
                      }),
                    },
                  ),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
