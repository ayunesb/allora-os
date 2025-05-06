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
exports.VoiceUploader = VoiceUploader;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_dropzone_1 = require("react-dropzone");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function VoiceUploader(_a) {
  var onFileSelected = _a.onFileSelected,
    _b = _a.isProcessing,
    isProcessing = _b === void 0 ? false : _b;
  var onDrop = (0, react_1.useCallback)(
    function (acceptedFiles) {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected],
  );
  var _c = (0, react_dropzone_1.useDropzone)({
      onDrop: onDrop,
      accept: {
        "audio/*": [".mp3", ".wav", ".m4a", ".webm"],
      },
      disabled: isProcessing,
      maxFiles: 1,
    }),
    getRootProps = _c.getRootProps,
    getInputProps = _c.getInputProps,
    isDragActive = _c.isDragActive;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Mic, {
                className: "h-5 w-5 text-primary",
              }),
              "Voice Upload",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Upload a voice recording to transcribe and process",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)(
          "div",
          __assign({}, getRootProps(), {
            className:
              "p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors \n            "
                .concat(
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/30 hover:border-primary/50",
                  "\n            ",
                )
                .concat(
                  isProcessing ? "opacity-50 cursor-not-allowed" : "",
                  "\n          ",
                ),
            children: [
              (0, jsx_runtime_1.jsx)(
                "input",
                __assign({}, getInputProps(), { disabled: isProcessing }),
              ),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex flex-col items-center justify-center gap-2",
                children: isDragActive
                  ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Upload, {
                          className: "h-8 w-8 text-primary",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children: "Drop the voice file here...",
                        }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.File, {
                          className: "h-8 w-8 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "font-medium",
                          children: isProcessing
                            ? "Processing audio file..."
                            : "Drag & drop a voice file, or click to select",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children: "Supports MP3, WAV, M4A, and WEBM formats",
                        }),
                      ],
                    }),
              }),
            ],
          }),
        ),
      }),
    ],
  });
}
