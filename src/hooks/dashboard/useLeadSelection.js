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
exports.useLeadSelection = useLeadSelection;
var react_1 = require("react");
function useLeadSelection() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    selectedLeads = _a[0],
    setSelectedLeads = _a[1];
  var _b = (0, react_1.useState)(false),
    isSelectAll = _b[0],
    setIsSelectAll = _b[1];
  var toggleSelectLead = (0, react_1.useCallback)(function (leadId) {
    setSelectedLeads(function (prev) {
      if (prev.includes(leadId)) {
        return prev.filter(function (id) {
          return id !== leadId;
        });
      } else {
        return __spreadArray(__spreadArray([], prev, true), [leadId], false);
      }
    });
  }, []);
  var selectAllLeads = (0, react_1.useCallback)(function (leads) {
    var allLeadIds = leads.map(function (lead) {
      return lead.id;
    });
    setSelectedLeads(allLeadIds);
    setIsSelectAll(true);
  }, []);
  var deselectAllLeads = (0, react_1.useCallback)(function () {
    setSelectedLeads([]);
    setIsSelectAll(false);
  }, []);
  var toggleSelectAll = (0, react_1.useCallback)(
    function (leads) {
      if (selectedLeads.length === leads.length) {
        deselectAllLeads();
      } else {
        selectAllLeads(leads);
      }
    },
    [selectedLeads, selectAllLeads, deselectAllLeads],
  );
  var isLeadSelected = (0, react_1.useCallback)(
    function (leadId) {
      return selectedLeads.includes(leadId);
    },
    [selectedLeads],
  );
  var getSelectedLeads = (0, react_1.useCallback)(
    function (allLeads) {
      return allLeads.filter(function (lead) {
        return selectedLeads.includes(lead.id);
      });
    },
    [selectedLeads],
  );
  // Add the missing handleLeadSelect function (adapter for toggleSelectLead)
  var handleLeadSelect = (0, react_1.useCallback)(
    function (leadId, isSelected) {
      if (isSelected && !selectedLeads.includes(leadId)) {
        setSelectedLeads(function (prev) {
          return __spreadArray(__spreadArray([], prev, true), [leadId], false);
        });
      } else if (!isSelected && selectedLeads.includes(leadId)) {
        setSelectedLeads(function (prev) {
          return prev.filter(function (id) {
            return id !== leadId;
          });
        });
      }
    },
    [selectedLeads],
  );
  // Add the missing handleSelectAll function (adapter for toggleSelectAll)
  var handleSelectAll = (0, react_1.useCallback)(
    function (leads, isSelected) {
      if (isSelected) {
        selectAllLeads(leads);
      } else {
        deselectAllLeads();
      }
    },
    [selectAllLeads, deselectAllLeads],
  );
  // Add the missing handleBulkStatusUpdate function
  var handleBulkStatusUpdate = (0, react_1.useCallback)(
    function (status) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          // This is a placeholder - in a real implementation, you would
          // update all selected leads to the new status via an API call
          console.log(
            "Updating "
              .concat(selectedLeads.length, " leads to status: ")
              .concat(status),
          );
          // Return true to indicate success (simplified for this example)
          return [2 /*return*/, true];
        });
      });
    },
    [selectedLeads],
  );
  var selectedCount = selectedLeads.length;
  return {
    selectedLeads: selectedLeads,
    selectedCount: selectedCount,
    isSelectAll: isSelectAll,
    toggleSelectLead: toggleSelectLead,
    selectAllLeads: selectAllLeads,
    deselectAllLeads: deselectAllLeads,
    toggleSelectAll: toggleSelectAll,
    isLeadSelected: isLeadSelected,
    getSelectedLeads: getSelectedLeads,
    // Add the new functions to the return object
    handleLeadSelect: handleLeadSelect,
    handleSelectAll: handleSelectAll,
    handleBulkStatusUpdate: handleBulkStatusUpdate,
  };
}
