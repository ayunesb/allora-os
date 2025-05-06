"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.debateTopics = void 0;
// Re-export all debate-related functionality
__exportStar(require("./debateTopics"), exports);
__exportStar(require("./participantManager"), exports);
__exportStar(require("./botResponseGenerator"), exports);
__exportStar(require("./sessionManager"), exports);
__exportStar(require("./summaryGenerator"), exports);
// Ensure debate topics are always available
var debateTopics_1 = require("./debateTopics");
Object.defineProperty(exports, "debateTopics", {
  enumerable: true,
  get: function () {
    return debateTopics_1.debateTopics;
  },
});
