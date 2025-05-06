"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthRedirect = exports.AuthRedirectProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AuthRedirectContext = (0, react_1.createContext)(undefined);
var AuthRedirectProvider = function (_a) {
  var children = _a.children;
  var _b = (0, react_1.useState)(null),
    redirectUrl = _b[0],
    setRedirectUrl = _b[1];
  var clearRedirectUrl = function () {
    setRedirectUrl(null);
  };
  return (0, jsx_runtime_1.jsx)(AuthRedirectContext.Provider, {
    value: {
      redirectUrl: redirectUrl,
      setRedirectUrl: setRedirectUrl,
      clearRedirectUrl: clearRedirectUrl,
    },
    children: children,
  });
};
exports.AuthRedirectProvider = AuthRedirectProvider;
var useAuthRedirect = function () {
  var context = (0, react_1.useContext)(AuthRedirectContext);
  if (context === undefined) {
    throw new Error(
      "useAuthRedirect must be used within an AuthRedirectProvider",
    );
  }
  return context;
};
exports.useAuthRedirect = useAuthRedirect;
