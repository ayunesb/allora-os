"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var JsonViewer = function (_a) {
  var data = _a.data,
    _b = _a.expandLevel,
    expandLevel = _b === void 0 ? 2 : _b;
  var formatJson = function (obj, level) {
    if (level === void 0) {
      level = 0;
    }
    if (obj === null)
      return (0, jsx_runtime_1.jsx)("span", {
        className: "text-gray-500",
        children: "null",
      });
    if (obj === undefined)
      return (0, jsx_runtime_1.jsx)("span", {
        className: "text-gray-500",
        children: "undefined",
      });
    if (typeof obj === "string")
      return (0, jsx_runtime_1.jsxs)("span", {
        className: "text-green-600",
        children: ['"', obj, '"'],
      });
    if (typeof obj === "number")
      return (0, jsx_runtime_1.jsx)("span", {
        className: "text-blue-600",
        children: obj,
      });
    if (typeof obj === "boolean")
      return (0, jsx_runtime_1.jsx)("span", {
        className: "text-orange-600",
        children: obj ? "true" : "false",
      });
    if (Array.isArray(obj)) {
      var isExpanded = level < expandLevel;
      if (!isExpanded) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "text-gray-500",
          children: "[...Array]",
        });
      }
      if (obj.length === 0) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "text-gray-500",
          children: "[]",
        });
      }
      return (0, jsx_runtime_1.jsxs)("div", {
        className: "ml-".concat(level > 0 ? "4" : "0"),
        children: [
          (0, jsx_runtime_1.jsx)("span", {
            className: "text-gray-700",
            children: "[",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "ml-4",
            children: obj.map(function (item, i) {
              return (0, jsx_runtime_1.jsx)(
                "div",
                {
                  className: "flex",
                  children: (0, jsx_runtime_1.jsxs)("span", {
                    children: [
                      formatJson(item, level + 1),
                      i < obj.length - 1 ? "," : "",
                    ],
                  }),
                },
                i,
              );
            }),
          }),
          (0, jsx_runtime_1.jsx)("span", {
            className: "text-gray-700",
            children: "]",
          }),
        ],
      });
    }
    if (typeof obj === "object") {
      var isExpanded = level < expandLevel;
      var keys_1 = Object.keys(obj);
      if (!isExpanded) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "text-gray-500",
          children: "...Object",
        });
      }
      if (keys_1.length === 0) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "text-gray-500",
          children: "{}",
        });
      }
      return (0, jsx_runtime_1.jsxs)("div", {
        className: "ml-".concat(level > 0 ? "4" : "0"),
        children: [
          (0, jsx_runtime_1.jsx)("span", {
            className: "text-gray-700",
            children: "{",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "ml-4",
            children: keys_1.map(function (key, i) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  className: "flex",
                  children: [
                    (0, jsx_runtime_1.jsxs)("span", {
                      className: "text-purple-600",
                      children: ['"', key, '"'],
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "mr-1",
                      children: ": ",
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      children: [
                        formatJson(obj[key], level + 1),
                        i < keys_1.length - 1 ? "," : "",
                      ],
                    }),
                  ],
                },
                key,
              );
            }),
          }),
          (0, jsx_runtime_1.jsx)("span", {
            className: "text-gray-700",
            children: "}",
          }),
        ],
      });
    }
    return (0, jsx_runtime_1.jsx)("span", { children: String(obj) });
  };
  try {
    return (0, jsx_runtime_1.jsx)("pre", {
      className: "text-xs font-mono whitespace-pre-wrap break-all",
      children: formatJson(data),
    });
  } catch (error) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "text-red-500 text-xs",
      children: [
        "Error formatting JSON: ",
        error instanceof Error ? error.message : String(error),
      ],
    });
  }
};
exports.default = JsonViewer;
