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
exports.LinkedInIntegration = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var checkbox_1 = require("@/components/ui/checkbox");
var useLinkedInIntegration_1 = require("@/hooks/useLinkedInIntegration");
var lucide_react_1 = require("lucide-react");
var select_1 = require("@/components/ui/select");
var react_query_1 = require("@tanstack/react-query");
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
var LinkedInIntegration = function (_a) {
  var children = _a.children,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    _c = _a.size,
    size = _c === void 0 ? "medium" : _c;
  var _d = (0, useLinkedInIntegration_1.useLinkedInIntegration)(),
    connectToLinkedIn = _d.connectToLinkedIn,
    searchConnections = _d.searchConnections,
    importConnections = _d.importConnections,
    disconnect = _d.disconnect,
    isAuthenticated = _d.isAuthenticated,
    isConnecting = _d.isConnecting,
    isSearching = _d.isSearching,
    isImporting = _d.isImporting;
  var _e = (0, react_1.useState)(""),
    searchQuery = _e[0],
    setSearchQuery = _e[1];
  var _f = (0, react_1.useState)([]),
    connections = _f[0],
    setConnections = _f[1];
  var _g = (0, react_1.useState)([]),
    selectedConnections = _g[0],
    setSelectedConnections = _g[1];
  var _h = (0, react_1.useState)(""),
    selectedCampaign = _h[0],
    setSelectedCampaign = _h[1];
  // Fetch campaigns
  var _j = (0, react_query_1.useQuery)({
      queryKey: ["campaigns"],
      queryFn: function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var _a, data, error;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                return [
                  4 /*yield*/,
                  supabase_1.supabase
                    .from("campaigns")
                    .select("id, name")
                    .order("name", { ascending: true }),
                ];
              case 1:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) throw error;
                return [2 /*return*/, data || []];
            }
          });
        });
      },
    }).data,
    campaigns = _j === void 0 ? [] : _j;
  var handleSearch = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var results;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!searchQuery.trim()) {
              sonner_1.toast.error("Please enter a search term");
              return [2 /*return*/];
            }
            return [4 /*yield*/, searchConnections(searchQuery)];
          case 1:
            results = _a.sent();
            setConnections(results);
            setSelectedConnections([]);
            return [2 /*return*/];
        }
      });
    });
  };
  var handleImport = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var connectionsToImport;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!selectedCampaign) {
              sonner_1.toast.error("Please select a campaign");
              return [2 /*return*/];
            }
            if (selectedConnections.length === 0) {
              sonner_1.toast.error(
                "Please select at least one connection to import",
              );
              return [2 /*return*/];
            }
            connectionsToImport = connections.filter(function (c) {
              return selectedConnections.includes(c.id);
            });
            return [
              4 /*yield*/,
              importConnections(connectionsToImport, selectedCampaign),
            ];
          case 1:
            _a.sent();
            // Clear selections after import
            setSelectedConnections([]);
            return [2 /*return*/];
        }
      });
    });
  };
  var toggleConnectionSelection = function (id) {
    setSelectedConnections(function (prev) {
      return prev.includes(id)
        ? prev.filter(function (c) {
            return c !== id;
          })
        : __spreadArray(__spreadArray([], prev, true), [id], false);
    });
  };
  var selectAllConnections = function () {
    if (selectedConnections.length === connections.length) {
      setSelectedConnections([]);
    } else {
      setSelectedConnections(
        connections.map(function (c) {
          return c.id;
        }),
      );
    }
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "LinkedIn Integration",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "Connect to LinkedIn to import your connections as leads",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: !isAuthenticated
            ? (0, jsx_runtime_1.jsxs)("div", {
                className: "flex flex-col items-center gap-4 py-6",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    children:
                      "Connect your LinkedIn account to import connections as leads",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    onClick: connectToLinkedIn,
                    disabled: isConnecting,
                    children: isConnecting
                      ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                              className: "mr-2 h-4 w-4 animate-spin",
                            }),
                            "Connecting...",
                          ],
                        })
                      : "Connect to LinkedIn",
                  }),
                ],
              })
            : (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-6",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm font-medium",
                            children: "Connected to LinkedIn",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children: "Search and import your connections",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        variant: "outline",
                        onClick: disconnect,
                        children: "Disconnect",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(input_1.Input, {
                            placeholder: "Search connections...",
                            value: searchQuery,
                            onChange: function (e) {
                              return setSearchQuery(e.target.value);
                            },
                            className: "flex-1",
                          }),
                          (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            onClick: handleSearch,
                            disabled: isSearching,
                            children: [
                              isSearching
                                ? (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Loader2,
                                    { className: "h-4 w-4 animate-spin" },
                                  )
                                : (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Search,
                                    { className: "h-4 w-4 mr-2" },
                                  ),
                              "Search",
                            ],
                          }),
                        ],
                      }),
                      connections.length > 0 &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  variant: "ghost",
                                  size: "sm",
                                  onClick: selectAllConnections,
                                  children:
                                    selectedConnections.length ===
                                    connections.length
                                      ? "Deselect All"
                                      : "Select All",
                                }),
                                (0, jsx_runtime_1.jsxs)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children: [
                                    selectedConnections.length,
                                    " of ",
                                    connections.length,
                                    " selected",
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "border rounded-md",
                              children: connections.map(function (connection) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "div",
                                  {
                                    className:
                                      "flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-muted/50",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        checkbox_1.Checkbox,
                                        {
                                          checked: selectedConnections.includes(
                                            connection.id,
                                          ),
                                          onCheckedChange: function () {
                                            return toggleConnectionSelection(
                                              connection.id,
                                            );
                                          },
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex-1",
                                        children: [
                                          (0, jsx_runtime_1.jsx)("p", {
                                            className: "font-medium",
                                            children: connection.name,
                                          }),
                                          connection.title &&
                                            connection.company &&
                                            (0, jsx_runtime_1.jsxs)("p", {
                                              className:
                                                "text-sm text-muted-foreground",
                                              children: [
                                                connection.title,
                                                " at ",
                                                connection.company,
                                              ],
                                            }),
                                          connection.email &&
                                            (0, jsx_runtime_1.jsx)("p", {
                                              className:
                                                "text-sm text-muted-foreground",
                                              children: connection.email,
                                            }),
                                        ],
                                      }),
                                    ],
                                  },
                                  connection.id,
                                );
                              }),
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex flex-col gap-4",
                              children: [
                                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                  value: selectedCampaign,
                                  onValueChange: setSelectedCampaign,
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      select_1.SelectTrigger,
                                      {
                                        children: (0, jsx_runtime_1.jsx)(
                                          select_1.SelectValue,
                                          { placeholder: "Select a campaign" },
                                        ),
                                      },
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                      select_1.SelectContent,
                                      {
                                        children: campaigns.map(
                                          function (campaign) {
                                            return (0, jsx_runtime_1.jsx)(
                                              select_1.SelectItem,
                                              {
                                                value: campaign.id,
                                                children: campaign.name,
                                              },
                                              campaign.id,
                                            );
                                          },
                                        ),
                                      },
                                    ),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  onClick: handleImport,
                                  disabled:
                                    isImporting ||
                                    selectedConnections.length === 0 ||
                                    !selectedCampaign,
                                  children: isImporting
                                    ? (0, jsx_runtime_1.jsxs)(
                                        jsx_runtime_1.Fragment,
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.Loader2,
                                              {
                                                className:
                                                  "mr-2 h-4 w-4 animate-spin",
                                              },
                                            ),
                                            "Importing...",
                                          ],
                                        },
                                      )
                                    : (0, jsx_runtime_1.jsxs)(
                                        jsx_runtime_1.Fragment,
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.UserPlus,
                                              { className: "mr-2 h-4 w-4" },
                                            ),
                                            "Import Selected Connections",
                                          ],
                                        },
                                      ),
                                }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
        }),
      ],
    }),
  });
};
exports.LinkedInIntegration = LinkedInIntegration;
