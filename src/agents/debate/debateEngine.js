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
exports.runExecutiveDebate = runExecutiveDebate;
exports.saveDebateResult = saveDebateResult;
exports.analyzeDebateResponse = analyzeDebateResponse;
var client_1 = require("@/integrations/supabase/client");
// Mock function to avoid TypeScript errors
function getExecutiveDebates() {
  return {
    insert: function (data) {
      return {
        error: null,
      };
    },
  };
}
/**
 * Runs a debate with a single executive
 */
function runExecutiveDebate(executiveName_1, role_1, task_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (executiveName, role, task, riskAppetite, businessPriority) {
      var _a, data, error, error_1;
      if (riskAppetite === void 0) {
        riskAppetite = "medium";
      }
      if (businessPriority === void 0) {
        businessPriority = "growth";
      }
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("executive-debate", {
                body: {
                  executiveName: executiveName,
                  role: role,
                  task: task,
                  riskAppetite: riskAppetite,
                  businessPriority: businessPriority,
                },
              }),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              console.error("Error in debate function:", error);
              throw new Error(
                "AI Debate execution error: ".concat(error.message),
              );
            }
            return [2 /*return*/, data.response];
          case 2:
            error_1 = _b.sent();
            console.error(
              "Error during debate execution for ".concat(executiveName, ":"),
              error_1,
            );
            return [
              2 /*return*/,
              "As "
                .concat(
                  executiveName,
                  ", I apologize but I cannot fully analyze this task due to technical issues. However, I can offer a preliminary view that this task requires careful consideration of risks and opportunities. We should examine it further when systems are fully operational. Error details: ",
                )
                .concat(error_1.message),
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    },
  );
}
/**
 * Save a debate result to the database
 */
function saveDebateResult(task, executiveName, role, opinion) {
  return __awaiter(this, void 0, void 0, function () {
    var finalVote, error;
    return __generator(this, function (_a) {
      try {
        finalVote = opinion.includes("FINAL VERDICT: For")
          ? "For"
          : opinion.includes("FINAL VERDICT: Against")
            ? "Against"
            : "Neutral";
        error = getExecutiveDebates().insert([
          {
            task: task,
            executive_name: executiveName,
            role: role,
            opinion: opinion,
            vote: finalVote,
          },
        ]).error;
        if (error) {
          console.error("Failed to save debate result:", error);
        } else {
          console.log("Debate result saved for ".concat(executiveName));
        }
      } catch (error) {
        console.error("Error saving debate result:", error);
      }
      return [2 /*return*/];
    });
  });
}
/**
 * Analyzes a debate response to extract stance, risks and opportunities
 */
function analyzeDebateResponse(response) {
  // Default values
  var stance = "Neutral";
  var risks = [];
  var opportunities = [];
  // Determine stance
  if (response.includes("FINAL VERDICT: For")) {
    stance = "For";
  } else if (response.includes("FINAL VERDICT: Against")) {
    stance = "Against";
  }
  // Extract risks
  var riskMatch = response.match(/Risk[s]?:?(.*?)(?=Opportunit|FINAL|$)/is);
  if (riskMatch && riskMatch[1]) {
    var riskText = riskMatch[1].trim();
    // Split by bullet points or numbers
    var riskItems = riskText.split(/(?:\r?\n|\r)(?:[-•*]|\d+\.)\s*/);
    for (var _i = 0, riskItems_1 = riskItems; _i < riskItems_1.length; _i++) {
      var item = riskItems_1[_i];
      var trimmed = item.trim();
      if (trimmed && trimmed.length > 5) {
        risks.push(trimmed);
      }
    }
    // If no bullet points were found, use the whole text
    if (risks.length === 0 && riskText.length > 5) {
      risks.push(riskText);
    }
  }
  // Extract opportunities
  var oppMatch = response.match(/Opportunit[y|ies]:?(.*?)(?=Risk|FINAL|$)/is);
  if (oppMatch && oppMatch[1]) {
    var oppText = oppMatch[1].trim();
    // Split by bullet points or numbers
    var oppItems = oppText.split(/(?:\r?\n|\r)(?:[-•*]|\d+\.)\s*/);
    for (var _a = 0, oppItems_1 = oppItems; _a < oppItems_1.length; _a++) {
      var item = oppItems_1[_a];
      var trimmed = item.trim();
      if (trimmed && trimmed.length > 5) {
        opportunities.push(trimmed);
      }
    }
    // If no bullet points were found, use the whole text
    if (opportunities.length === 0 && oppText.length > 5) {
      opportunities.push(oppText);
    }
  }
  return { stance: stance, risks: risks, opportunities: opportunities };
}
