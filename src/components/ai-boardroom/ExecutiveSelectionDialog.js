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
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var scroll_area_1 = require("@/components/ui/scroll-area");
var lucide_react_1 = require("lucide-react");
var avatar_1 = require("@/components/ui/avatar");
var executiveBots_1 = require("@/backend/executiveBots");
var consultation_1 = require("@/utils/consultation");
var ExecutiveSelectionDialog = function (_a) {
  var isOpen = _a.isOpen,
    onClose = _a.onClose,
    selectedExecutives = _a.selectedExecutives,
    onExecutivesChange = _a.onExecutivesChange;
  var _b = (0, react_1.useState)(""),
    searchQuery = _b[0],
    setSearchQuery = _b[1];
  var _c = (0, react_1.useState)([]),
    filteredExecutives = _c[0],
    setFilteredExecutives = _c[1];
  var _d = (0, react_1.useState)([]),
    selectedIds = _d[0],
    setSelectedIds = _d[1];
  var _e = (0, react_1.useState)([]),
    allExecutives = _e[0],
    setAllExecutives = _e[1];
  // Initialize all available executives
  (0, react_1.useEffect)(function () {
    var executives = [];
    Object.entries(executiveBots_1.executiveBots).forEach(
      function (_a, roleIndex) {
        var role = _a[0],
          names = _a[1];
        names.forEach(function (name, nameIndex) {
          executives.push({
            id: "exec-".concat(roleIndex, "-").concat(nameIndex),
            name: name,
            role: role,
            title: (0, consultation_1.formatRoleTitle)(role),
            specialty: getExecutiveSpecialty(role),
            avatar: "/avatars/".concat(
              name.toLowerCase().replace(/\s+/g, "-"),
              ".png",
            ),
          });
        });
      },
    );
    setAllExecutives(executives);
  }, []);
  // Set filtered executives and selected IDs when dialog opens
  (0, react_1.useEffect)(
    function () {
      if (isOpen) {
        setFilteredExecutives(allExecutives);
        setSelectedIds(
          selectedExecutives.map(function (exec) {
            return exec.id;
          }),
        );
        setSearchQuery("");
      }
    },
    [isOpen, allExecutives, selectedExecutives],
  );
  // Filter executives by search query
  (0, react_1.useEffect)(
    function () {
      if (!searchQuery.trim()) {
        setFilteredExecutives(allExecutives);
        return;
      }
      var query = searchQuery.toLowerCase();
      var filtered = allExecutives.filter(function (exec) {
        return (
          exec.name.toLowerCase().includes(query) ||
          exec.title.toLowerCase().includes(query) ||
          exec.specialty.toLowerCase().includes(query)
        );
      });
      setFilteredExecutives(filtered);
    },
    [searchQuery, allExecutives],
  );
  var handleSearchChange = function (e) {
    setSearchQuery(e.target.value);
  };
  var toggleExecutive = function (execId) {
    setSelectedIds(function (prev) {
      // If already selected and we have more than the minimum required, remove
      if (prev.includes(execId) && prev.length > 3) {
        return prev.filter(function (id) {
          return id !== execId;
        });
      }
      // If not selected and we don't have the maximum allowed, add
      else if (!prev.includes(execId) && prev.length < 5) {
        return __spreadArray(__spreadArray([], prev, true), [execId], false);
      }
      return prev;
    });
  };
  var handleSave = function () {
    var selected = allExecutives.filter(function (exec) {
      return selectedIds.includes(exec.id);
    });
    onExecutivesChange(selected);
    onClose();
  };
  var getExecutiveSpecialty = function (role) {
    switch (role) {
      case "ceo":
        return "Strategic Vision, Innovation, Leadership";
      case "cfo":
        return "Financial Analysis, Risk Management, Investment Strategy";
      case "coo":
        return "Operations, Process Optimization, Execution";
      case "cmo":
        return "Marketing Strategy, Brand Development, Customer Insights";
      case "strategy":
        return "Competitive Analysis, Market Positioning, Growth Strategy";
      default:
        return "Business Strategy, Leadership, Innovation";
    }
  };
  var getExecutivePersonality = function (name) {
    // Mock personalities for well-known executives
    var personalities = {
      "Elon Musk": "Bold, innovative, risk-taking",
      "Jeff Bezos": "Customer-obsessed, detail-oriented, long-term thinking",
      "Satya Nadella": "Collaborative, growth mindset, transformational",
      "Tim Cook":
        "Operational excellence, privacy-focused, incremental improvement",
      "Warren Buffett": "Value-oriented, risk-averse, long-term investor",
      "Sheryl Sandberg":
        "People-focused, operational excellence, scaling expertise",
      "Ruth Porat": "Financial discipline, strategic investment, analytical",
    };
    return personalities[name] || "Strategic, analytical, business-focused";
  };
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "bg-gray-950 border-gray-800 text-white max-w-2xl",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, {
              className: "flex items-center gap-2 text-xl",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                  className: "h-5 w-5 text-purple-500",
                }),
                "Select Your Executive Team",
              ],
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              className: "text-gray-400",
              children:
                "Choose 3-5 executives to participate in your boardroom debate.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "relative my-2",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
              className: "absolute left-2.5 top-2.5 h-4 w-4 text-gray-500",
            }),
            (0, jsx_runtime_1.jsx)(input_1.Input, {
              placeholder: "Search executives...",
              value: searchQuery,
              onChange: handleSearchChange,
              className: "pl-8 bg-gray-900 border-gray-800 text-white",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, {
          className: "h-[350px] pr-4",
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "grid grid-cols-1 gap-2",
            children: [
              filteredExecutives.map(function (exec) {
                var isSelected = selectedIds.includes(exec.id);
                return (0, jsx_runtime_1.jsxs)(
                  "div",
                  {
                    className:
                      "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ".concat(
                        isSelected
                          ? "bg-purple-950/50 border border-purple-800/50"
                          : "bg-gray-900 border border-gray-800 hover:bg-gray-800",
                      ),
                    onClick: function () {
                      return toggleExecutive(exec.id);
                    },
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "relative",
                        children: [
                          (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                            className: "h-14 w-14 border-2 border-gray-800",
                            children: [
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                                src: exec.avatar,
                                alt: exec.name,
                              }),
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                                className: "bg-purple-900 text-white",
                                children: exec.name
                                  .split(" ")
                                  .map(function (n) {
                                    return n[0];
                                  })
                                  .join(""),
                              }),
                            ],
                          }),
                          isSelected &&
                            (0, jsx_runtime_1.jsx)("div", {
                              className:
                                "absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-0.5",
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.Check,
                                { className: "h-3 w-3 text-white" },
                              ),
                            }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex-1",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "font-medium text-white",
                                children: exec.name,
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                className:
                                  "text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-300",
                                children: exec.title,
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-gray-400 mt-1",
                            children: exec.specialty,
                          }),
                          (0, jsx_runtime_1.jsxs)("p", {
                            className: "text-xs text-purple-400 mt-1",
                            children: [
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "font-medium",
                                children: "Personality:",
                              }),
                              " ",
                              getExecutivePersonality(exec.name),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  exec.id,
                );
              }),
              filteredExecutives.length === 0 &&
                (0, jsx_runtime_1.jsx)("div", {
                  className: "text-center py-8",
                  children: (0, jsx_runtime_1.jsx)("p", {
                    className: "text-gray-400",
                    children: "No executives found matching your search.",
                  }),
                }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
          className:
            "flex flex-col sm:flex-row gap-2 border-t border-gray-800 pt-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "sm:mr-auto text-gray-400 text-sm",
              children: [
                selectedIds.length,
                " of 5 executives selected (",
                Math.max(3 - selectedIds.length, 0),
                " minimum, ",
                5 - selectedIds.length,
                " remaining)",
              ],
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              className: "border-gray-700 text-gray-300 hover:bg-gray-800",
              onClick: onClose,
              children: "Cancel",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              className:
                "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
              onClick: handleSave,
              disabled: selectedIds.length < 3,
              children: "Confirm Team",
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = ExecutiveSelectionDialog;
