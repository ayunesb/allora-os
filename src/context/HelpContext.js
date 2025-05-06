"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpProvider = HelpProvider;
exports.useHelp = useHelp;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var HelpContext = (0, react_1.createContext)(undefined);
function HelpProvider(_a) {
  var children = _a.children;
  var _b = (0, react_1.useState)(false),
    isHelpOpen = _b[0],
    setIsHelpOpen = _b[1];
  var _c = (0, react_1.useState)(null),
    currentHelp = _c[0],
    setCurrentHelp = _c[1];
  var openHelp = function () {
    return setIsHelpOpen(true);
  };
  var closeHelp = function () {
    return setIsHelpOpen(false);
  };
  return (0, jsx_runtime_1.jsx)(HelpContext.Provider, {
    value: {
      isHelpOpen: isHelpOpen,
      currentHelp: currentHelp,
      openHelp: openHelp,
      closeHelp: closeHelp,
      setCurrentHelp: setCurrentHelp,
    },
    children: children,
  });
}
function useHelp() {
  var context = (0, react_1.useContext)(HelpContext);
  if (context === undefined) {
    throw new Error("useHelp must be used within a HelpProvider");
  }
  return context;
}
