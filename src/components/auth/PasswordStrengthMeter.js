"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePasswordStrength = calculatePasswordStrength;
exports.default = PasswordStrengthMeter;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var passwordRequirements = [
  {
    id: "length",
    label: "At least 8 characters",
    validator: function (password) {
      return password.length >= 8;
    },
  },
  {
    id: "uppercase",
    label: "Contains uppercase letter",
    validator: function (password) {
      return /[A-Z]/.test(password);
    },
  },
  {
    id: "lowercase",
    label: "Contains lowercase letter",
    validator: function (password) {
      return /[a-z]/.test(password);
    },
  },
  {
    id: "number",
    label: "Contains number",
    validator: function (password) {
      return /[0-9]/.test(password);
    },
  },
  {
    id: "special",
    label: "Contains special character",
    validator: function (password) {
      return /[^A-Za-z0-9]/.test(password);
    },
  },
];
function calculatePasswordStrength(password) {
  if (!password) return 0;
  var fulfilledRequirements = passwordRequirements.filter(function (req) {
    return req.validator(password);
  }).length;
  return Math.min(
    100,
    (fulfilledRequirements / passwordRequirements.length) * 100,
  );
}
function PasswordStrengthMeter(_a) {
  var password = _a.password;
  var strength = calculatePasswordStrength(password);
  var getStrengthLabel = function (strength) {
    if (strength <= 0) return "";
    if (strength < 40) return "Weak";
    if (strength < 80) return "Medium";
    return "Strong";
  };
  var getStrengthColor = function (strength) {
    if (strength <= 0) return "bg-transparent";
    if (strength < 40) return "bg-red-500";
    if (strength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-3",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "w-full h-2 bg-muted rounded overflow-hidden",
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "h-full transition-all duration-300 ".concat(
            getStrengthColor(strength),
          ),
          style: { width: "".concat(strength, "%") },
        }),
      }),
      password &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "text-xs font-medium",
          children: [
            "Password strength: ",
            (0, jsx_runtime_1.jsx)("span", {
              className: "font-semibold",
              children: getStrengthLabel(strength),
            }),
          ],
        }),
      password &&
        (0, jsx_runtime_1.jsx)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-xs",
          children: passwordRequirements.map(function (requirement) {
            var isFulfilled = requirement.validator(password);
            return (0, jsx_runtime_1.jsxs)(
              "div",
              {
                className: "flex items-center gap-1.5 ".concat(
                  isFulfilled ? "text-green-500" : "text-muted-foreground",
                ),
                children: [
                  isFulfilled
                    ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                        className: "h-3.5 w-3.5",
                      })
                    : (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                        className: "h-3.5 w-3.5",
                      }),
                  (0, jsx_runtime_1.jsx)("span", {
                    children: requirement.label,
                  }),
                ],
              },
              requirement.id,
            );
          }),
        }),
    ],
  });
}
