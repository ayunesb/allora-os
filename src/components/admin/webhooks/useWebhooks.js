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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebhooks = useWebhooks;
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
function useWebhooks() {
  var _this = this;
  var _a = (0, react_1.useState)(undefined),
    filter = _a[0],
    setFilter = _a[1];
  var queryClient = (0, react_query_1.useQueryClient)();
  // Fetch webhooks
  var _b = (0, react_query_1.useQuery)({
      queryKey: ["webhooks"],
      queryFn: function () {
        return __awaiter(_this, void 0, void 0, function () {
          var query, _a, data, error;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                query = client_1.supabase.from("webhooks").select("*");
                if (
                  filter === null || filter === void 0 ? void 0 : filter.type
                ) {
                  query = query.eq("type", filter.type);
                }
                if (
                  filter === null || filter === void 0 ? void 0 : filter.url
                ) {
                  query = query.ilike("url", "%".concat(filter.url, "%"));
                }
                if (
                  (filter === null || filter === void 0
                    ? void 0
                    : filter.active) !== undefined
                ) {
                  query = query.eq("active", filter.active);
                }
                return [4 /*yield*/, query];
              case 1:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) throw error;
                return [2 /*return*/, data];
            }
          });
        });
      },
    }),
    webhooks = _b.data,
    isLoading = _b.isLoading,
    error = _b.error;
  // Clear filter and refetch
  var clearFilterAndRefetch = (0, react_1.useCallback)(
    function () {
      setFilter(undefined);
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
    [queryClient],
  );
  // Track event
  var trackEvent = (0, react_1.useCallback)(
    function (eventType) {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
    [queryClient],
  );
  // Create webhook
  var createWebhookMutation = (0, react_query_1.useMutation)({
    mutationFn: function (webhook) {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("webhooks")
                  .insert([webhook])
                  .select()
                  .single(),
              ];
            case 1:
              (_a = _b.sent()), (data = _a.data), (error = _a.error);
              if (error) throw error;
              return [2 /*return*/, data];
          }
        });
      });
    },
    onSuccess: function () {
      sonner_1.toast.success("Webhook created successfully");
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
    onError: function (err) {
      sonner_1.toast.error("Failed to create webhook: ".concat(err.message));
    },
  });
  var createWebhook = function (data) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, createWebhookMutation.mutateAsync(data)];
      });
    });
  };
  // Update webhook
  var updateWebhookMutation = (0, react_query_1.useMutation)({
    mutationFn: function (webhook) {
      return __awaiter(_this, void 0, void 0, function () {
        var id, updates, _a, data, error;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              (id = webhook.id), (updates = __rest(webhook, ["id"]));
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("webhooks")
                  .update(updates)
                  .eq("id", id)
                  .select()
                  .single(),
              ];
            case 1:
              (_a = _b.sent()), (data = _a.data), (error = _a.error);
              if (error) throw error;
              return [2 /*return*/, data];
          }
        });
      });
    },
    onSuccess: function () {
      sonner_1.toast.success("Webhook updated successfully");
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
    onError: function (err) {
      sonner_1.toast.error("Failed to update webhook: ".concat(err.message));
    },
  });
  var updateWebhook = function (webhook) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, updateWebhookMutation.mutateAsync(webhook)];
      });
    });
  };
  // Delete webhook
  var deleteWebhookMutation = (0, react_query_1.useMutation)({
    mutationFn: function (id) {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("webhooks")
                  .delete()
                  .eq("id", id)
                  .select()
                  .single(),
              ];
            case 1:
              (_a = _b.sent()), (data = _a.data), (error = _a.error);
              if (error) throw error;
              return [2 /*return*/, data];
          }
        });
      });
    },
    onSuccess: function () {
      sonner_1.toast.success("Webhook deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
    onError: function (err) {
      sonner_1.toast.error("Failed to delete webhook: ".concat(err.message));
    },
  });
  var deleteWebhook = function (id) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, deleteWebhookMutation.mutateAsync(id)];
      });
    });
  };
  return {
    webhooks: webhooks,
    isLoading: isLoading,
    error: error,
    filter: filter,
    setFilter: setFilter,
    clearFilterAndRefetch: clearFilterAndRefetch,
    trackEvent: trackEvent,
    createWebhook: createWebhook,
    updateWebhook: updateWebhook,
    deleteWebhook: deleteWebhook,
    isCreating: createWebhookMutation.isPending,
    isUpdating: updateWebhookMutation.isPending,
    isDeleting: deleteWebhookMutation.isPending,
  };
}
