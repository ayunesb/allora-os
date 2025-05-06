"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PluginEvolutionPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var PluginEvolutionPanel_1 = require("@/components/plugins/PluginEvolutionPanel");
function PluginEvolutionPage(_a) {
  var params = _a.params;
  return (0, jsx_runtime_1.jsx)(PluginEvolutionPanel_1.PluginEvolutionPanel, {
    pluginId: params.id,
  });
}
