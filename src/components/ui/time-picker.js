"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimePicker = TimePicker;
var jsx_runtime_1 = require("react/jsx-runtime");
var select_1 = require("@/components/ui/select");
function TimePicker(_a) {
  var time = _a.time,
    setTime = _a.setTime,
    className = _a.className;
  var hours = Array.from({ length: 24 }, function (_, i) {
    return i.toString().padStart(2, "0");
  });
  var minutes = ["00", "15", "30", "45"];
  // Split the time into hours and minutes
  var _b = time.split(":") || ["12", "00"],
    selectedHour = _b[0],
    selectedMinute = _b[1];
  var handleHourChange = function (hour) {
    setTime("".concat(hour, ":").concat(selectedMinute));
  };
  var handleMinuteChange = function (minute) {
    setTime("".concat(selectedHour, ":").concat(minute));
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex space-x-2 ".concat(className),
    children: [
      (0, jsx_runtime_1.jsxs)(select_1.Select, {
        value: selectedHour,
        onValueChange: handleHourChange,
        children: [
          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
            className: "w-[5rem]",
            children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
              placeholder: "Hour",
            }),
          }),
          (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
            children: hours.map(function (hour) {
              return (0, jsx_runtime_1.jsx)(
                select_1.SelectItem,
                { value: hour, children: hour },
                hour,
              );
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("span", {
        className: "flex items-center",
        children: ":",
      }),
      (0, jsx_runtime_1.jsxs)(select_1.Select, {
        value: selectedMinute,
        onValueChange: handleMinuteChange,
        children: [
          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
            className: "w-[5rem]",
            children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
              placeholder: "Min",
            }),
          }),
          (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
            children: minutes.map(function (minute) {
              return (0, jsx_runtime_1.jsx)(
                select_1.SelectItem,
                { value: minute, children: minute },
                minute,
              );
            }),
          }),
        ],
      }),
    ],
  });
}
