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
exports.useLeadDrawer = useLeadDrawer;
var react_1 = require("react");
var sonner_1 = require("sonner");
var leadHelpers_1 = require("@/utils/leadHelpers");
function useLeadDrawer() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isOpen = _a[0],
    setIsOpen = _a[1];
  var _b = (0, react_1.useState)(null),
    activeLead = _b[0],
    setActiveLead = _b[1];
  var _c = (0, react_1.useState)(false),
    isEditing = _c[0],
    setIsEditing = _c[1];
  var _d = (0, react_1.useState)(false),
    isCreating = _d[0],
    setIsCreating = _d[1];
  var _e = (0, react_1.useState)(false),
    isLoading = _e[0],
    setIsLoading = _e[1];
  // Add aliases for compatibility with the existing code
  var selectedLead = activeLead;
  var isDrawerOpen = isOpen;
  var openDrawer = (0, react_1.useCallback)(function (lead) {
    if (lead) {
      setActiveLead(lead);
      setIsEditing(false);
      setIsCreating(false);
    } else {
      setActiveLead(null);
      setIsCreating(true);
      setIsEditing(false);
    }
    setIsOpen(true);
  }, []);
  var closeDrawer = (0, react_1.useCallback)(function () {
    setIsOpen(false);
    setTimeout(function () {
      setActiveLead(null);
      setIsEditing(false);
      setIsCreating(false);
    }, 300); // Delay to allow close animation
  }, []);
  // Add the handleViewLead function as an alias for openDrawer
  var handleViewLead = openDrawer;
  // Add the setIsDrawerOpen function as an alias for setIsOpen
  var setIsDrawerOpen = setIsOpen;
  var startEditing = (0, react_1.useCallback)(function () {
    setIsEditing(true);
  }, []);
  var cancelEditing = (0, react_1.useCallback)(function () {
    setIsEditing(false);
  }, []);
  var handleStatusChange = (0, react_1.useCallback)(
    function (leadId, newStatus) {
      return __awaiter(_this, void 0, void 0, function () {
        var success, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                (0, leadHelpers_1.updateLeadStatus)(leadId, newStatus),
              ];
            case 2:
              success = _a.sent();
              if (success) {
                sonner_1.toast.success("Lead status updated successfully");
                if (activeLead) {
                  setActiveLead(
                    __assign(__assign({}, activeLead), { status: newStatus }),
                  );
                }
                return [2 /*return*/, true];
              } else {
                sonner_1.toast.error("Failed to update lead status");
                return [2 /*return*/, false];
              }
              return [3 /*break*/, 5];
            case 3:
              error_1 = _a.sent();
              console.error("Error updating lead status:", error_1);
              sonner_1.toast.error("An unexpected error occurred");
              return [2 /*return*/, false];
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [activeLead],
  );
  var handleDeleteLead = (0, react_1.useCallback)(
    function (leadId) {
      return __awaiter(_this, void 0, void 0, function () {
        var success, error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [4 /*yield*/, (0, leadHelpers_1.deleteLead)(leadId)];
            case 2:
              success = _a.sent();
              if (success) {
                sonner_1.toast.success("Lead deleted successfully");
                closeDrawer();
                return [2 /*return*/, true];
              } else {
                sonner_1.toast.error("Failed to delete lead");
                return [2 /*return*/, false];
              }
              return [3 /*break*/, 5];
            case 3:
              error_2 = _a.sent();
              console.error("Error deleting lead:", error_2);
              sonner_1.toast.error("An unexpected error occurred");
              return [2 /*return*/, false];
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [closeDrawer],
  );
  var handleCreateLead = (0, react_1.useCallback)(
    function (leadData) {
      return __awaiter(_this, void 0, void 0, function () {
        var newLead, error_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [4 /*yield*/, (0, leadHelpers_1.createLead)(leadData)];
            case 2:
              newLead = _a.sent();
              if (newLead) {
                sonner_1.toast.success("Lead created successfully");
                closeDrawer();
                return [2 /*return*/, newLead];
              } else {
                sonner_1.toast.error("Failed to create lead");
                return [2 /*return*/, null];
              }
              return [3 /*break*/, 5];
            case 3:
              error_3 = _a.sent();
              console.error("Error creating lead:", error_3);
              sonner_1.toast.error("An unexpected error occurred");
              return [2 /*return*/, null];
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [closeDrawer],
  );
  return {
    isOpen: isOpen,
    activeLead: activeLead,
    isEditing: isEditing,
    isCreating: isCreating,
    isLoading: isLoading,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    startEditing: startEditing,
    cancelEditing: cancelEditing,
    handleStatusChange: handleStatusChange,
    handleDeleteLead: handleDeleteLead,
    handleCreateLead: handleCreateLead,
    // Add the new aliases to the return object
    selectedLead: selectedLead,
    isDrawerOpen: isDrawerOpen,
    handleViewLead: handleViewLead,
    setIsDrawerOpen: setIsDrawerOpen,
  };
}
