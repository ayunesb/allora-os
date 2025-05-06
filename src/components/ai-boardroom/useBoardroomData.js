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
exports.useBoardroomData = useBoardroomData;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var AuthContext_1 = require("@/context/AuthContext");
var useCompanyDetails_1 = require("@/hooks/useCompanyDetails");
var sampleDebate = {
  topic: "Expanding into emerging markets with our SaaS product",
  summary:
    "The executive team debated the benefits and challenges of expanding our SaaS product into emerging markets, weighing market potential against operational complexity.",
  executives: [
    { id: "exec-1", name: "Elon Musk", role: "ceo", title: "CEO" },
    { id: "exec-2", name: "Warren Buffett", role: "cfo", title: "CFO" },
    { id: "exec-3", name: "Satya Nadella", role: "coo", title: "COO" },
    { id: "exec-4", name: "Sheryl Sandberg", role: "cmo", title: "CMO" },
  ],
  discussion: [
    {
      speaker: "Elon Musk",
      message:
        "I strongly believe we should aggressively expand into Southeast Asia first. The digital transformation happening there presents a unique opportunity for our SaaS solution. We could capture significant market share before competitors realize the potential.",
    },
    {
      speaker: "Warren Buffett",
      message:
        "I'm concerned about the financial implications. These markets typically have lower price points, which could impact our margins. We should carefully analyze the unit economics before committing significant resources.",
    },
    {
      speaker: "Satya Nadella",
      message:
        "From an operational perspective, we'd need to consider localization requirements - not just language, but also regulatory compliance and payment methods. I suggest starting with a limited offering in 1-2 countries first.",
    },
    {
      speaker: "Sheryl Sandberg",
      message:
        "Marketing in these regions will require a different approach. We should leverage local partnerships and platforms rather than our usual channels. I'd recommend allocating budget for market research before full commitment.",
    },
  ],
  conclusion:
    "The executive team recommends a phased approach, starting with a focused entry into Singapore and Vietnam, with clear success metrics before expanding further. This balances opportunity with responsible risk management.",
};
function useBoardroomData(companyId) {
  var _a = (0, react_1.useState)(""),
    topic = _a[0],
    setTopic = _a[1];
  var _b = (0, react_1.useState)(""),
    summary = _b[0],
    setSummary = _b[1];
  var _c = (0, react_1.useState)([]),
    executives = _c[0],
    setExecutives = _c[1];
  var _d = (0, react_1.useState)([]),
    discussion = _d[0],
    setDiscussion = _d[1];
  var _e = (0, react_1.useState)(""),
    conclusion = _e[0],
    setConclusion = _e[1];
  var _f = (0, react_1.useState)(true),
    isLoading = _f[0],
    setIsLoading = _f[1];
  var _g = (0, react_1.useState)(null),
    error = _g[0],
    setError = _g[1];
  var _h = (0, react_1.useState)(false),
    timeoutError = _h[0],
    setTimeoutError = _h[1];
  var profile = (0, AuthContext_1.useAuth)().profile;
  var riskAppetite = (0, useCompanyDetails_1.useCompanyDetails)(
    companyId || undefined,
  ).riskAppetite;
  (0, react_1.useEffect)(
    function () {
      var timer;
      function fetchBoardroomDebate() {
        return __awaiter(this, void 0, void 0, function () {
          var targetCompanyId, _a, data, error_1, debateData, err_1;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (
                  !companyId &&
                  !(profile === null || profile === void 0
                    ? void 0
                    : profile.company_id)
                ) {
                  setError(
                    "No company ID available. Please set up your company profile first.",
                  );
                  setIsLoading(false);
                  return [2 /*return*/];
                }
                targetCompanyId =
                  companyId ||
                  (profile === null || profile === void 0
                    ? void 0
                    : profile.company_id);
                setIsLoading(true);
                setError(null);
                setTimeoutError(false);
                timer = setTimeout(function () {
                  setTimeoutError(true);
                }, 8000);
                _b.label = 1;
              case 1:
                _b.trys.push([1, 3, 4, 5]);
                return [
                  4 /*yield*/,
                  client_1.supabase
                    .from("ai_boardroom_debates")
                    .select("*")
                    .eq("company_id", targetCompanyId)
                    .order("created_at", { ascending: false })
                    .limit(1),
                ];
              case 2:
                (_a = _b.sent()), (data = _a.data), (error_1 = _a.error);
                clearTimeout(timer);
                if (error_1) {
                  console.error("Supabase error:", error_1);
                  if (error_1.code === "PGRST116") {
                    setError(
                      "No boardroom debate found for this company. Try starting a new debate.",
                    );
                  } else if (error_1.code === "42P01") {
                    setError(
                      "Executive boardroom functionality is not available. The required database table is missing.",
                    );
                  } else {
                    throw new Error(
                      "Failed to fetch boardroom debate: ".concat(
                        error_1.message,
                      ),
                    );
                  }
                } else if (data && data.length > 0) {
                  debateData = data[0];
                  setTopic(debateData.topic);
                  setSummary(debateData.summary || "");
                  setExecutives(debateData.executives || []);
                  setDiscussion(debateData.discussion || []);
                  setConclusion(debateData.conclusion || "");
                } else {
                  setError(
                    "No boardroom debates found. Start your first executive debate.",
                  );
                  // Set sample data for visual representation
                  setTopic(sampleDebate.topic);
                  setSummary(sampleDebate.summary);
                  setExecutives(sampleDebate.executives);
                  setDiscussion(sampleDebate.discussion);
                  setConclusion(sampleDebate.conclusion);
                }
                return [3 /*break*/, 5];
              case 3:
                err_1 = _b.sent();
                clearTimeout(timer);
                console.error("Error fetching boardroom debate:", err_1);
                setError(err_1.message || "Failed to load boardroom debate.");
                return [3 /*break*/, 5];
              case 4:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      }
      fetchBoardroomDebate();
      return function () {
        clearTimeout(timer);
      };
    },
    [
      companyId,
      profile === null || profile === void 0 ? void 0 : profile.company_id,
    ],
  );
  return {
    topic: topic,
    summary: summary,
    executives: executives,
    discussion: discussion,
    conclusion: conclusion,
    isLoading: isLoading,
    error: error,
    timeoutError: timeoutError,
    sampleDebate: sampleDebate,
  };
}
