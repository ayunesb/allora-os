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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompanyAPI = exports.CompanyAPIProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var CompanyAPIContext = (0, react_1.createContext)(undefined);
var CompanyAPIProvider = function (_a) {
  var children = _a.children;
  var _b = (0, react_1.useState)(function () {
      var savedKeys = localStorage.getItem("company_api_keys");
      return savedKeys ? JSON.parse(savedKeys) : {};
    }),
    apiKeys = _b[0],
    setApiKeys = _b[1];
  var setApiKey = function (service, key) {
    var _a;
    var newKeys = __assign(
      __assign({}, apiKeys),
      ((_a = {}), (_a[service] = key), _a),
    );
    setApiKeys(newKeys);
    localStorage.setItem("company_api_keys", JSON.stringify(newKeys));
  };
  var clearApiKey = function (service) {
    var newKeys = __assign({}, apiKeys);
    delete newKeys[service];
    setApiKeys(newKeys);
    localStorage.setItem("company_api_keys", JSON.stringify(newKeys));
  };
  var hasApiKey = function (service) {
    return !!apiKeys[service];
  };
  return (0, jsx_runtime_1.jsx)(CompanyAPIContext.Provider, {
    value: {
      apiKeys: apiKeys,
      setApiKey: setApiKey,
      clearApiKey: clearApiKey,
      hasApiKey: hasApiKey,
    },
    children: children,
  });
};
exports.CompanyAPIProvider = CompanyAPIProvider;
var useCompanyAPI = function () {
  var context = (0, react_1.useContext)(CompanyAPIContext);
  if (context === undefined) {
    throw new Error("useCompanyAPI must be used within a CompanyAPIProvider");
  }
  return context;
};
exports.useCompanyAPI = useCompanyAPI;
