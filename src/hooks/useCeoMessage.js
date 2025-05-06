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
exports.useCeoMessage = useCeoMessage;
var react_1 = require("react");
var sonner_1 = require("sonner");
function useCeoMessage(riskAppetite, industry, companyName) {
  var _this = this;
  var _a = (0, react_1.useState)({
      greeting: "",
      strategicOverview: "",
      tags: [],
      actionSteps: "",
      closingStatement: "",
    }),
    message = _a[0],
    setMessage = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  (0, react_1.useEffect)(
    function () {
      var generateMessage = function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            setIsLoading(true);
            try {
              // In a real application, this would call an API endpoint
              // For this demo, we'll generate the message client-side
              setTimeout(function () {
                var companyNameSafe = companyName || "Your Company";
                var industrySafe = industry || "Technology";
                // Customize message based on risk appetite
                var generatedMessage;
                if (riskAppetite === "high") {
                  generatedMessage = {
                    greeting: "Team ".concat(companyNameSafe, ","),
                    strategicOverview:
                      "I've reviewed our current position in the ".concat(
                        industrySafe,
                        " market, and I see tremendous opportunities for ambitious growth. The competitive landscape is shifting rapidly, and we need to position ourselves for accelerated expansion. Our disruptive approach will allow us to capture significant market share if we move decisively now.",
                      ),
                    tags: [
                      "Disruptive Innovation",
                      "First-Mover Advantage",
                      "Accelerated Growth",
                      "Market Leadership",
                    ],
                    actionSteps:
                      "I recommend we immediately allocate resources to our most innovative product lines, pursue key strategic acquisitions, and aggressively enter emerging markets. Let's schedule a strategic planning session to map out our ambitious growth trajectory for the next quarter.",
                    closingStatement:
                      "The biggest risk is not taking enough risk. Let's think big and execute with precision. The future belongs to the bold.",
                  };
                } else if (riskAppetite === "medium") {
                  generatedMessage = {
                    greeting: "Dear ".concat(companyNameSafe, " Team,"),
                    strategicOverview:
                      "After analyzing our market position and industry trends in ".concat(
                        industrySafe,
                        ", I believe we're well-positioned for balanced growth. We have several promising opportunities that combine reasonable risk with attractive upside potential. Our approach should balance innovation with operational excellence.",
                      ),
                    tags: [
                      "Strategic Growth",
                      "Balanced Portfolio",
                      "Calculated Risks",
                      "Market Expansion",
                    ],
                    actionSteps:
                      "I suggest we focus on optimizing our core products while gradually expanding into adjacent markets. Let's also invest in R&D for future innovations, but with clear milestones and evaluation points to manage our risk exposure.",
                    closingStatement:
                      "By balancing ambition with prudence, we'll build a resilient and growing business for the long term. I look forward to our continued success together.",
                  };
                } else {
                  generatedMessage = {
                    greeting: "Dear Valued ".concat(companyNameSafe, " Team,"),
                    strategicOverview:
                      "I've carefully assessed our position within the ".concat(
                        industrySafe,
                        " industry, and believe we should focus on stability and sustainable growth. Current market uncertainties require a cautious approach that preserves our core strengths while making measured improvements to our product and service offerings.",
                      ),
                    tags: [
                      "Steady Growth",
                      "Risk Mitigation",
                      "Operational Excellence",
                      "Customer Retention",
                    ],
                    actionSteps:
                      "My recommendation is to prioritize enhancing our existing product lines, focus on increasing customer retention, and improve operational efficiencies. Let's also build our cash reserves while looking for low-risk expansion opportunities.",
                    closingStatement:
                      "Consistent, careful progress is the path to enduring success. Let's continue building our foundation for stable long-term growth.",
                  };
                }
                setMessage(generatedMessage);
                setIsLoading(false);
              }, 1000);
            } catch (error) {
              console.error("Error generating CEO message:", error);
              sonner_1.toast.error("Failed to generate CEO message");
              setIsLoading(false);
            }
            return [2 /*return*/];
          });
        });
      };
      generateMessage();
    },
    [riskAppetite, industry, companyName],
  );
  return { message: message, isLoading: isLoading };
}
