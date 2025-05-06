"use strict";
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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
var PluginEvolutionPanel = function (_a) {
  var pluginId = _a.pluginId;
  var _b = (0, react_1.useState)([]),
    logs = _b[0],
    setLogs = _b[1];
  var _c = (0, react_1.useState)([]),
    evolutions = _c[0],
    setEvolutions = _c[1];
  (0, react_1.useEffect)(
    function () {
      var supabase = (0, auth_helpers_nextjs_1.createClientComponentClient)();
      var xpSub = supabase
        .channel("plugin-xp-sub")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "plugin_logs",
            filter: "plugin_name=eq.".concat(pluginId),
          },
          function (payload) {
            setLogs(function (prev) {
              return __spreadArray([payload.new], prev, true);
            });
          },
        )
        .subscribe();
      var evoSub = supabase
        .channel("plugin-evo-sub")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "agent_evolution_logs",
            filter: "triggered_by_plugin=eq.".concat(pluginId),
          },
          function (payload) {
            setEvolutions(function (prev) {
              return __spreadArray([payload.new], prev, true);
            });
          },
        )
        .subscribe();
      return function () {
        supabase.removeChannel(xpSub);
        supabase.removeChannel(evoSub);
      };
    },
    [pluginId],
  );
  return (0, jsx_runtime_1.jsx)("div", {});
};
exports.default = PluginEvolutionPanel;
