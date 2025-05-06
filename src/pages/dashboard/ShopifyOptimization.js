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
exports.default = ShopifyOptimization;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var ShopifyOptimizationDashboard_1 = require("@/components/shopify/ShopifyOptimizationDashboard");
var shopifyHelpers_1 = require("@/utils/shopifyHelpers");
function ShopifyOptimization() {
  var _this = this;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, react_1.useState)(""),
    storeId = _a[0],
    setStoreId = _a[1];
  var _b = (0, react_1.useState)(false),
    isConnected = _b[0],
    setIsConnected = _b[1];
  var _c = (0, react_1.useState)(false),
    isConnecting = _c[0],
    setIsConnecting = _c[1];
  var _d = (0, react_1.useState)(""),
    storeUrl = _d[0],
    setStoreUrl = _d[1];
  // For demo purposes, attempt to fetch products to see if already connected
  (0, react_1.useEffect)(function () {
    var checkConnection = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, (0, shopifyHelpers_1.listShopifyProducts)()];
            case 1:
              products = _a.sent();
              if (products && products.length > 0) {
                setIsConnected(true);
                // For demo purposes, just use the first product's vendor as the store ID
                setStoreId(products[0].vendor || "demo-store");
              }
              return [2 /*return*/];
          }
        });
      });
    };
    checkConnection();
  }, []);
  var handleConnect = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!storeUrl) {
              sonner_1.toast.error("Please enter your Shopify store URL");
              return [2 /*return*/];
            }
            setIsConnecting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call delay
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1500);
              }),
            ];
          case 2:
            // Simulate API call delay
            _a.sent();
            setIsConnected(true);
            setStoreId("demo-store");
            sonner_1.toast.success("Shopify store connected successfully");
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            sonner_1.toast.error("Failed to connect to Shopify store");
            return [3 /*break*/, 5];
          case 4:
            setIsConnecting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: function () {
              return navigate("/dashboard");
            },
            className: "mr-4",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
                className: "h-4 w-4 mr-1",
              }),
              "Back",
            ],
          }),
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold",
            children: "Shopify Store Optimization",
          }),
        ],
      }),
      !isConnected
        ? (0, jsx_runtime_1.jsxs)(card_1.Card, {
            className: "max-w-2xl mx-auto",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Store, {
                      className: "h-5 w-5 mr-2",
                    }),
                    "Connect Your Shopify Store",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "mb-6 text-gray-500",
                    children:
                      "Connect your Shopify store to get personalized optimization recommendations, automated improvements, and detailed analytics to help increase your sales.",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "store-url",
                            children: "Shopify Store URL",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center space-x-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(input_1.Input, {
                                id: "store-url",
                                placeholder: "yourstore.myshopify.com",
                                value: storeUrl,
                                onChange: function (e) {
                                  return setStoreUrl(e.target.value);
                                },
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                onClick: handleConnect,
                                disabled: isConnecting,
                                children: isConnecting
                                  ? (0, jsx_runtime_1.jsxs)(
                                      jsx_runtime_1.Fragment,
                                      {
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.RefreshCw,
                                            {
                                              className:
                                                "h-4 w-4 mr-2 animate-spin",
                                            },
                                          ),
                                          "Connecting...",
                                        ],
                                      },
                                    )
                                  : (0, jsx_runtime_1.jsxs)(
                                      jsx_runtime_1.Fragment,
                                      {
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.Link,
                                            { className: "h-4 w-4 mr-2" },
                                          ),
                                          "Connect",
                                        ],
                                      },
                                    ),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs text-gray-400",
                        children:
                          "By connecting your store, you'll grant us read and write access to optimize your store. You can revoke access at any time from your Shopify admin panel.",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        : (0, jsx_runtime_1.jsx)(ShopifyOptimizationDashboard_1.default, {
            storeId: storeId,
          }),
    ],
  });
}
(0, jsx_runtime_1.jsx)(button_1.Button, {
  variant: "outline",
  children: "Click Me",
});
(0, jsx_runtime_1.jsx)(label_1.Label, {
  htmlFor: "input-id",
  children: "Label Text",
});
