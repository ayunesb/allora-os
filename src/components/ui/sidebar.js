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
exports.SidebarMenuButton =
  exports.SidebarMenuItem =
  exports.SidebarMenu =
  exports.SidebarGroupContent =
  exports.SidebarGroupLabel =
  exports.SidebarGroup =
  exports.SidebarFooter =
  exports.SidebarContent =
  exports.SidebarHeader =
  exports.Sidebar =
    void 0;
exports.useSidebar = useSidebar;
exports.SidebarProvider = SidebarProvider;
exports.SidebarTrigger = SidebarTrigger;
exports.SidebarLink = SidebarLink;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var Sidebar = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "fixed inset-y-0 left-0 z-50 w-64 transition-all duration-300 ease-in-out transform border-r border-border bg-sidebar dark:bg-sidebar shadow-sm",
          className,
        ),
      },
      props,
    ),
  );
});
exports.Sidebar = Sidebar;
Sidebar.displayName = "Sidebar";
var SidebarHeader = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)("p-4 border-b border-border", className),
      },
      props,
    ),
  );
});
exports.SidebarHeader = SidebarHeader;
SidebarHeader.displayName = "SidebarHeader";
var SidebarContent = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)("flex-1 overflow-auto p-3", className),
      },
      props,
    ),
  );
});
exports.SidebarContent = SidebarContent;
SidebarContent.displayName = "SidebarContent";
var SidebarFooter = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "p-4 border-t border-border mt-auto",
          className,
        ),
      },
      props,
    ),
  );
});
exports.SidebarFooter = SidebarFooter;
SidebarFooter.displayName = "SidebarFooter";
var SidebarGroup = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      { ref: ref, className: (0, utils_1.cn)("mb-4 last:mb-0", className) },
      props,
    ),
  );
});
exports.SidebarGroup = SidebarGroup;
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "p",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "text-xs text-muted-foreground font-medium mb-2 px-2",
          className,
        ),
      },
      props,
    ),
  );
});
exports.SidebarGroupLabel = SidebarGroupLabel;
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupContent = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      { ref: ref, className: (0, utils_1.cn)("space-y-1", className) },
      props,
    ),
  );
});
exports.SidebarGroupContent = SidebarGroupContent;
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "ul",
    __assign(
      { ref: ref, className: (0, utils_1.cn)("space-y-1", className) },
      props,
    ),
  );
});
exports.SidebarMenu = SidebarMenu;
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "li",
    __assign({ ref: ref, className: (0, utils_1.cn)("", className) }, props),
  );
});
exports.SidebarMenuItem = SidebarMenuItem;
SidebarMenuItem.displayName = "SidebarMenuItem";
var SidebarMenuButton = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    active = _a.active,
    _b = _a.asChild,
    asChild = _b === void 0 ? false : _b,
    props = __rest(_a, ["className", "active", "asChild"]);
  var Comp = asChild ? React.Fragment : "div";
  return (0, jsx_runtime_1.jsx)(
    Comp,
    __assign(
      {},
      asChild ? {} : __assign({ ref: ref }, props),
      asChild
        ? {}
        : {
            className: (0, utils_1.cn)(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              className,
            ),
          },
      { children: props.children },
    ),
  );
});
exports.SidebarMenuButton = SidebarMenuButton;
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarContext = React.createContext(undefined);
function useSidebar() {
  var context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
function SidebarProvider(_a) {
  var children = _a.children,
    _b = _a.defaultExpanded,
    defaultExpanded = _b === void 0 ? true : _b;
  var _c = React.useState(defaultExpanded),
    expanded = _c[0],
    setExpanded = _c[1];
  return (0, jsx_runtime_1.jsx)(SidebarContext.Provider, {
    value: { expanded: expanded, setExpanded: setExpanded },
    children: children,
  });
}
function SidebarTrigger(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  var _b = useSidebar(),
    expanded = _b.expanded,
    setExpanded = _b.setExpanded;
  return (0, jsx_runtime_1.jsxs)(
    "button",
    __assign(
      {
        type: "button",
        onClick: function () {
          return setExpanded(!expanded);
        },
        className: (0, utils_1.cn)(
          "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          className,
        ),
      },
      props,
      {
        children: [
          (0, jsx_runtime_1.jsxs)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "h-5 w-5",
            children: [
              (0, jsx_runtime_1.jsx)("line", {
                x1: "3",
                y1: "12",
                x2: "21",
                y2: "12",
              }),
              (0, jsx_runtime_1.jsx)("line", {
                x1: "3",
                y1: "6",
                x2: "21",
                y2: "6",
              }),
              (0, jsx_runtime_1.jsx)("line", {
                x1: "3",
                y1: "18",
                x2: "21",
                y2: "18",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("span", {
            className: "sr-only",
            children: "Toggle sidebar",
          }),
        ],
      },
    ),
  );
}
var link_1 = require("next/link");
function SidebarLink() {
  return (0, jsx_runtime_1.jsxs)(link_1.default, {
    href: "/agents/performance",
    className:
      "flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "w-4 h-4" }),
      (0, jsx_runtime_1.jsx)("span", { children: "Agent Performance" }),
    ],
  });
}
