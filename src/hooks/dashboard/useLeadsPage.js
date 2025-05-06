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
exports.useLeadsPage = useLeadsPage;
var react_1 = require("react");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
var useDebounce_1 = require("@/hooks/useDebounce");
var AuthContext_1 = require("@/context/AuthContext");
var useAdvancedLeadScoring_1 = require("@/hooks/useAdvancedLeadScoring");
function useLeadsPage() {
  var _this = this;
  var _a = (0, AuthContext_1.useAuth)(),
    user = _a.user,
    profile = _a.profile;
  var _b = (0, react_1.useState)([]),
    leads = _b[0],
    setLeads = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var _d = (0, react_1.useState)(null),
    leadsError = _d[0],
    setLeadsError = _d[1];
  var _e = (0, react_1.useState)(""),
    searchQuery = _e[0],
    setSearchQuery = _e[1];
  var _f = (0, react_1.useState)("created_at"),
    sortBy = _f[0],
    setSortBy = _f[1];
  var _g = (0, react_1.useState)("desc"),
    sortOrder = _g[0],
    setSortOrder = _g[1];
  var _h = (0, react_1.useState)(null),
    activeFilter = _h[0],
    setActiveFilter = _h[1];
  var _j = (0, react_1.useState)([]),
    selectedLeads = _j[0],
    setSelectedLeads = _j[1];
  var _k = (0, react_1.useState)(null),
    selectedLead = _k[0],
    setSelectedLead = _k[1];
  var _l = (0, react_1.useState)(false),
    isDrawerOpen = _l[0],
    setIsDrawerOpen = _l[1];
  var _m = (0, react_1.useState)([]),
    formattedCampaigns = _m[0],
    setFormattedCampaigns = _m[1];
  var _o = (0, react_1.useTransition)(),
    isPending = _o[0],
    startTransition = _o[1];
  var debouncedSearchQuery = (0, useDebounce_1.useDebounce)(searchQuery, 500);
  var _p = (0, useAdvancedLeadScoring_1.useAdvancedLeadScoring)(),
    calculateAdvancedScore = _p.calculateAdvancedScore,
    getLeadScoreCategory = _p.getLeadScoreCategory,
    getNextBestAction = _p.getNextBestAction,
    getLeadPriority = _p.getLeadPriority;
  // Fetch leads
  var fetchLeads = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var response_1,
          connectionInfo,
          _a,
          data_1,
          error,
          _b,
          campaigns_1,
          campaignsError,
          error_1;
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              if (
                !(profile === null || profile === void 0
                  ? void 0
                  : profile.company_id)
              ) {
                setIsLoading(false);
                return [2 /*return*/];
              }
              setIsLoading(true);
              setLeadsError(null);
              _c.label = 1;
            case 1:
              _c.trys.push([1, 5, 6, 7]);
              return [
                4 /*yield*/,
                client_1.supabase.functions
                  .invoke("check-connection", {
                    body: { silent: true },
                  })
                  .catch(function () {
                    return {
                      data: {
                        connected: false,
                        error: new Error("Connection check failed"),
                      },
                    };
                  }),
              ];
            case 2:
              response_1 = _c.sent();
              connectionInfo = response_1.data || {
                connected: false,
                error: new Error("Invalid connection response"),
              };
              if (!connectionInfo.connected) {
                throw (
                  connectionInfo.error ||
                  new Error("Unable to connect to database")
                );
              }
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("leads")
                  .select("*, campaigns(name)")
                  .eq("campaigns.company_id", profile.company_id)
                  .order(sortBy, { ascending: sortOrder === "asc" }),
              ];
            case 3:
              (_a = _c.sent()), (data_1 = _a.data), (error = _a.error);
              if (error) throw error;
              startTransition(function () {
                setLeads(data_1 || []);
              });
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("campaigns")
                  .select("id, name")
                  .eq("company_id", profile.company_id),
              ];
            case 4:
              (_b = _c.sent()),
                (campaigns_1 = _b.data),
                (campaignsError = _b.error);
              if (campaignsError) {
                console.error("Error fetching campaigns:", campaignsError);
              } else if (campaigns_1) {
                startTransition(function () {
                  setFormattedCampaigns(
                    campaigns_1.map(function (c) {
                      return { value: c.id, label: c.name };
                    }),
                  );
                });
              }
              return [3 /*break*/, 7];
            case 5:
              error_1 = _c.sent();
              console.error("Error fetching leads:", error_1);
              setLeadsError(error_1);
              sonner_1.toast.error("Failed to load leads", {
                description: error_1.message || "Database connection error",
              });
              return [3 /*break*/, 7];
            case 6:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 7:
              return [2 /*return*/];
          }
        });
      });
    },
    [
      profile === null || profile === void 0 ? void 0 : profile.company_id,
      sortBy,
      sortOrder,
      startTransition,
    ],
  );
  (0, react_1.useEffect)(
    function () {
      // Wrap the effect body in startTransition to prevent suspension during updates
      startTransition(function () {
        fetchLeads();
      });
    },
    [fetchLeads],
  );
  var toggleSort = (0, react_1.useCallback)(
    function (column) {
      startTransition(function () {
        setSortBy(column);
        setSortOrder(function (prev) {
          return prev === "asc" ? "desc" : "asc";
        });
      });
    },
    [startTransition],
  );
  // Apply filters and search - moved inside a memoized function
  var getFilteredLeads = (0, react_1.useCallback)(
    function () {
      if (!leads) return [];
      return leads.filter(function (lead) {
        // Apply search filter
        var matchesSearch =
          !debouncedSearchQuery ||
          lead.name
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          (lead.email &&
            lead.email
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())) ||
          (lead.phone && lead.phone.includes(debouncedSearchQuery));
        // Apply campaign filter
        var matchesFilter = !activeFilter || lead.campaign_id === activeFilter;
        return matchesSearch && matchesFilter;
      });
    },
    [leads, debouncedSearchQuery, activeFilter],
  );
  // Compute filtered leads using the memoized function
  var filteredLeads = getFilteredLeads();
  // Lead selection
  var handleLeadSelect = (0, react_1.useCallback)(
    function (leadId, isSelected) {
      startTransition(function () {
        setSelectedLeads(function (prev) {
          if (isSelected) {
            return __spreadArray(
              __spreadArray([], prev, true),
              [leadId],
              false,
            );
          } else {
            return prev.filter(function (id) {
              return id !== leadId;
            });
          }
        });
      });
    },
    [startTransition],
  );
  var handleSelectAll = (0, react_1.useCallback)(
    function (isSelected) {
      startTransition(function () {
        if (isSelected) {
          setSelectedLeads(
            filteredLeads.map(function (lead) {
              return lead.id;
            }),
          );
        } else {
          setSelectedLeads([]);
        }
      });
    },
    [filteredLeads, startTransition],
  );
  // Bulk actions
  var handleBulkStatusUpdate = (0, react_1.useCallback)(
    function (newStatus) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (selectedLeads.length === 0) return [2 /*return*/];
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("leads")
                  .update({ status: newStatus })
                  .in("id", selectedLeads),
              ];
            case 2:
              error = _a.sent().error;
              if (error) throw error;
              sonner_1.toast.success(
                "Updated "
                  .concat(selectedLeads.length, " leads to ")
                  .concat(newStatus),
              );
              startTransition(function () {
                fetchLeads();
                setSelectedLeads([]);
              });
              return [2 /*return*/, true];
            case 3:
              error_2 = _a.sent();
              console.error("Error updating leads:", error_2);
              sonner_1.toast.error("Failed to update leads");
              return [2 /*return*/, false];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [selectedLeads, fetchLeads, startTransition],
  );
  // Lead detail view
  var handleViewLead = (0, react_1.useCallback)(
    function (lead) {
      startTransition(function () {
        setSelectedLead(lead);
        setIsDrawerOpen(true);
      });
    },
    [startTransition],
  );
  // Lead actions
  var handleLeadStatusUpdate = (0, react_1.useCallback)(
    function (leadId, newStatus) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, error_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("leads")
                  .update({ status: newStatus })
                  .eq("id", leadId),
              ];
            case 1:
              error = _a.sent().error;
              if (error) throw error;
              sonner_1.toast.success(
                "Lead status updated to ".concat(newStatus),
              );
              startTransition(function () {
                fetchLeads();
                // Update the selected lead if it's open
                if (selectedLead && selectedLead.id === leadId) {
                  setSelectedLead(function (prev) {
                    return prev
                      ? __assign(__assign({}, prev), { status: newStatus })
                      : null;
                  });
                }
              });
              return [2 /*return*/, true];
            case 2:
              error_3 = _a.sent();
              console.error("Error updating lead status:", error_3);
              sonner_1.toast.error("Failed to update lead status");
              return [2 /*return*/, false];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    },
    [fetchLeads, selectedLead, startTransition],
  );
  var handleLeadDelete = (0, react_1.useCallback)(
    function (leadId) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, error_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [
                4 /*yield*/,
                client_1.supabase.from("leads").delete().eq("id", leadId),
              ];
            case 1:
              error = _a.sent().error;
              if (error) throw error;
              sonner_1.toast.success("Lead deleted successfully");
              startTransition(function () {
                fetchLeads();
                // Close the drawer if the deleted lead was selected
                if (selectedLead && selectedLead.id === leadId) {
                  setIsDrawerOpen(false);
                  setSelectedLead(null);
                }
              });
              return [2 /*return*/, true];
            case 2:
              error_4 = _a.sent();
              console.error("Error deleting lead:", error_4);
              sonner_1.toast.error("Failed to delete lead");
              return [2 /*return*/, false];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    },
    [fetchLeads, selectedLead, startTransition],
  );
  return {
    leads: leads,
    isLoading: isLoading,
    leadsError: leadsError,
    searchQuery: searchQuery,
    sortBy: sortBy,
    sortOrder: sortOrder,
    activeFilter: activeFilter,
    filteredLeads: filteredLeads,
    selectedLeads: selectedLeads,
    selectedLead: selectedLead,
    isDrawerOpen: isDrawerOpen,
    formattedCampaigns: formattedCampaigns,
    isPending: isPending,
    setSearchQuery: setSearchQuery,
    toggleSort: toggleSort,
    setActiveFilter: setActiveFilter,
    handleLeadSelect: handleLeadSelect,
    handleSelectAll: handleSelectAll,
    handleBulkStatusUpdate: handleBulkStatusUpdate,
    handleViewLead: handleViewLead,
    setIsDrawerOpen: setIsDrawerOpen,
    handleLeadStatusUpdate: handleLeadStatusUpdate,
    handleLeadDelete: handleLeadDelete,
    refetchLeads: fetchLeads,
    getLeadScore: getLeadScoreCategory,
    getNextBestAction: getNextBestAction,
    getLeadPriority: getLeadPriority,
  };
}
