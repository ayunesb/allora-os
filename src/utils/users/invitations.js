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
exports.inviteUserToCompany = inviteUserToCompany;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
var postmark_1 = require("@/backend/postmark");
/**
 * Invites a user to join a company
 * @param email Email of the user to invite
 * @param companyId ID of the company to invite to
 * @param role Role to assign to the user (default: 'user')
 * @returns Boolean indicating success
 */
function inviteUserToCompany(email_1, companyId_1) {
  return __awaiter(this, arguments, void 0, function (email, companyId, role) {
    var _a, companyData, companyError, companyName, result, error_1;
    if (role === void 0) {
      role = "user";
    }
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          console.log(
            "Inviting user "
              .concat(email, " to company ")
              .concat(companyId, " with role ")
              .concat(role),
          );
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("companies")
              .select("name")
              .eq("id", companyId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (companyData = _a.data), (companyError = _a.error);
          if (companyError) {
            throw new Error(
              "Failed to get company information: ".concat(
                companyError.message,
              ),
            );
          }
          companyName = companyData.name || "Our Company";
          return [
            4 /*yield*/,
            (0, postmark_1.sendEmail)({
              to: email,
              subject: "Invitation to join Allora AI",
              companyName: companyName,
              htmlBody:
                '\n        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">\n          <h2 style="color: #4f46e5;">You\'ve Been Invited!</h2>\n          <p>You\'ve been invited to join '
                  .concat(
                    companyName,
                    ' on Allora AI.</p>\n          <p>To accept this invitation, please click the button below to create your account:</p>\n          <a href="',
                  )
                  .concat(window.location.origin, "/signup?email=")
                  .concat(encodeURIComponent(email), "&company_id=")
                  .concat(companyId, "&role=")
                  .concat(
                    role,
                    '" \n             style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0;">\n            Accept Invitation\n          </a>\n          <p>If you have any questions, please contact the company administrator.</p>\n          <p>Thank you,<br>The Allora AI Team</p>\n        </div>\n      ',
                  ),
              textBody: "\n        You've been invited to join "
                .concat(
                  companyName,
                  " on Allora AI.\n        \n        To accept this invitation, please visit this link to create your account:\n        ",
                )
                .concat(window.location.origin, "/signup?email=")
                .concat(encodeURIComponent(email), "&company_id=")
                .concat(companyId, "&role=")
                .concat(
                  role,
                  "\n        \n        If you have any questions, please contact the company administrator.\n        \n        Thank you,\n        The Allora AI Team\n      ",
                ),
            }),
          ];
        case 2:
          result = _b.sent();
          if (!result.success) {
            throw new Error(
              result.message || "Failed to send invitation email",
            );
          }
          console.log("Invitation email sent successfully");
          sonner_1.toast.success("Invitation sent to ".concat(email));
          return [2 /*return*/, true];
        case 3:
          error_1 = _b.sent();
          console.error("Failed to invite user:", error_1);
          sonner_1.toast.error(
            "Failed to invite user: ".concat(error_1.message),
          );
          return [2 /*return*/, false];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
