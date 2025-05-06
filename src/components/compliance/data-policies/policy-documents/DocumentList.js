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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var DocumentItem_1 = require("./DocumentItem");
var ComplianceContext_1 = require("@/context/ComplianceContext");
var DocumentList = function () {
  var _a = (0, ComplianceContext_1.useCompliance)(),
    pendingUpdates = _a.pendingUpdates,
    isApplyingUpdate = _a.isApplyingUpdate,
    applyUpdate = _a.applyUpdate;
  var _b = (0, react_1.useState)(null),
    updatingDocId = _b[0],
    setUpdatingDocId = _b[1];
  var documents = [
    {
      id: "terms-of-service",
      name: "Terms of Service",
      version: "v2.0",
      path: "/legal/terms-of-service",
      lastUpdated: "April 10, 2025",
      updateAvailable: pendingUpdates.includes("terms-of-service"),
    },
    {
      id: "privacy-policy",
      name: "Privacy Policy",
      version: "v2.4",
      path: "/legal/privacy-policy",
      lastUpdated: "April 10, 2025",
      updateAvailable: pendingUpdates.includes("privacy-policy"),
    },
    {
      id: "cookies",
      name: "Cookie Policy",
      version: "v1.1",
      path: "/legal/cookies",
      lastUpdated: "April 10, 2025",
      updateAvailable: pendingUpdates.includes("cookies"),
    },
    {
      id: "refund-policy",
      name: "Cancellation & Refund Policy",
      version: "v1.0",
      path: "/legal/refund-policy",
      lastUpdated: "April 10, 2025",
      updateAvailable: pendingUpdates.includes("refund-policy"),
    },
    {
      id: "data-processing",
      name: "Data Processing Agreement",
      version: "v1.3",
      path: "/legal/data-processing",
      lastUpdated: "April 10, 2025",
      updateAvailable: pendingUpdates.includes("data-processing"),
    },
    {
      id: "messaging-consent",
      name: "Messaging Consent",
      version: "v1.0",
      path: "/legal/messaging-consent",
      lastUpdated: "April 10, 2025",
      updateAvailable: pendingUpdates.includes("messaging-consent"),
    },
  ];
  var handleUpdateDocument = function (docId) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setUpdatingDocId(docId);
            return [4 /*yield*/, applyUpdate(docId)];
          case 1:
            _a.sent();
            setUpdatingDocId(null);
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsx)("ul", {
    className: "space-y-3",
    children: documents.map(function (doc) {
      return (0, jsx_runtime_1.jsx)(
        DocumentItem_1.default,
        { document: doc, updatingDocId: updatingDocId },
        doc.id,
      );
    }),
  });
};
exports.default = DocumentList;
