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
exports.validateLegalAcceptance = validateLegalAcceptance;
var client_1 = require("@/integrations/supabase/client");
/**
 * Validates the legal acceptance system functionality
 */
function validateLegalAcceptance() {
  return __awaiter(this, void 0, void 0, function () {
    var tableCheckError,
      structureCheckError,
      session,
      _a,
      userAcceptances,
      fetchError,
      useLegalAcceptance,
      error_1,
      error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 11, , 12]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("user_legal_acceptances")
              .select("id")
              .limit(1),
          ];
        case 1:
          tableCheckError = _b.sent().error;
          if (tableCheckError) {
            if (tableCheckError.code === "42P01") {
              // Table doesn't exist
              console.error("user_legal_acceptances table doesn't exist");
              return [
                2 /*return*/,
                {
                  valid: false,
                  message:
                    "The user_legal_acceptances table does not exist in the database.",
                },
              ];
            }
            console.error(
              "Error accessing user_legal_acceptances table:",
              tableCheckError,
            );
            return [
              2 /*return*/,
              {
                valid: false,
                message: "Error accessing user_legal_acceptances: ".concat(
                  tableCheckError.message,
                ),
              },
            ];
          }
          return [
            4 /*yield*/,
            client_1.supabase
              .from("user_legal_acceptances")
              .select(
                "user_id, terms_of_service, privacy_policy, messaging_consent, terms_version, privacy_version, consent_version",
              )
              .limit(1),
          ];
        case 2:
          structureCheckError = _b.sent().error;
          if (structureCheckError) {
            console.error("Table structure invalid:", structureCheckError);
            return [
              2 /*return*/,
              {
                valid: false,
                message: "Table structure invalid: ".concat(
                  structureCheckError.message,
                ),
              },
            ];
          }
          return [4 /*yield*/, client_1.supabase.auth.getSession()];
        case 3:
          session = _b.sent().data.session;
          if (!(session && session.user)) return [3 /*break*/, 5];
          return [
            4 /*yield*/,
            client_1.supabase
              .from("user_legal_acceptances")
              .select("*")
              .eq("user_id", session.user.id)
              .maybeSingle(),
          ];
        case 4:
          (_a = _b.sent()),
            (userAcceptances = _a.data),
            (fetchError = _a.error);
          if (fetchError && fetchError.code !== "PGRST116") {
            // If there's an error other than "no rows returned"
            console.error(
              "Error fetching user's legal acceptances:",
              fetchError,
            );
            return [
              2 /*return*/,
              {
                valid: false,
                message: "Error fetching legal acceptances: ".concat(
                  fetchError.message,
                ),
              },
            ];
          }
          console.log("User legal acceptance check succeeded");
          return [3 /*break*/, 6];
        case 5:
          console.log(
            "No active session, skipping user-specific legal acceptance check",
          );
          _b.label = 6;
        case 6:
          if (!(typeof window !== "undefined")) return [3 /*break*/, 10];
          _b.label = 7;
        case 7:
          _b.trys.push([7, 9, , 10]);
          return [
            4 /*yield*/,
            Promise.resolve().then(function () {
              return require("@/hooks/useLegalAcceptance");
            }),
          ];
        case 8:
          useLegalAcceptance = _b.sent().useLegalAcceptance;
          if (!useLegalAcceptance) {
            console.error(
              "useLegalAcceptance hook exists but may not be properly implemented",
            );
            return [
              2 /*return*/,
              {
                valid: false,
                message:
                  "useLegalAcceptance hook exists but may not be properly implemented.",
              },
            ];
          }
          return [3 /*break*/, 10];
        case 9:
          error_1 = _b.sent();
          console.error("Failed to load useLegalAcceptance hook:", error_1);
          return [
            2 /*return*/,
            {
              valid: false,
              message:
                "Failed to load useLegalAcceptance hook: " +
                (error_1 instanceof Error ? error_1.message : String(error_1)),
            },
          ];
        case 10:
          console.log("Legal acceptance system validation successful");
          return [
            2 /*return*/,
            {
              valid: true,
              message: "Legal acceptance system is properly configured.",
            },
          ];
        case 11:
          error_2 = _b.sent();
          console.error(
            "Unexpected error during legal acceptance validation:",
            error_2,
          );
          return [
            2 /*return*/,
            {
              valid: false,
              message:
                "Unexpected error during legal acceptance validation: " +
                (error_2 instanceof Error ? error_2.message : String(error_2)),
            },
          ];
        case 12:
          return [2 /*return*/];
      }
    });
  });
}
