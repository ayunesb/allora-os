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
    availableExecutives = _d[0],
    setAvailableExecutives = _d[1];
  var _e = (0, react_1.useState)([]),
    selectedIds = _e[0],
    setSelectedIds = _e[1];
  // Initialize all available executives
  (0, react_1.useEffect)(function () {
    var executives = [];
    Object.entries(executiveBots_1.executiveBots).forEach(function (_a) {
      var role = _a[0],
        names = _a[1];
      names.forEach(function (name, index) {
        executives.push({
          id: "exec-".concat(role, "-").concat(index),
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
    });
    setAvailableExecutives(executives);
  }, []);
  // Set filtered executives and selected IDs when dialog opens
  (0, react_1.useEffect)(
    function () {
      if (isOpen) {
        setFilteredExecutives(availableExecutives);
        setSelectedIds(
          selectedExecutives.map(function (exec) {
            return exec.id;
          }),
        );
        setSearchQuery("");
      }
    },
    [isOpen, availableExecutives, selectedExecutives],
  );
  // Filter executives by search query
  (0, react_1.useEffect)(
    function () {
      if (!searchQuery.trim()) {
        setFilteredExecutives(availableExecutives);
        return;
      }
      var query = searchQuery.toLowerCase();
      var filtered = availableExecutives.filter(function (exec) {
        return (
          exec.name.toLowerCase().includes(query) ||
          exec.title.toLowerCase().includes(query) ||
          exec.specialty.toLowerCase().includes(query)
        );
      });
      setFilteredExecutives(filtered);
    },
    [searchQuery, availableExecutives],
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
    var selected = availableExecutives.filter(function (exec) {
      return selectedIds.includes(exec.id);
    });
    onExecutivesChange(selected);
    onClose();
  };
  var getExecutiveSpecialty = function (role) {
    switch (role) {
      case "ceo":
        return "Strategic Vision, Leadership, Innovation";
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
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "max-w-2xl",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                  className: "h-5 w-5",
                }),
                "Select Executive Team",
              ],
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              children:
                "Choose 3-5 executives to participate in your boardroom debate.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "relative my-2",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
              className:
                "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
            }),
            (0, jsx_runtime_1.jsx)(input_1.Input, {
              placeholder: "Search executives...",
              value: searchQuery,
              onChange: handleSearchChange,
              className: "pl-8",
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
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-card border hover:bg-accent/50",
                      ),
                    onClick: function () {
                      return toggleExecutive(exec.id);
                    },
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "relative",
                        children: [
                          (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                            className: "h-12 w-12",
                            children: [
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                                src: exec.avatar,
                                alt: exec.name,
                              }),
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
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
                                "absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5",
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
                                className: "font-medium",
                                children: exec.name,
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                className:
                                  "text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground",
                                children: exec.title,
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-muted-foreground mt-1",
                            children: exec.specialty,
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
                    className: "text-muted-foreground",
                    children: "No executives found matching your search.",
                  }),
                }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
          className: "flex flex-col sm:flex-row gap-2 pt-2",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "sm:mr-auto text-muted-foreground text-sm",
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
              onClick: onClose,
              children: "Cancel",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
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
