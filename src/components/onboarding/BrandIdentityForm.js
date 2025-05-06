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
exports.BrandIdentityForm = BrandIdentityForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var label_1 = require("@/components/ui/label");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var separator_1 = require("@/components/ui/separator");
var badge_1 = require("@/components/ui/badge");
var card_1 = require("@/components/ui/card");
// Brand tone options
var brandTones = [
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "bold", label: "Bold" },
  { value: "creative", label: "Creative" },
  { value: "innovative", label: "Innovative" },
  { value: "premium", label: "Premium" },
];
function BrandIdentityForm(_a) {
  var _b;
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails;
  var _c = (0, react_1.useState)(null),
    previewLogo = _c[0],
    setPreviewLogo = _c[1];
  var _d = (0, react_1.useState)(
      "This is how your brand message will appear to users.",
    ),
    brandStylePreview = _d[0],
    setBrandStylePreview = _d[1];
  // Handle color change
  var handleColorChange = function (field, value) {
    var _a;
    updateCompanyDetails(
      __assign(
        __assign({}, companyDetails),
        ((_a = {}), (_a[field] = value), _a),
      ),
    );
  };
  // Handle logo upload
  var handleLogoUpload = function (event) {
    var _a;
    var file =
      (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
      // For a real implementation, you would upload this file to your storage
      // and get back a URL. For now, we'll just create a local preview
      var reader = new FileReader();
      reader.onload = function (e) {
        var _a;
        var dataUrl =
          (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        setPreviewLogo(dataUrl);
        updateCompanyDetails(
          __assign(__assign({}, companyDetails), { logoUrl: dataUrl }),
        );
      };
      reader.readAsDataURL(file);
    }
  };
  // Clear the logo
  var handleClearLogo = function () {
    setPreviewLogo(null);
    updateCompanyDetails(
      __assign(__assign({}, companyDetails), { logoUrl: "" }),
    );
  };
  // Update preview based on selected brand tone and colors
  (0, react_1.useEffect)(
    function () {
      var styleDescription = "This is how your brand message will appear.";
      switch (companyDetails.brandTone) {
        case "formal":
          styleDescription =
            "Your brand uses professional, straightforward language.";
          break;
        case "friendly":
          styleDescription =
            "Your brand uses approachable, conversational language.";
          break;
        case "bold":
          styleDescription =
            "Your brand makes strong statements with confidence.";
          break;
        case "creative":
          styleDescription = "Your brand uses imaginative language to inspire.";
          break;
        case "innovative":
          styleDescription =
            "Your brand focuses on future-oriented, progressive messaging.";
          break;
        case "premium":
          styleDescription = "Your brand emphasizes quality and exclusivity.";
          break;
        default:
          styleDescription = "Select a brand tone to see a preview.";
      }
      setBrandStylePreview(styleDescription);
    },
    [companyDetails.brandTone],
  );
  // Set up initial preview logo if logoUrl exists
  (0, react_1.useEffect)(function () {
    if (companyDetails.logoUrl) {
      setPreviewLogo(companyDetails.logoUrl);
    }
  }, []);
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "space-y-4",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-2",
          children: [
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "logo-upload",
              children: "Company Logo",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-4",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "w-24 h-24 border-2 border-dashed border-muted rounded-md flex items-center justify-center overflow-hidden bg-muted/10",
                  children: previewLogo
                    ? (0, jsx_runtime_1.jsx)("img", {
                        src: previewLogo,
                        alt: "Logo preview",
                        className: "max-w-full max-h-full object-contain",
                      })
                    : (0, jsx_runtime_1.jsx)(lucide_react_1.ImageIcon, {
                        className: "h-8 w-8 text-muted-foreground",
                      }),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "logo-upload",
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleLogoUpload,
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "outline",
                          onClick: function () {
                            var _a;
                            return (_a =
                              document.getElementById("logo-upload")) ===
                              null || _a === void 0
                              ? void 0
                              : _a.click();
                          },
                          type: "button",
                          size: "sm",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Upload, {
                              className: "h-4 w-4 mr-2",
                            }),
                            "Upload Logo",
                          ],
                        }),
                        previewLogo &&
                          (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            variant: "outline",
                            onClick: handleClearLogo,
                            type: "button",
                            size: "sm",
                            className:
                              "text-destructive hover:text-destructive",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                                className: "h-4 w-4 mr-2",
                              }),
                              "Remove",
                            ],
                          }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-xs text-muted-foreground mt-1",
                      children: "Recommended: Square image, at least 200x200px",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "my-6" }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "primary-color",
                  children: "Primary Brand Color",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "primary-color",
                      type: "color",
                      value: companyDetails.primaryColor || "#000000",
                      onChange: function (e) {
                        return handleColorChange(
                          "primaryColor",
                          e.target.value,
                        );
                      },
                      className: "w-12 h-10 p-1",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      value: companyDetails.primaryColor || "#000000",
                      onChange: function (e) {
                        return handleColorChange(
                          "primaryColor",
                          e.target.value,
                        );
                      },
                      placeholder: "#000000",
                      className: "flex-1",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground",
                  children:
                    "Used for buttons, links, and important UI elements",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "secondary-color",
                  children: "Secondary Brand Color",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "secondary-color",
                      type: "color",
                      value: companyDetails.secondaryColor || "#ffffff",
                      onChange: function (e) {
                        return handleColorChange(
                          "secondaryColor",
                          e.target.value,
                        );
                      },
                      className: "w-12 h-10 p-1",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      value: companyDetails.secondaryColor || "#ffffff",
                      onChange: function (e) {
                        return handleColorChange(
                          "secondaryColor",
                          e.target.value,
                        );
                      },
                      placeholder: "#ffffff",
                      className: "flex-1",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground",
                  children:
                    "Used for accents, highlights, and supporting elements",
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-2 pt-2",
          children: [
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "brand-tone",
              children: "Brand Tone",
            }),
            (0, jsx_runtime_1.jsxs)(select_1.Select, {
              value: companyDetails.brandTone || "",
              onValueChange: function (value) {
                return updateCompanyDetails(
                  __assign(__assign({}, companyDetails), { brandTone: value }),
                );
              },
              children: [
                (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                  id: "brand-tone",
                  children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                    placeholder: "Select brand tone",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                  children: brandTones.map(function (tone) {
                    return (0, jsx_runtime_1.jsx)(
                      select_1.SelectItem,
                      { value: tone.value, children: tone.label },
                      tone.value,
                    );
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-xs text-muted-foreground",
              children:
                "Defines how your brand communicates with your audience",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "my-6" }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-2",
          children: [
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              children: "Brand Style Preview",
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              className: "overflow-hidden",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "h-2",
                  style: {
                    backgroundColor: companyDetails.primaryColor || "#4F46E5",
                  },
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "p-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center space-x-2 mb-2",
                      children: [
                        previewLogo
                          ? (0, jsx_runtime_1.jsx)("img", {
                              src: previewLogo,
                              alt: "Logo",
                              className: "h-8 w-8 object-contain",
                            })
                          : (0, jsx_runtime_1.jsx)("div", {
                              className:
                                "h-8 w-8 rounded flex items-center justify-center",
                              style: {
                                backgroundColor:
                                  companyDetails.secondaryColor || "#10B981",
                              },
                              children: (0, jsx_runtime_1.jsx)("span", {
                                className: "text-xs font-bold text-white",
                                children:
                                  ((_b = companyDetails.name) === null ||
                                  _b === void 0
                                    ? void 0
                                    : _b.substring(0, 1)) || "A",
                              }),
                            }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "font-medium",
                          children: companyDetails.name || "Your Company",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm mb-3",
                      children: brandStylePreview,
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex flex-wrap gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                          style: {
                            backgroundColor:
                              companyDetails.primaryColor || "#4F46E5",
                            color: "#ffffff",
                          },
                          children: "Primary Button",
                        }),
                        (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                          variant: "outline",
                          style: {
                            borderColor:
                              companyDetails.secondaryColor || "#10B981",
                            color: companyDetails.secondaryColor || "#10B981",
                          },
                          children: "Secondary Button",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
