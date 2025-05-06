"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotsTabContent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var consultation_1 = require("@/utils/consultation");
var executiveBots_1 = require("@/backend/executiveBots");
var BotSearchAndFilter_1 = require("../BotSearchAndFilter");
var BotsList_1 = require("../BotsList");
var BotsTabContent = function (_a) {
  var onSelectBot = _a.onSelectBot,
    setActiveTab = _a.setActiveTab;
  var _b = (0, react_1.useState)(""),
    searchQuery = _b[0],
    setSearchQuery = _b[1];
  var _c = (0, react_1.useState)("all"),
    roleFilter = _c[0],
    setRoleFilter = _c[1];
  var allBots = Object.entries(executiveBots_1.executiveBots).flatMap(
    function (_a) {
      var role = _a[0],
        names = _a[1];
      return names.map(function (name) {
        return {
          name: name,
          role: role,
          title: (0, consultation_1.formatRoleTitle)(role),
          specialty: (0, consultation_1.getBotExpertise)(role),
          outputLocation: (0, consultation_1.getBotOutputLocation)(role),
          exampleAction: (0, consultation_1.getBotExampleAction)(role),
          avatar: "/avatars/".concat(
            name.toLowerCase().replace(/\s+/g, "-"),
            ".png",
          ),
        };
      });
    },
  );
  var filteredBots = allBots.filter(function (bot) {
    var matchesSearch =
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bot.outputLocation &&
        bot.outputLocation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (bot.exampleAction &&
        bot.exampleAction.toLowerCase().includes(searchQuery.toLowerCase()));
    var matchesRole = roleFilter === "all" || bot.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  var handleSelectBot = function (bot) {
    onSelectBot(bot);
    setActiveTab("chat");
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(BotSearchAndFilter_1.BotSearchAndFilter, {
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
        roleFilter: roleFilter,
        setRoleFilter: setRoleFilter,
      }),
      (0, jsx_runtime_1.jsx)(BotsList_1.BotsList, {
        filteredBots: filteredBots,
        onSelectBot: handleSelectBot,
      }),
    ],
  });
};
exports.BotsTabContent = BotsTabContent;
