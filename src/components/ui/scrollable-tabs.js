"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScrollableTabs;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var scroll_area_1 = require("@/components/ui/scroll-area");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var HelpTooltip_1 = require("@/components/help/HelpTooltip");
function ScrollableTabs(_a) {
  var tabs = _a.tabs,
    activeTab = _a.activeTab,
    onTabChange = _a.onTabChange,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b,
    className = _a.className,
    _c = _a.variant,
    variant = _c === void 0 ? "default" : _c;
  var _d = (0, react_1.useState)(false),
    showLeftScroll = _d[0],
    setShowLeftScroll = _d[1];
  var _e = (0, react_1.useState)(false),
    showRightScroll = _e[0],
    setShowRightScroll = _e[1];
  var scrollRef = (0, react_1.useRef)(null);
  var _f = (0, react_1.useState)(false),
    isNarrow = _f[0],
    setIsNarrow = _f[1];
  // Check if we need to show scroll buttons
  (0, react_1.useEffect)(
    function () {
      var checkScroll = function () {
        if (scrollRef.current) {
          var _a = scrollRef.current,
            scrollLeft_1 = _a.scrollLeft,
            scrollWidth = _a.scrollWidth,
            clientWidth = _a.clientWidth;
          setShowLeftScroll(scrollLeft_1 > 0);
          setShowRightScroll(scrollLeft_1 < scrollWidth - clientWidth - 5);
        }
      };
      // Check if viewport is narrow
      var checkWidth = function () {
        setIsNarrow(window.innerWidth < 640);
      };
      checkScroll();
      checkWidth();
      var scrollElement = scrollRef.current;
      if (scrollElement) {
        scrollElement.addEventListener("scroll", checkScroll);
      }
      window.addEventListener("resize", function () {
        checkScroll();
        checkWidth();
      });
      return function () {
        if (scrollElement) {
          scrollElement.removeEventListener("scroll", checkScroll);
        }
        window.removeEventListener("resize", checkScroll);
        window.removeEventListener("resize", checkWidth);
      };
    },
    [tabs],
  );
  // Scroll handlers
  var scrollLeft = function () {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  var scrollRight = function () {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: (0, utils_1.cn)("relative", className),
    children: [
      showLeftScroll &&
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "ghost",
          size: "icon",
          className:
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm",
          onClick: scrollLeft,
          "aria-label": "Scroll left",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, {
            className: "h-4 w-4",
          }),
        }),
      (0, jsx_runtime_1.jsxs)(scroll_area_1.ScrollArea, {
        className: "w-full",
        scrollHideDelay: 100,
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            ref: scrollRef,
            className: (0, utils_1.cn)(
              "flex w-full overflow-x-auto scrollbar-none space-x-1 pb-1",
              variant === "pills" && "p-1 bg-muted/50 rounded-lg",
            ),
            children: tabs.map(function (tab) {
              var TabIcon = tab.icon;
              var labelToShow =
                isNarrow && tab.shortLabel ? tab.shortLabel : tab.label;
              var tabButton = (0, jsx_runtime_1.jsxs)(
                "button",
                {
                  onClick: function () {
                    return onTabChange(tab.id);
                  },
                  disabled: tab.disabled || isLoading,
                  className: (0, utils_1.cn)(
                    "flex items-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all",
                    variant === "default" && [
                      "border-b-2",
                      activeTab === tab.id
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    ],
                    variant === "outline" && [
                      "rounded-md border",
                      activeTab === tab.id
                        ? "border-primary/50 bg-primary/5 text-foreground"
                        : "border-transparent hover:border-border hover:bg-muted/50",
                    ],
                    variant === "pills" && [
                      "rounded-md",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    ],
                    tab.disabled && "opacity-50 cursor-not-allowed",
                  ),
                  children: [
                    TabIcon &&
                      (0, jsx_runtime_1.jsx)(TabIcon, {
                        className: "mr-2 h-4 w-4",
                      }),
                    labelToShow,
                  ],
                },
                tab.id,
              );
              return tab.tooltip
                ? (0, jsx_runtime_1.jsx)(
                    HelpTooltip_1.HelpTooltip,
                    { content: tab.tooltip, icon: false, children: tabButton },
                    tab.id,
                  )
                : tabButton;
            }),
          }),
          (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollBar, {
            orientation: "horizontal",
            className: "h-2",
          }),
        ],
      }),
      showRightScroll &&
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "ghost",
          size: "icon",
          className:
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm",
          onClick: scrollRight,
          "aria-label": "Scroll right",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {
            className: "h-4 w-4",
          }),
        }),
    ],
  });
}
