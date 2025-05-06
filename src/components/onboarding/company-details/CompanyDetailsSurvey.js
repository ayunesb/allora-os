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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CompanyDetailsSurvey;
exports.CompanyDetailsSurvey = CompanyDetailsSurvey;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var accordion_1 = require("@/components/ui/accordion");
var Sections = require("./sections");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function CompanyDetailsSurvey(_a) {
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails,
    error = _a.error,
    onNext = _a.onNext;
  // State to control the open accordion items
  var _b = (0, react_1.useState)(["fundamentals"]),
    openSections = _b[0],
    setOpenSections = _b[1];
  // Generic handler for updating string fields
  var handleTextChange = function (field, value) {
    var _a;
    updateCompanyDetails(
      __assign(
        __assign({}, companyDetails),
        ((_a = {}), (_a[field] = value), _a),
      ),
    );
  };
  // Function to handle array updates
  var _c = (0, react_1.useState)({}),
    newItem = _c[0],
    setNewItem = _c[1];
  var addToArray = function (field) {
    var _a, _b;
    if (!newItem[field] || newItem[field].trim() === "") return;
    var currentArray = companyDetails[field] || [];
    updateCompanyDetails(
      __assign(
        __assign({}, companyDetails),
        ((_a = {}),
        (_a[field] = __spreadArray(
          __spreadArray([], currentArray, true),
          [newItem[field]],
          false,
        )),
        _a),
      ),
    );
    // Clear the input
    setNewItem(
      __assign(__assign({}, newItem), ((_b = {}), (_b[field] = ""), _b)),
    );
  };
  var removeFromArray = function (field, index) {
    var _a;
    var currentArray = companyDetails[field] || [];
    var newArray = __spreadArray([], currentArray, true);
    newArray.splice(index, 1);
    updateCompanyDetails(
      __assign(
        __assign({}, companyDetails),
        ((_a = {}), (_a[field] = newArray), _a),
      ),
    );
  };
  var handleNumberChange = function (field, value) {
    var _a;
    var numValue = value === "" ? undefined : parseInt(value, 10);
    if (!isNaN(numValue) || value === "") {
      updateCompanyDetails(
        __assign(
          __assign({}, companyDetails),
          ((_a = {}), (_a[field] = numValue), _a),
        ),
      );
    }
  };
  var handleSaveAndContinue = function () {
    if (onNext) {
      onNext();
    }
  };
  // Array with the order of sections
  var sectionOrder = [
    "fundamentals",
    "market",
    "growth",
    "product",
    "team",
    "marketing",
    "ai",
    "financial",
    "goals",
    "special",
  ];
  // Function to navigate to the next section
  var navigateToNextSection = function (section) {
    if (!section) return;
    var currentIndex = sectionOrder.indexOf(section);
    if (currentIndex < sectionOrder.length - 1) {
      var nextSection_1 = sectionOrder[currentIndex + 1];
      setOpenSections([nextSection_1]);
      // Scroll to the next section
      setTimeout(function () {
        var element = document.querySelector(
          '[data-value="'.concat(nextSection_1, '"]'),
        );
        element === null || element === void 0
          ? void 0
          : element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      // If we're at the last section, call the onNext prop
      if (onNext) {
        onNext();
      }
    }
  };
  // Common props for all section components
  var sectionProps = {
    companyDetails: companyDetails,
    updateCompanyDetails: updateCompanyDetails,
    newItem: newItem,
    setNewItem: setNewItem,
    addToArray: addToArray,
    removeFromArray: removeFromArray,
    handleTextChange: handleTextChange,
    handleNumberChange: handleNumberChange,
    onNext: navigateToNextSection,
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-lg font-medium",
        children: "Company Details Survey",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-sm text-muted-foreground mb-4",
        children:
          "Fill in the details below to help our AI better understand your business. The more information you provide, the more tailored our insights will be.",
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.Accordion, {
        type: "multiple",
        className: "w-full",
        value: openSections,
        onValueChange: setOpenSections,
        children: [
          (0, jsx_runtime_1.jsx)(
            Sections.CompanyFundamentals,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.MarketAnalysis,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.GrowthTraction,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.ProductTechnology,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.TeamLeadership,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.MarketingSales,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.AiReadiness,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.FinancialOverview,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.StrategicGoals,
            __assign({}, sectionProps),
          ),
          (0, jsx_runtime_1.jsx)(
            Sections.SpecialInfo,
            __assign({}, sectionProps),
          ),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mt-6",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "text-sm text-muted-foreground italic",
            children: (0, jsx_runtime_1.jsx)("p", {
              children:
                "* You can continue with basic information only and update these details later.",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: handleSaveAndContinue,
            className: "gap-2",
            children: [
              "Save & Continue",
              (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                className: "h-4 w-4",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
