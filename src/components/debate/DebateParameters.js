"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var label_1 = require("@/components/ui/label");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var DebateParameters = function (_a) {
  var debateTitle = _a.debateTitle,
    debateObjective = _a.debateObjective,
    debateDuration = _a.debateDuration,
    onTitleChange = _a.onTitleChange,
    onObjectiveChange = _a.onObjectiveChange,
    onDurationChange = _a.onDurationChange;
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "title",
            children: "Debate Title",
          }),
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            id: "title",
            value: debateTitle,
            onChange: function (e) {
              return onTitleChange(e.target.value);
            },
            placeholder: "Enter a title for this debate",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "objective",
            children: "Debate Objective",
          }),
          (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
            id: "objective",
            value: debateObjective,
            onChange: function (e) {
              return onObjectiveChange(e.target.value);
            },
            placeholder: "What should this debate achieve?",
            rows: 3,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "duration",
            children: "Approximate Duration (minutes)",
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: debateDuration,
            onValueChange: onDurationChange,
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                id: "duration",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Select duration",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "5",
                    children: "5 minutes",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "10",
                    children: "10 minutes",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "15",
                    children: "15 minutes",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "30",
                    children: "30 minutes",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = DebateParameters;
