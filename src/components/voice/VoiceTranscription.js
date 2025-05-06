"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceTranscription = VoiceTranscription;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var VoiceUploader_1 = require("./VoiceUploader");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function VoiceTranscription() {
  var _this = this;
  var _a = (0, react_1.useState)(null),
    file = _a[0],
    setFile = _a[1];
  var _b = (0, react_1.useState)(""),
    transcript = _b[0],
    setTranscript = _b[1];
  var _c = (0, react_1.useState)(false),
    isProcessing = _c[0],
    setIsProcessing = _c[1];
  var _d = (0, react_1.useState)(null),
    error = _d[0],
    setError = _d[1];
  var handleFileSelected = function (selectedFile) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setFile(selectedFile);
            return [4 /*yield*/, transcribeAudio(selectedFile)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  var transcribeAudio = function (audioFile) {
    return __awaiter(_this, void 0, void 0, function () {
      var base64Audio, response_1, errorData, data, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsProcessing(true);
            setError(null);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 7, 8, 9]);
            return [4 /*yield*/, fileToBase64(audioFile)];
          case 2:
            base64Audio = _a.sent();
            return [
              4 /*yield*/,
              fetch("/api/voice-to-text", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ audio: base64Audio }),
              }),
            ];
          case 3:
            response_1 = _a.sent();
            if (!!response_1.ok) return [3 /*break*/, 5];
            return [4 /*yield*/, response_1.json()];
          case 4:
            errorData = _a.sent();
            throw new Error(errorData.error || "Failed to transcribe audio");
          case 5:
            return [4 /*yield*/, response_1.json()];
          case 6:
            data = _a.sent();
            setTranscript(data.text);
            sonner_1.toast.success("Audio transcribed successfully");
            return [3 /*break*/, 9];
          case 7:
            err_1 = _a.sent();
            console.error("Transcription error:", err_1);
            setError(
              err_1 instanceof Error
                ? err_1.message
                : "An unknown error occurred",
            );
            sonner_1.toast.error("Failed to transcribe audio");
            return [3 /*break*/, 9];
          case 8:
            setIsProcessing(false);
            return [7 /*endfinally*/];
          case 9:
            return [2 /*return*/];
        }
      });
    });
  };
  var fileToBase64 = function (file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (typeof reader.result === "string") {
          // Remove the data URL prefix (e.g., "data:audio/webm;base64,")
          var base64 = reader.result.split(",")[1];
          resolve(base64);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = function (error) {
        return reject(error);
      };
    });
  };
  var copyToClipboard = function () {
    navigator.clipboard.writeText(transcript);
    sonner_1.toast.success("Transcript copied to clipboard");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(VoiceUploader_1.VoiceUploader, {
        onFileSelected: handleFileSelected,
        isProcessing: isProcessing,
      }),
      isProcessing &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center justify-center p-6",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
              className: "h-8 w-8 animate-spin text-primary",
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "ml-2",
              children: "Transcribing audio...",
            }),
          ],
        }),
      error &&
        (0, jsx_runtime_1.jsx)(card_1.Card, {
          className: "border-destructive",
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "pt-6",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start gap-2 text-destructive",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                  className: "h-5 w-5 mt-0.5",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "font-medium",
                      children: "Transcription Error",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children: error,
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      transcript &&
        !isProcessing &&
        file &&
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Transcript",
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
                  children: [
                    file.name,
                    " (",
                    Math.round((file.size || 0) / 1024),
                    " KB)",
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "bg-muted p-4 rounded-md whitespace-pre-wrap",
                children: transcript,
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
              className: "flex justify-end gap-2",
              children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                size: "sm",
                onClick: copyToClipboard,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Copy",
                ],
              }),
            }),
          ],
        }),
    ],
  });
}
