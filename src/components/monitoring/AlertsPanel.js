"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var AlertList_1 = require("./AlertList");
var CollapsedAlertButton_1 = require("./CollapsedAlertButton");
var monitoring_1 = require("@/utils/monitoring");
var AlertsPanel = function (_a) {
  var _b = _a.maxAlerts,
    maxAlerts = _b === void 0 ? 5 : _b,
    _c = _a.defaultExpanded,
    defaultExpanded = _c === void 0 ? true : _c,
    _d = _a.showOnlyUnacknowledged,
    showOnlyUnacknowledged = _d === void 0 ? false : _d,
    severityFilter = _a.severityFilter;
  var _e = (0, react_1.useState)([]),
    alerts = _e[0],
    setAlerts = _e[1];
  var _f = (0, react_1.useState)(defaultExpanded),
    expanded = _f[0],
    setExpanded = _f[1];
  var _g = (0, react_1.useState)(false),
    showAll = _g[0],
    setShowAll = _g[1];
  (0, react_1.useEffect)(
    function () {
      // Initial load of alerts
      var alertsToShow = monitoring_1.monitoring.getAlerts(severityFilter);
      setAlerts(
        showOnlyUnacknowledged
          ? alertsToShow.filter(function (a) {
              return !a.acknowledged;
            })
          : alertsToShow,
      );
      // Subscribe to alert updates
      var unsubscribe = monitoring_1.monitoring.addListener(
        function (newAlerts) {
          var filteredAlerts = severityFilter
            ? newAlerts.filter(function (a) {
                return a.severity === severityFilter;
              })
            : newAlerts;
          setAlerts(
            showOnlyUnacknowledged
              ? filteredAlerts.filter(function (a) {
                  return !a.acknowledged;
                })
              : filteredAlerts,
          );
        },
      );
      return unsubscribe;
    },
    [severityFilter, showOnlyUnacknowledged],
  );
  var handleAcknowledge = function (alertId) {
    monitoring_1.monitoring.acknowledgeAlert(alertId);
  };
  var clearAllAlerts = function () {
    monitoring_1.monitoring.clearAlerts();
  };
  var displayedAlerts = showAll ? alerts : alerts.slice(0, maxAlerts);
  if (alerts.length === 0) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "flex items-center",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, {
                  className: "mr-2 h-5 w-5 text-primary",
                }),
                "System Alerts",
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Real-time system notifications and alerts",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className:
            "flex flex-col items-center justify-center py-8 text-center text-muted-foreground",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
              className: "h-12 w-12 mb-4 text-green-500",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "mb-2",
              children: "No alerts at this time",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm",
              children: "The system is running smoothly",
            }),
          ],
        }),
      ],
    });
  }
  if (!expanded) {
    return (0, jsx_runtime_1.jsx)(CollapsedAlertButton_1.CollapsedAlertButton, {
      alerts: alerts,
      onClick: function () {
        return setExpanded(true);
      },
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldAlert, {
                    className: "mr-2 h-5 w-5 text-primary",
                  }),
                  "System Alerts",
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: clearAllAlerts,
                    children: "Clear All",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return setExpanded(false);
                    },
                    children: "Minimize",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
            children: [
              alerts.length,
              " active alert",
              alerts.length !== 1 ? "s" : "",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)(AlertList_1.AlertList, {
            alerts: displayedAlerts,
            onAcknowledge: handleAcknowledge,
          }),
          alerts.length > maxAlerts &&
            !showAll &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "mt-4 text-center",
              children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "link",
                onClick: function () {
                  return setShowAll(true);
                },
                children: ["Show ", alerts.length - maxAlerts, " more alerts"],
              }),
            }),
          showAll &&
            alerts.length > maxAlerts &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "mt-4 text-center",
              children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "link",
                onClick: function () {
                  return setShowAll(false);
                },
                children: "Show fewer alerts",
              }),
            }),
        ],
      }),
    ],
  });
};
exports.default = AlertsPanel;
