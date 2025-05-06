"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlertMessage;
var jsx_runtime_1 = require("react/jsx-runtime");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
function AlertMessage(_a) {
  var _b = _a.title,
    title = _b === void 0 ? "Something went wrong" : _b,
    description = _a.description,
    _c = _a.variant,
    variant = _c === void 0 ? "destructive" : _c;
  return (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
    variant: variant,
    className: "mt-4",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
        className: "h-4 w-4",
      }),
      (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, { children: title }),
      (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
        children: description,
      }),
    ],
  });
}
