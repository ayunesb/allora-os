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
exports.default = AiExecutiveUpgrades;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_helmet_async_1 = require("react-helmet-async");
var tabs_1 = require("@/components/ui/tabs");
var UpgradeExecutiveBot_1 = require("@/components/ai-executives/UpgradeExecutiveBot");
var UpgradeAllExecutives_1 = require("@/components/ai-executives/UpgradeAllExecutives");
var executiveBots_1 = require("@/backend/executiveBots");
var botRoleUtils_1 = require("@/utils/consultation/botRoleUtils");
function AiExecutiveUpgrades() {
  var _a = (0, react_1.useState)("ceo"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)([]),
    upgradedBots = _b[0],
    setUpgradedBots = _b[1];
  var handleUpgradeComplete = function (upgradedBot) {
    setUpgradedBots(function (prev) {
      // Remove any existing entry for this bot
      var filtered = prev.filter(function (bot) {
        return bot.name !== upgradedBot.name;
      });
      // Add the new upgraded bot
      return __spreadArray(
        __spreadArray([], filtered, true),
        [upgradedBot],
        false,
      );
    });
  };
  var handleBulkUpgradeComplete = function (newUpgradedBots) {
    setUpgradedBots(function (prev) {
      // Create a map of existing bots for easy lookup
      var existingBots = new Map(
        prev.map(function (bot) {
          return [bot.name, bot];
        }),
      );
      // Merge with new bots, overwriting any existing entries
      for (
        var _i = 0, newUpgradedBots_1 = newUpgradedBots;
        _i < newUpgradedBots_1.length;
        _i++
      ) {
        var bot = newUpgradedBots_1[_i];
        existingBots.set(bot.name, bot);
      }
      return Array.from(existingBots.values());
    });
  };
  // Check if a bot is upgraded
  var isBotUpgraded = function (botName) {
    return upgradedBots.some(function (bot) {
      return bot.name === botName;
    });
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "AI Executive Upgrades - Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "container mx-auto px-4 py-6",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-col space-y-6",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h1", {
                  className: "text-2xl font-bold tracking-tight",
                  children: "AI Executive Upgrades",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground mt-1",
                  children:
                    "Upgrade your AI executives with the Allora Executive OS and personalized cognitive enhancements",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "md:col-span-2",
                  children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                    defaultValue: "ceo",
                    onValueChange: setActiveTab,
                    className: "w-full",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "flex justify-between items-center mb-4",
                        children: (0, jsx_runtime_1.jsx)(tabs_1.TabsList, {
                          children: Object.keys(
                            executiveBots_1.executiveBots,
                          ).map(function (role) {
                            return (0, jsx_runtime_1.jsx)(
                              tabs_1.TabsTrigger,
                              {
                                value: role,
                                className: "capitalize",
                                children: role,
                              },
                              role,
                            );
                          }),
                        }),
                      }),
                      Object.entries(executiveBots_1.executiveBots).map(
                        function (_a) {
                          var role = _a[0],
                            bots = _a[1];
                          return (0, jsx_runtime_1.jsx)(
                            tabs_1.TabsContent,
                            {
                              value: role,
                              className: "mt-0",
                              children: (0, jsx_runtime_1.jsx)("div", {
                                className:
                                  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: bots.map(function (botName) {
                                  return (0, jsx_runtime_1.jsx)(
                                    UpgradeExecutiveBot_1.UpgradeExecutiveBot,
                                    {
                                      botName: botName,
                                      botRole: (0,
                                      botRoleUtils_1.formatRoleTitle)(role),
                                      onUpgradeComplete: handleUpgradeComplete,
                                    },
                                    "".concat(role, "-").concat(botName),
                                  );
                                }),
                              }),
                            },
                            role,
                          );
                        },
                      ),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, jsx_runtime_1.jsx)(
                      UpgradeAllExecutives_1.UpgradeAllExecutives,
                      { onUpgradeComplete: handleBulkUpgradeComplete },
                    ),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "border border-border rounded-lg p-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-lg font-medium mb-2",
                          children: "Executive OS Features",
                        }),
                        (0, jsx_runtime_1.jsxs)("ul", {
                          className: "space-y-2 text-sm",
                          children: [
                            (0, jsx_runtime_1.jsxs)("li", {
                              className: "flex items-start gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0",
                                  children: "1",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children:
                                    "First Principles & OODA Loop Thinking Models",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("li", {
                              className: "flex items-start gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0",
                                  children: "2",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children:
                                    "Daily Decision Frameworks & Eisenhower Matrix",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("li", {
                              className: "flex items-start gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0",
                                  children: "3",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "5-Level Delegation System",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("li", {
                              className: "flex items-start gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0",
                                  children: "4",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children:
                                    "Crisis Management & Strategic Sprints",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("li", {
                              className: "flex items-start gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0",
                                  children: "5",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children:
                                    "Personalized Cognitive Boosts & Mental Models",
                                }),
                              ],
                            }),
                          ],
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
  });
}
