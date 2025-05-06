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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLeads = useLeads;
var react_1 = require("react");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
var useDebounce_1 = require("@/hooks/useDebounce");
function useLeads() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    leads = _a[0],
    setLeads = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(false),
    isAddingLead = _c[0],
    setIsAddingLead = _c[1];
  var _d = (0, react_1.useState)(null),
    error = _d[0],
    setError = _d[1];
  var _e = (0, react_1.useState)(""),
    searchQuery = _e[0],
    setSearchQuery = _e[1];
  var _f = (0, react_1.useState)("created_at"),
    sortBy = _f[0],
    setSortBy = _f[1];
  var _g = (0, react_1.useState)("desc"),
    sortOrder = _g[0],
    setSortOrder = _g[1];
  var debouncedSearchQuery = (0, useDebounce_1.useDebounce)(searchQuery, 500);
  var toggleSort = function (column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  var refetchLeads = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error_1, typedData, err_1;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              setIsLoading(true);
              setError(null);
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("leads")
                  .select("*")
                  .ilike("name", "%".concat(debouncedSearchQuery, "%"))
                  .order(sortBy, { ascending: sortOrder === "asc" }),
              ];
            case 2:
              (_a = _b.sent()), (data = _a.data), (error_1 = _a.error);
              if (error_1) {
                setError(error_1);
                sonner_1.toast.error(
                  "Error fetching leads: ".concat(error_1.message),
                );
              } else {
                typedData = data
                  ? data.map(function (item) {
                      return __assign({}, item);
                    })
                  : [];
                setLeads(typedData);
              }
              return [3 /*break*/, 5];
            case 3:
              err_1 = _b.sent();
              setError(err_1);
              sonner_1.toast.error(
                "Unexpected error fetching leads: ".concat(err_1.message),
              );
              return [3 /*break*/, 5];
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [debouncedSearchQuery, sortBy, sortOrder],
  );
  (0, react_1.useEffect)(
    function () {
      refetchLeads();
    },
    [refetchLeads],
  );
  var addLead = function (leadData) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, newLead, error_3, error_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setIsAddingLead(true);
            setError(null);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            if (!leadData.name || !leadData.email || !leadData.campaign_id) {
              throw new Error(
                "Name, email, and campaign are required to create a lead.",
              );
            }
            return [
              4 /*yield*/,
              client_1.supabase
                .from("leads")
                .insert([
                  {
                    name: leadData.name,
                    email: leadData.email,
                    phone: leadData.phone,
                    status: leadData.status || "new",
                    campaign_id: leadData.campaign_id,
                  },
                ])
                .select()
                .single(),
            ];
          case 2:
            (_a = _b.sent()), (newLead = _a.data), (error_3 = _a.error);
            if (error_3) {
              setError(error_3);
              sonner_1.toast.error(
                "Failed to create lead: ".concat(error_3.message),
              );
              return [2 /*return*/, null];
            }
            sonner_1.toast.success("Lead created successfully");
            refetchLeads();
            return [2 /*return*/, newLead];
          case 3:
            error_2 = _b.sent();
            setError(error_2);
            sonner_1.toast.error(
              "Failed to create lead: ".concat(error_2.message),
            );
            return [2 /*return*/, null];
          case 4:
            setIsAddingLead(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleStatusUpdate = function (leadId, newStatus) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_5, error_4;
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
            error_5 = _a.sent().error;
            if (error_5) {
              sonner_1.toast.error(
                "Failed to update status: ".concat(error_5.message),
              );
              return [2 /*return*/, false];
            }
            refetchLeads();
            sonner_1.toast.success("Lead status updated successfully");
            return [2 /*return*/, true];
          case 2:
            error_4 = _a.sent();
            sonner_1.toast.error(
              "Failed to update lead status: ".concat(error_4.message),
            );
            return [2 /*return*/, false];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleDelete = function (leadId) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_7, error_6;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              client_1.supabase.from("leads").delete().eq("id", leadId),
            ];
          case 1:
            error_7 = _a.sent().error;
            if (error_7) {
              sonner_1.toast.error(
                "Failed to delete lead: ".concat(error_7.message),
              );
              return [2 /*return*/, false];
            }
            refetchLeads();
            sonner_1.toast.success("Lead deleted successfully");
            return [2 /*return*/, true];
          case 2:
            error_6 = _a.sent();
            sonner_1.toast.error(
              "Failed to delete lead: ".concat(error_6.message),
            );
            return [2 /*return*/, false];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return {
    leads: leads,
    isLoading: isLoading,
    isAddingLead: isAddingLead,
    error: error,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    sortBy: sortBy,
    sortOrder: sortOrder,
    toggleSort: toggleSort,
    handleStatusUpdate: handleStatusUpdate,
    handleDelete: handleDelete,
    addLead: addLead,
    refetchLeads: refetchLeads,
  };
}
