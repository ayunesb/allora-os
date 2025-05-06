"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublishAcademyContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var dashboard_breadcrumb_1 = require("@/components/ui/dashboard-breadcrumb");
var page_title_1 = require("@/components/ui/page-title");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function PublishAcademyContent() {
  var _a = (0, react_1.useState)(false),
    isUploading = _a[0],
    setIsUploading = _a[1];
  var _b = (0, react_1.useState)(0),
    uploadProgress = _b[0],
    setUploadProgress = _b[1];
  var handlePublish = function () {
    setIsUploading(true);
    // Simulate upload progress
    var interval = setInterval(function () {
      setUploadProgress(function (prev) {
        var newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          sonner_1.toast.success("Content published successfully!");
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container px-4 py-6",
    children: [
      (0, jsx_runtime_1.jsx)(dashboard_breadcrumb_1.DashboardBreadcrumb, {
        rootPath: "/academy",
        rootLabel: "Academy",
        rootIcon: (0, jsx_runtime_1.jsx)(lucide_react_1.GraduationCap, {
          className: "h-4 w-4",
        }),
        currentPath: "/academy/publish",
        currentLabel: "Publish Content",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mb-6",
        children: [
          (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
            children: "Publish Academy Content",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground",
            children:
              "Upload and publish new educational content to the academy",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Content Details",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Provide information about the content you're publishing",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("p", {
              children: "Content form fields placeholder",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "justify-end space-x-2 border-t pt-6",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                children: "Cancel",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: handlePublish,
                disabled: isUploading,
                children: isUploading
                  ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsxs)("svg", {
                          className: "animate-spin -ml-1 mr-2 h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          children: [
                            (0, jsx_runtime_1.jsx)("circle", {
                              className: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              strokeWidth: "4",
                            }),
                            (0, jsx_runtime_1.jsx)("path", {
                              className: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z",
                            }),
                          ],
                        }),
                        "Uploading ",
                        uploadProgress,
                        "%",
                      ],
                    })
                  : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Upload, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Publish Content",
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
