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
var server_ts_1 = require("https://deno.land/std@0.177.0/http/server.ts");
var supabase_js_2_38_0_1 = require("https://esm.sh/@supabase/supabase-js@2.38.0");
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var SUPABASE_URL,
      SUPABASE_ANON_KEY,
      POSTMARK_API_KEY,
      userId,
      supabase,
      _a,
      profile,
      profileError,
      _b,
      company,
      companyError,
      _c,
      userData,
      userError,
      userEmail,
      firstName,
      companyName,
      riskAppetite,
      executives,
      executivesList,
      emailHtml,
      response_1,
      responseData,
      logError,
      error_1;
    var _d, _e, _f;
    return __generator(this, function (_g) {
      switch (_g.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
          SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
          POSTMARK_API_KEY = Deno.env.get("POSTMARK_API_KEY") || "";
          if (!POSTMARK_API_KEY) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Postmark API key is not configured" }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          _g.label = 1;
        case 1:
          _g.trys.push([1, 9, , 10]);
          return [4 /*yield*/, req.json()];
        case 2:
          userId = _g.sent().userId;
          if (!userId) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "userId is required" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          supabase = (0, supabase_js_2_38_0_1.createClient)(
            SUPABASE_URL,
            SUPABASE_ANON_KEY,
          );
          return [
            4 /*yield*/,
            supabase.from("profiles").select("*").eq("id", userId).single(),
          ];
        case 3:
          (_a = _g.sent()), (profile = _a.data), (profileError = _a.error);
          if (profileError) {
            console.error("Error fetching user profile:", profileError);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Failed to fetch user profile" }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("companies")
              .select("*")
              .eq("id", profile.company_id)
              .single(),
          ];
        case 4:
          (_b = _g.sent()), (company = _b.data), (companyError = _b.error);
          if (companyError && companyError.code !== "PGRST116") {
            console.error("Error fetching company data:", companyError);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Failed to fetch company data" }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [4 /*yield*/, supabase.auth.admin.getUserById(userId)];
        case 5:
          (_c = _g.sent()), (userData = _c.data), (userError = _c.error);
          if (
            userError ||
            !((_d =
              userData === null || userData === void 0
                ? void 0
                : userData.user) === null || _d === void 0
              ? void 0
              : _d.email)
          ) {
            console.error("Error fetching user data:", userError);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Failed to fetch user email" }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          userEmail = userData.user.email;
          firstName =
            ((_e = profile.name) === null || _e === void 0
              ? void 0
              : _e.split(" ")[0]) || "there";
          companyName =
            (company === null || company === void 0 ? void 0 : company.name) ||
            profile.company ||
            "your business";
          riskAppetite = (
            ((_f =
              company === null || company === void 0
                ? void 0
                : company.details) === null || _f === void 0
              ? void 0
              : _f.riskAppetite) ||
            profile.risk_appetite ||
            "medium"
          ).toLowerCase();
          executives = getExecutiveTeam(riskAppetite);
          executivesList = executives
            .map(function (exec) {
              return "<li>".concat(exec.name, " - ").concat(exec.role, "</li>");
            })
            .join("");
          emailHtml =
            '\n    <!DOCTYPE html>\n    <html>\n    <head>\n      <meta charset="utf-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <title>Welcome to Allora AI</title>\n      <style>\n        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }\n        h1 { color: #4f46e5; }\n        h2 { color: #6366f1; }\n        .executive-team { background-color: #f9fafb; padding: 15px; border-radius: 5px; }\n        .cta-button { display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }\n        .footer { margin-top: 30px; font-size: 12px; color: #6b7280; }\n      </style>\n    </head>\n    <body>\n      <h1>Welcome to Allora AI, '
              .concat(
                firstName,
                "!</h1>\n      \n      <p>We're excited to have you and ",
              )
              .concat(
                companyName,
                ' join our platform. Your AI executive team is ready to help you grow your business with tailored strategies and insights.</p>\n      \n      <h2>Meet Your Executive Team</h2>\n      <div class="executive-team">\n        <p>Based on your company profile and risk appetite (',
              )
              .concat(
                riskAppetite,
                "), we've assembled the following executive team for you:</p>\n        <ul>\n          ",
              )
              .concat(
                executivesList,
                "\n        </ul>\n      </div>\n      \n      <p>They're already working on strategies for ",
              )
              .concat(
                companyName,
                ' and will have their first recommendations ready for you in your dashboard.</p>\n      \n      <p>\n        <a href="https://app.alloraai.com/dashboard" class="cta-button">View Your Dashboard</a>\n      </p>\n      \n      <p>If you have any questions, you can reply to this email or contact our support team.</p>\n      \n      <p>Best regards,<br>The Allora AI Team</p>\n      \n      <div class="footer">\n        <p>\n          You\'re receiving this email because you signed up for Allora AI.<br>\n          If you no longer wish to receive these emails, you can <a href="https://app.alloraai.com/unsubscribe?id=',
              )
              .concat(
                userId,
                '">unsubscribe here</a>.\n        </p>\n      </div>\n    </body>\n    </html>\n    ',
              );
          return [
            4 /*yield*/,
            fetch("https://api.postmarkapp.com/email", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Postmark-Server-Token": POSTMARK_API_KEY,
              },
              body: JSON.stringify({
                From: "welcome@alloraai.com",
                To: userEmail,
                Subject: "Welcome to Allora AI, ".concat(firstName, "!"),
                HtmlBody: emailHtml,
                TextBody: "Welcome to Allora AI, "
                  .concat(firstName, "! We're excited to have you and ")
                  .concat(
                    companyName,
                    " join our platform. Your AI executive team is ready to help you grow your business with tailored strategies and insights.",
                  ),
                MessageStream: "outbound",
              }),
            }),
          ];
        case 6:
          response_1 = _g.sent();
          return [4 /*yield*/, response_1.json()];
        case 7:
          responseData = _g.sent();
          if (!response_1.ok) {
            console.error("Postmark API error:", responseData);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Failed to send welcome email" }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase.from("communications").insert({
              lead_id: userId,
              type: "email",
              content: "Welcome email",
              status: "sent",
              created_at: new Date().toISOString(),
              channel: "email",
              is_ai_generated: true,
              metadata: {
                email_type: "welcome",
                template: "welcome_email",
                postmark_message_id: responseData.MessageID,
              },
            }),
          ];
        case 8:
          logError = _g.sent().error;
          if (logError) {
            console.error("Error logging email in communications:", logError);
          }
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                messageId: responseData.MessageID,
              }),
              {
                status: 200,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 9:
          error_1 = _g.sent();
          console.error("Error in welcome-email function:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ error: error_1.message || "Unknown error" }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 10:
          return [2 /*return*/];
      }
    });
  });
});
// Helper function to select executive team based on risk appetite
function getExecutiveTeam(riskAppetite) {
  var executives = {
    low: [
      { name: "Warren Buffett", role: "Chief Investment Advisor" },
      { name: "Satya Nadella", role: "Technology Strategy" },
      { name: "Mary Barra", role: "Operations Executive" },
      { name: "Tim Cook", role: "Supply Chain & Execution" },
    ],
    medium: [
      { name: "Sheryl Sandberg", role: "COO & Growth Strategy" },
      { name: "Jeff Bezos", role: "Business Expansion" },
      { name: "Trish Bertuzzi", role: "Sales Innovation" },
      { name: "Brian Chesky", role: "Customer Experience" },
    ],
    high: [
      { name: "Elon Musk", role: "Chief Innovation Officer" },
      { name: "Steve Jobs", role: "Product Visionary" },
      { name: "Mike Weinberg", role: "Sales Strategy" },
      { name: "Gary Vaynerchuk", role: "Marketing Disruption" },
    ],
  };
  // Default to medium if risk appetite is not recognized
  return executives[riskAppetite] || executives.medium;
}
