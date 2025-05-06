"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectorSidebar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var GlassPanel_1 = require("@/components/ui/GlassPanel");
var InspectorSidebar = function (_a) {
  var _b, _c;
  var data = _a.data,
    onClose = _a.onClose,
    onNodeHover = _a.onNodeHover;
  var navigate = (0, react_router_dom_1.useNavigate)();
  if (!data) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "w-full h-full p-4 bg-black/80 text-white overflow-y-auto",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "animate-pulse",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "h-6 bg-gray-700 rounded mb-4",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "h-4 bg-gray-700 rounded mb-2",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "h-4 bg-gray-700 rounded mb-2",
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("aside", {
    className:
      "fixed right-0 top-0 w-[400px] h-full bg-card border-l border-border z-50 shadow-xl",
    children: (0, jsx_runtime_1.jsxs)(GlassPanel_1.Panel, {
      className: "p-6 h-full overflow-y-auto",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center mb-4",
          children: [
            (0, jsx_runtime_1.jsx)("h2", {
              className: "text-xl font-semibold",
              children: data.name || "Inspector",
            }),
            (0, jsx_runtime_1.jsx)("button", {
              onClick: onClose,
              className: "text-muted hover:text-white",
              children: "\u2715",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("h2", {
          className: "text-lg font-semibold",
          children: data.name,
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-sm text-muted mt-1",
          children: data.description,
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "mt-4",
          children: [
            (0, jsx_runtime_1.jsx)("h3", {
              className: "text-sm uppercase tracking-wide text-muted",
              children: "Linked Strategies",
            }),
            (0, jsx_runtime_1.jsx)("ul", {
              className: "mt-2 space-y-1",
              children:
                (_b = data.strategies) === null || _b === void 0
                  ? void 0
                  : _b.map(function (strategy) {
                      return (0, jsx_runtime_1.jsxs)(
                        "li",
                        {
                          onClick: function () {
                            return navigate("/strategy/".concat(strategy.id));
                          },
                          onMouseEnter: function () {
                            return onNodeHover(strategy);
                          },
                          onMouseLeave: function () {
                            return onNodeHover(null);
                          },
                          className:
                            "cursor-pointer hover:text-primary transition",
                          children: ["\u21B3 ", strategy.title],
                        },
                        strategy.id,
                      );
                    }),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "mt-4",
          children: [
            (0, jsx_runtime_1.jsx)("h3", {
              className: "text-sm uppercase tracking-wide text-muted",
              children: "Linked Plugins",
            }),
            (0, jsx_runtime_1.jsx)("ul", {
              className: "mt-2 space-y-1",
              children:
                (_c = data.plugins) === null || _c === void 0
                  ? void 0
                  : _c.map(function (plugin) {
                      return (0, jsx_runtime_1.jsxs)(
                        "li",
                        {
                          onClick: function () {
                            return navigate("/plugin/".concat(plugin.id));
                          },
                          onMouseEnter: function () {
                            return onNodeHover(plugin);
                          },
                          onMouseLeave: function () {
                            return onNodeHover(null);
                          },
                          className:
                            "cursor-pointer hover:text-primary transition",
                          children: ["\u21B3 ", plugin.title],
                        },
                        plugin.id,
                      );
                    }),
            }),
          ],
        }),
      ],
    }),
  });
};
exports.InspectorSidebar = InspectorSidebar;
