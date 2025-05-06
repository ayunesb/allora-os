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
exports.addDemoDataButton = exports.createDemoDebate = void 0;
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
var createDemoDebate = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, err_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (!companyId) {
            sonner_1.toast.error("No company ID provided");
            return [2 /*return*/];
          }
          _b.label = 1;
        case 1:
          _b.trys.push([1, 3, , 4]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("ai_boardroom_debates")
              .insert({
                company_id: companyId,
                topic: "Expanding into international markets",
                summary:
                  "The executive team debated the pros and cons of expanding our operations into European and Asian markets in the next fiscal year.",
                executives: [
                  {
                    id: "exec-1",
                    name: "Elon Musk",
                    role: "ceo",
                    title: "CEO",
                    stance: "support",
                  },
                  {
                    id: "exec-2",
                    name: "Warren Buffett",
                    role: "cfo",
                    title: "CFO",
                    stance: "caution",
                  },
                  {
                    id: "exec-3",
                    name: "Satya Nadella",
                    role: "coo",
                    title: "COO",
                    stance: "support",
                  },
                  {
                    id: "exec-4",
                    name: "Sheryl Sandberg",
                    role: "cmo",
                    title: "CMO",
                    stance: "neutral",
                  },
                  {
                    id: "exec-5",
                    name: "Jeff Bezos",
                    role: "strategy",
                    title: "Chief Strategy Officer",
                    stance: "support",
                  },
                ],
                discussion: [
                  {
                    speaker: "Elon Musk",
                    message:
                      "I believe we should aggressively expand into European markets first, then Asia. Our product has proven success domestically, and these markets represent significant untapped potential.",
                  },
                  {
                    speaker: "Warren Buffett",
                    message:
                      "While I see the opportunity, I have concerns about the capital requirements. European expansion will require significant upfront investment with uncertain payback periods.",
                  },
                  {
                    speaker: "Satya Nadella",
                    message:
                      "From an operations perspective, we can leverage our existing infrastructure with minimal modifications for Europe. Asia would require more substantial adaptations to local regulations.",
                  },
                  {
                    speaker: "Sheryl Sandberg",
                    message:
                      "Our brand resonates well with European consumers based on our market research. However, we need to consider cultural adaptations for our marketing strategy in Asian markets.",
                  },
                  {
                    speaker: "Jeff Bezos",
                    message:
                      "I propose a phased approach: establish our presence in key European markets in Q2, learn from that experience, then prepare for Asian market entry in Q4.",
                  },
                  {
                    speaker: "Elon Musk",
                    message:
                      "I agree with a phased approach, but we should move quickly. Our competitors are already making inroads in these territories.",
                  },
                  {
                    speaker: "Warren Buffett",
                    message:
                      "If we take this approach, I recommend setting clear performance metrics and being prepared to adjust our investment if results don't meet expectations.",
                  },
                ],
                conclusion:
                  "The executive team reached a consensus to proceed with a phased international expansion, beginning with three key European markets in Q2, followed by preliminary operations in two Asian markets in Q4, contingent on successful European performance metrics.",
              })
              .select("id")
              .single(),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Demo boardroom debate created successfully");
          return [2 /*return*/, data.id];
        case 3:
          err_1 = _b.sent();
          console.error("Error creating demo debate:", err_1);
          sonner_1.toast.error(
            "Failed to create demo debate: ".concat(err_1.message),
          );
          return [2 /*return*/, null];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.createDemoDebate = createDemoDebate;
var addDemoDataButton = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!!companyId) return [3 /*break*/, 2];
          return [
            4 /*yield*/,
            client_1.supabase.from("companies").select("id").limit(1).single(),
          ];
        case 1:
          data = _a.sent().data;
          if (data) {
            companyId = data.id;
          } else {
            sonner_1.toast.error("No companies found in the database");
            return [2 /*return*/];
          }
          _a.label = 2;
        case 2:
          if (!companyId) throw new Error("companyId is required");
          return [4 /*yield*/, (0, exports.createDemoDebate)(companyId)];
        case 3:
          _a.sent();
          window.location.reload();
          return [
            2 /*return*/,
            {
              success: true,
              data: null,
            },
          ];
      }
    });
  });
};
exports.addDemoDataButton = addDemoDataButton;
