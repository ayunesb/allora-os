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
exports.useSignupForm = useSignupForm;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
var zod_1 = require("@hookform/resolvers/zod");
var react_hook_form_1 = require("react-hook-form");
var z = require("zod");
// Define the signup form validation schema
var signupFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character.",
      ),
    confirmPassword: z.string(),
    company: z.string().min(2, "Company name must be at least 2 characters."),
    industry: z.string().optional(),
    companySize: z.string().optional(),
    websiteUrl: z.string().url().optional().or(z.literal("")),
    acceptTerms: z.boolean().refine(
      function (val) {
        return val === true;
      },
      {
        message: "You must accept the terms and conditions.",
        path: ["acceptTerms"],
      },
    ),
  })
  .refine(
    function (data) {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );
function useSignupForm(_a) {
  var _this = this;
  var _b = _a === void 0 ? {} : _a,
    onSubmitSuccess = _b.onSubmitSuccess;
  var _c = (0, react_1.useState)(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = (0, react_1.useState)(null),
    formError = _d[0],
    setFormError = _d[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  // Initialize react-hook-form with zod resolver
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_1.zodResolver)(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
      industry: "",
      companySize: "",
      websiteUrl: "",
      acceptTerms: false,
    },
  });
  var onSubmit = function (formData) {
    return __awaiter(_this, void 0, void 0, function () {
      var user, errorMessage;
      return __generator(this, function (_a) {
        setLoading(true);
        setFormError(null);
        try {
          user = {
            id: "123",
            email: formData.email,
            name: formData.name,
            company: formData.company || "",
            company_id: "default-company-id",
            industry: formData.industry || "",
            created_at: new Date().toISOString(),
            role: "user",
          };
          sonner_1.toast.success("Account created successfully");
          // Call success callback if provided
          if (onSubmitSuccess) {
            onSubmitSuccess(user);
          } else {
            navigate("/dashboard");
          }
          return [2 /*return*/, { success: true, user: user }];
        } catch (error) {
          errorMessage = error.message || "An unexpected error occurred";
          setFormError(errorMessage);
          sonner_1.toast.error("Failed to create account", {
            description: errorMessage,
          });
          return [2 /*return*/, { success: false, error: errorMessage }];
        } finally {
          setLoading(false);
        }
        return [2 /*return*/];
      });
    });
  };
  return {
    loading: loading,
    isLoading: loading, // Alias for compatibility
    form: form,
    onSubmit: onSubmit,
    navigate: navigate,
    formError: formError,
  };
}
exports.default = useSignupForm;
