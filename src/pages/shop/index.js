"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShopAssistant;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function ShopAssistant() {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    query = _a[0],
    setQuery = _a[1];
  var _b = (0, react_1.useState)([]),
    results = _b[0],
    setResults = _b[1];
  var _c = (0, react_1.useState)(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = (0, react_1.useState)(false),
    searched = _d[0],
    setSearched = _d[1];
  var handleSearch = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (!query.trim()) return [2 /*return*/];
        setLoading(true);
        setSearched(true);
        // Placeholder mock — real version connects to AI product agent
        setTimeout(function () {
          setResults([
            {
              id: "1",
              title: "AI-Optimized Standing Desk",
              description:
                "Smart desk with posture detection and memory presets.",
              image_url: "https://placehold.co/300x200",
              link: "https://example.com/desk",
              price: "$499",
            },
            {
              id: "2",
              title: "Focus Headphones Pro",
              description:
                "Noise-cancelling with ambient mode and AI voice assistant.",
              image_url: "https://placehold.co/300x200",
              link: "https://example.com/headphones",
              price: "$299",
            },
            {
              id: "3",
              title: "Ergonomic Chair",
              description:
                "Designed for long hours with adaptive lumbar support and cooling mesh.",
              image_url: "https://placehold.co/300x200",
              link: "https://example.com/chair",
              price: "$349",
            },
          ]);
          setLoading(false);
        }, 800);
        return [2 /*return*/];
      });
    });
  };
  var handleKeyPress = function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container py-8",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-4",
        children: "\uD83D\uDECD AI Shopping Assistant",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-6",
        children:
          "Describe what you're looking for in natural language - our AI will find the best products for you.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex gap-2 max-w-xl mb-8",
        children: [
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            placeholder: "I need a desk for long hours and back support...",
            value: query,
            onChange: function (e) {
              return setQuery(e.target.value);
            },
            onKeyPress: handleKeyPress,
            className: "flex-1",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: handleSearch,
            disabled: loading,
            children: loading
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Searching...",
                  ],
                })
              : "Search",
          }),
        ],
      }),
      loading &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-col items-center py-12",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
              className: "h-8 w-8 animate-spin text-primary mb-4",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children: "Finding products that match your description...",
            }),
          ],
        }),
      !loading &&
        searched &&
        results.length === 0 &&
        (0, jsx_runtime_1.jsx)(card_1.Card, {
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "py-8 text-center",
            children: (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children:
                "No products found matching your description. Try a different search query.",
            }),
          }),
        }),
      !loading &&
        results.length > 0 &&
        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)("h2", {
              className: "text-xl font-medium mb-4",
              children: "Recommended Products",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
              children: results.map(function (product) {
                return (0, jsx_runtime_1.jsxs)(
                  "a",
                  {
                    href: product.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className:
                      "border rounded-xl overflow-hidden hover:shadow-md bg-white/5 transition-all",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "relative",
                        children: [
                          (0, jsx_runtime_1.jsx)("img", {
                            src: product.image_url,
                            alt: product.title,
                            className: "w-full h-48 object-cover",
                          }),
                          product.price &&
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded text-sm font-medium",
                              children: product.price,
                            }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "p-4",
                        children: [
                          (0, jsx_runtime_1.jsx)("h3", {
                            className: "font-semibold",
                            children: product.title,
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-muted-foreground mt-1",
                            children: product.description,
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "mt-3 flex justify-end",
                            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                              variant: "ghost",
                              size: "sm",
                              className: "text-xs",
                              children: "View Details",
                            }),
                          }),
                        ],
                      }),
                    ],
                  },
                  product.id,
                );
              }),
            }),
          ],
        }),
    ],
  });
}
