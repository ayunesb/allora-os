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
exports.default = CompanyInfoFields;
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("@/components/ui/input");
var form_1 = require("@/components/ui/form");
var select_1 = require("@/components/ui/select");
function CompanyInfoFields(_a) {
  var form = _a.form;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
    children: [
      (0, jsx_runtime_1.jsx)(form_1.FormField, {
        control: form.control,
        name: "company",
        render: function (_a) {
          var field = _a.field;
          return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
            children: [
              (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                children: "Company Name (Optional)",
              }),
              (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                children: (0, jsx_runtime_1.jsx)(
                  input_1.Input,
                  __assign({ placeholder: "Acme Inc." }, field),
                ),
              }),
              (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
            ],
          });
        },
      }),
      (0, jsx_runtime_1.jsx)(form_1.FormField, {
        control: form.control,
        name: "industry",
        render: function (_a) {
          var field = _a.field;
          return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
            children: [
              (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                children: "Industry (Optional)",
              }),
              (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                children: (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  onValueChange: field.onChange,
                  defaultValue: field.value,
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Select industry",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "technology",
                          children: "Technology",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "healthcare",
                          children: "Healthcare",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "finance",
                          children: "Finance",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "education",
                          children: "Education",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "retail",
                          children: "Retail",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "manufacturing",
                          children: "Manufacturing",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "other",
                          children: "Other",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
            ],
          });
        },
      }),
    ],
  });
}
