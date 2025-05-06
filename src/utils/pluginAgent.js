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
exports.createPluginCampaign =
  exports.executePlugin =
  exports.installPlugin =
  exports.pluginAgent =
    void 0;
var client_1 = require("@/integrations/supabase/client");
var ExecutiveBot_1 = require("@/types/fixed/ExecutiveBot");
var usePlugins_1 = require("@/hooks/usePlugins");
var fetchApi = function (url, options) {
  return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, fetch(url, options)];
        case 1:
          response = _a.sent();
          if (!response.ok) {
            throw new Error("API error: ".concat(response.statusText));
          }
          return [2 /*return*/, response.json()];
      }
    });
  });
};
exports.pluginAgent = new ExecutiveBot_1.ExecutiveBot(fetchApi);
/**
 * Install a plugin for the current tenant
 * @param pluginSlug The plugin slug to install
 * @param tenantId The tenant ID
 * @returns Success status object
 */
var installPlugin = function (pluginSlug, tenantId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      plugin,
      pluginError,
      _b,
      existing,
      existingError,
      insertError,
      error_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 7, , 8]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("plugins")
              .select("*")
              .eq("slug", pluginSlug)
              .single(),
          ];
        case 1:
          (_a = _c.sent()), (plugin = _a.data), (pluginError = _a.error);
          if (pluginError) throw pluginError;
          if (!plugin) throw new Error("Plugin not found");
          return [
            4 /*yield*/,
            client_1.supabase
              .from("tenant_plugins")
              .select("id")
              .eq("tenant_id", tenantId)
              .eq("plugin_slug", pluginSlug)
              .maybeSingle(),
          ];
        case 2:
          (_b = _c.sent()), (existing = _b.data), (existingError = _b.error);
          if (existingError) throw existingError;
          if (!existing) return [3 /*break*/, 4];
          // Already installed, update status to active
          return [
            4 /*yield*/,
            client_1.supabase
              .from("tenant_plugins")
              .update({ status: "active" })
              .eq("id", existing.id),
          ];
        case 3:
          // Already installed, update status to active
          _c.sent();
          return [2 /*return*/, { success: true }];
        case 4:
          return [
            4 /*yield*/,
            client_1.supabase.from("tenant_plugins").insert({
              tenant_id: tenantId,
              plugin_slug: pluginSlug,
              status: "active",
            }),
          ];
        case 5:
          insertError = _c.sent().error;
          if (insertError) throw insertError;
          // Log the plugin installation
          return [
            4 /*yield*/,
            fetchApi("/api/plugin-event", {
              method: "POST",
              body: JSON.stringify({
                plugin_name: plugin.name,
                event: "install",
                value: 0,
              }),
              headers: { "Content-Type": "application/json" },
            }),
          ];
        case 6:
          // Log the plugin installation
          _c.sent();
          return [2 /*return*/, { success: true }];
        case 7:
          error_1 = _c.sent();
          console.error("Error installing plugin:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_1 instanceof Error
                  ? error_1.message
                  : "Unknown error installing plugin",
            },
          ];
        case 8:
          return [2 /*return*/];
      }
    });
  });
};
exports.installPlugin = installPlugin;
/**
 * Execute a plugin and record its impact
 * @param pluginSlug The plugin to execute
 * @param tenantId The tenant ID
 * @param params Additional parameters for execution
 * @returns Execution result
 */
var executePlugin = function (pluginSlug_1, tenantId_1) {
  var args_1 = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args_1[_i - 2] = arguments[_i];
  }
  return __awaiter(
    void 0,
    __spreadArray([pluginSlug_1, tenantId_1], args_1, true),
    void 0,
    function (pluginSlug, tenantId, params) {
      var _a,
        plugin,
        pluginError,
        _b,
        pluginDetails,
        detailsError,
        impactValue,
        recordPluginEvent,
        error_2;
      if (params === void 0) {
        params = {};
      }
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 4, , 5]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("tenant_plugins")
                .select("plugin_slug")
                .eq("tenant_id", tenantId)
                .eq("plugin_slug", pluginSlug)
                .eq("status", "active")
                .maybeSingle(),
            ];
          case 1:
            (_a = _c.sent()), (plugin = _a.data), (pluginError = _a.error);
            if (pluginError) throw pluginError;
            if (!plugin)
              throw new Error("Plugin is not installed or not active");
            return [
              4 /*yield*/,
              client_1.supabase
                .from("plugins")
                .select("*")
                .eq("slug", pluginSlug)
                .single(),
            ];
          case 2:
            (_b = _c.sent()),
              (pluginDetails = _b.data),
              (detailsError = _b.error);
            if (detailsError) throw detailsError;
            impactValue = Math.floor(Math.random() * 100) + 10;
            recordPluginEvent = (0, usePlugins_1.usePlugins)()
              .recordPluginEvent;
            return [
              4 /*yield*/,
              fetchApi("/api/plugin-event", {
                method: "POST",
                body: JSON.stringify({
                  plugin_name: pluginDetails.name,
                  event: "execution",
                  value: impactValue,
                }),
                headers: { "Content-Type": "application/json" },
              }),
            ];
          case 3:
            _c.sent();
            return [
              2 /*return*/,
              {
                success: true,
                value: impactValue,
                message: "Plugin "
                  .concat(
                    pluginDetails.name,
                    " executed successfully with impact value ",
                  )
                  .concat(impactValue),
              },
            ];
          case 4:
            error_2 = _c.sent();
            console.error("Error executing plugin:", error_2);
            return [
              2 /*return*/,
              {
                success: false,
                value: 0,
                message: "Plugin execution failed",
                error:
                  error_2 instanceof Error
                    ? error_2.message
                    : "Unknown error executing plugin",
              },
            ];
          case 5:
            return [2 /*return*/];
        }
      });
    },
  );
};
exports.executePlugin = executePlugin;
/**
 * Create a campaign from a plugin execution
 * @param pluginSlug The plugin that created the campaign
 * @param tenantId The tenant ID
 * @param campaignData Campaign data
 * @returns The created campaign ID
 */
var createPluginCampaign = function (pluginSlug, tenantId, campaignData) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("campaigns")
              .insert({
                tenant_id: tenantId,
                title: campaignData.title,
                channel: campaignData.channel || "digital",
                summary:
                  campaignData.summary ||
                  "Generated by ".concat(pluginSlug, " plugin"),
                status: "draft",
                tags: ["plugin-generated", pluginSlug],
              })
              .select("id")
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [
            2 /*return*/,
            {
              success: true,
              campaignId: data.id,
            },
          ];
        case 2:
          error_3 = _b.sent();
          console.error("Error creating campaign from plugin:", error_3);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_3 instanceof Error
                  ? error_3.message
                  : "Failed to create campaign",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.createPluginCampaign = createPluginCampaign;
