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
exports.default = Account;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var avatar_1 = require("@/components/ui/avatar");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var sonner_1 = require("sonner");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var useAuth_1 = require("@/hooks/useAuth");
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("@/integrations/supabase/client");
var lucide_react_1 = require("lucide-react");
function Account() {
  var _this = this;
  var _a = (0, useAuth_1.useAuth)(),
    user = _a.user,
    profile = _a.profile;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)({
      name:
        (profile === null || profile === void 0 ? void 0 : profile.name) || "",
      email: (user === null || user === void 0 ? void 0 : user.email) || "",
      phone:
        (profile === null || profile === void 0 ? void 0 : profile.phone) || "",
      website:
        (profile === null || profile === void 0 ? void 0 : profile.website) ||
        "",
      company:
        (profile === null || profile === void 0 ? void 0 : profile.company) ||
        "",
      location:
        (profile === null || profile === void 0 ? void 0 : profile.location) ||
        "",
      bio:
        (profile === null || profile === void 0 ? void 0 : profile.bio) || "",
    }),
    formData = _c[0],
    setFormData = _c[1];
  var handleChange = function (e) {
    setFormData(function (prev) {
      var _a;
      return __assign(
        __assign({}, prev),
        ((_a = {}), (_a[e.target.name] = e.target.value), _a),
      );
    });
  };
  var handleSaveProfile = function (e) {
    return __awaiter(_this, void 0, void 0, function () {
      var error, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.preventDefault();
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
              sonner_1.toast.error(
                "You must be logged in to update your profile",
              );
              return [2 /*return*/];
            }
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("profiles")
                .update({
                  name: formData.name,
                  phone: formData.phone,
                  website: formData.website,
                  company: formData.company,
                  location: formData.location,
                  bio: formData.bio,
                })
                .eq("id", user.id),
            ];
          case 2:
            error = _a.sent().error;
            if (error) throw error;
            sonner_1.toast.success("Profile updated successfully");
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            sonner_1.toast.error(
              "Error updating profile: ".concat(error_1.message),
            );
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var getInitials = function (name) {
    return name
      .split(" ")
      .map(function (part) {
        return part[0];
      })
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  // Don't render anything if user is not logged in
  if (!user) {
    return (0, jsx_runtime_1.jsx)("div", {
      className:
        "container mx-auto py-8 flex flex-col items-center justify-center min-h-[60vh]",
      children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "w-full max-w-md",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Account Access",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "You must be logged in to view this page",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: function () {
                return navigate("/auth/login");
              },
              className: "w-full",
              children: "Log In",
            }),
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
    children: (0, jsx_runtime_1.jsx)("div", {
      className: "container mx-auto py-8 space-y-8",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col md:flex-row gap-8 items-start",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "md:w-1/3 w-full space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.Card, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                    className: "pb-3",
                    children: [
                      (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                        children: "Account",
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                        children: "Manage your personal information",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                    className: "flex flex-col items-center justify-center py-6",
                    children: [
                      (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                        className: "h-24 w-24 mb-4",
                        children: [
                          (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                            src:
                              (profile === null || profile === void 0
                                ? void 0
                                : profile.avatar_url) || "",
                            alt:
                              (profile === null || profile === void 0
                                ? void 0
                                : profile.name) || "User",
                          }),
                          (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                            className: "text-lg",
                            children: getInitials(
                              (profile === null || profile === void 0
                                ? void 0
                                : profile.name) || "User",
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "text-lg font-medium",
                        children:
                          (profile === null || profile === void 0
                            ? void 0
                            : profile.name) || "User",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children: user.email,
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "mt-2 text-xs text-muted-foreground flex items-center gap-1",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Building, {
                            className: "h-3 w-3",
                          }),
                          (profile === null || profile === void 0
                            ? void 0
                            : profile.company) || "No company",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.Card, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                    className: "pb-3",
                    children: [
                      (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                        children: "Subscription",
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                        children: "Your current plan information",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-sm",
                              children: "Plan:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-sm font-medium",
                              children: (
                                profile === null || profile === void 0
                                  ? void 0
                                  : profile.subscription_status
                              )
                                ? profile.subscription_plan_id
                                : "Free Plan",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-sm",
                              children: "Status:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-sm font-medium",
                              children:
                                (profile === null || profile === void 0
                                  ? void 0
                                  : profile.subscription_status) || "Inactive",
                            }),
                          ],
                        }),
                        (profile === null || profile === void 0
                          ? void 0
                          : profile.subscription_expires_at) &&
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex justify-between",
                            children: [
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "text-sm",
                                children: "Expires:",
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "text-sm font-medium",
                                children: new Date(
                                  profile.subscription_expires_at,
                                ).toLocaleDateString(),
                              }),
                            ],
                          }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                    children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      className: "w-full",
                      children: "Manage Subscription",
                    }),
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "md:w-2/3 w-full",
            children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
              defaultValue: "profile",
              className: "w-full",
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                  className: "grid w-full grid-cols-3",
                  children: [
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "profile",
                      children: "Profile",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "security",
                      children: "Security",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "notifications",
                      children: "Notifications",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "profile",
                  className: "mt-4 space-y-4",
                  children: (0, jsx_runtime_1.jsx)(card_1.Card, {
                    children: (0, jsx_runtime_1.jsxs)("form", {
                      onSubmit: handleSaveProfile,
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                          children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Profile Information",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                              children:
                                "Update your account details and public profile",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          className: "space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "grid grid-cols-1 md:grid-cols-2 gap-4",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                                      htmlFor: "name",
                                      children: "Full Name",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.User,
                                          {
                                            className:
                                              "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                                          id: "name",
                                          name: "name",
                                          placeholder: "Your name",
                                          value: formData.name,
                                          onChange: handleChange,
                                          className: "pl-10",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                                      htmlFor: "email",
                                      children: "Email",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Mail,
                                          {
                                            className:
                                              "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                                          id: "email",
                                          name: "email",
                                          value: formData.email,
                                          disabled: true,
                                          className: "pl-10 bg-muted",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                                      htmlFor: "phone",
                                      children: "Phone Number",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Phone,
                                          {
                                            className:
                                              "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                                          id: "phone",
                                          name: "phone",
                                          placeholder: "Your phone number",
                                          value: formData.phone,
                                          onChange: handleChange,
                                          className: "pl-10",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                                      htmlFor: "website",
                                      children: "Website",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Globe,
                                          {
                                            className:
                                              "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                                          id: "website",
                                          name: "website",
                                          placeholder: "Your website",
                                          value: formData.website,
                                          onChange: handleChange,
                                          className: "pl-10",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                                      htmlFor: "company",
                                      children: "Company",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Building,
                                          {
                                            className:
                                              "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                                          id: "company",
                                          name: "company",
                                          placeholder: "Your company",
                                          value: formData.company,
                                          onChange: handleChange,
                                          className: "pl-10",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                                      htmlFor: "location",
                                      children: "Location",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.MapPin,
                                          {
                                            className:
                                              "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                                          id: "location",
                                          name: "location",
                                          placeholder: "Your location",
                                          value: formData.location,
                                          onChange: handleChange,
                                          className: "pl-10",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(label_1.Label, {
                                  htmlFor: "bio",
                                  children: "Bio",
                                }),
                                (0, jsx_runtime_1.jsx)("textarea", {
                                  id: "bio",
                                  name: "bio",
                                  rows: 4,
                                  placeholder: "Tell us a bit about yourself",
                                  value: formData.bio || "",
                                  onChange: handleChange,
                                  className:
                                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                          className: "border-t px-6 py-4",
                          children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            type: "submit",
                            disabled: isLoading,
                            children: [
                              isLoading ? "Saving..." : "Save Changes",
                              !isLoading &&
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                                  className: "ml-2 h-4 w-4",
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "security",
                  className: "mt-4 space-y-4",
                  children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                            children: "Security Settings",
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                            children:
                              "Manage your password and account security settings",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                        className: "space-y-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(label_1.Label, {
                                children: "Change Password",
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "grid gap-4",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Key,
                                        {
                                          className:
                                            "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                                        type: "password",
                                        placeholder: "Current password",
                                        className: "pl-10",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Key,
                                        {
                                          className:
                                            "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                                        type: "password",
                                        placeholder: "New password",
                                        className: "pl-10",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Key,
                                        {
                                          className:
                                            "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                                        type: "password",
                                        placeholder: "Confirm new password",
                                        className: "pl-10",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                className: "mt-2",
                                children: "Update Password",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "text-lg font-medium",
                                children: "Security Options",
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Shield,
                                        {
                                          className:
                                            "h-4 w-4 text-muted-foreground",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        children: "Two-factor authentication",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    children: "Enable",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Mail,
                                        {
                                          className:
                                            "h-4 w-4 text-muted-foreground",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        children: "Email verification",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    disabled: true,
                                    children: "Verified",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "pt-4 border-t",
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className:
                                  "text-lg font-medium text-destructive mb-2",
                                children: "Danger Zone",
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className:
                                  "flex items-center justify-between bg-destructive/10 p-4 rounded-md",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Trash,
                                        {
                                          className: "h-4 w-4 text-destructive",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        children: [
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className: "font-medium",
                                            children: "Delete Account",
                                          }),
                                          (0, jsx_runtime_1.jsx)("p", {
                                            className:
                                              "text-sm text-muted-foreground",
                                            children:
                                              "Once deleted, your account cannot be recovered",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "destructive",
                                    size: "sm",
                                    children: "Delete",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "notifications",
                  className: "mt-4 space-y-4",
                  children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                            children: "Notification Preferences",
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                            children: "Manage how and when we contact you",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Bell,
                                      {
                                        className:
                                          "h-4 w-4 text-muted-foreground",
                                      },
                                    ),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Email notifications",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "flex items-center space-x-2",
                                  children: (0, jsx_runtime_1.jsx)("input", {
                                    type: "checkbox",
                                    id: "email-notifications",
                                    className:
                                      "rounded border-gray-300 text-primary focus:ring-primary",
                                  }),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Bell,
                                      {
                                        className:
                                          "h-4 w-4 text-muted-foreground",
                                      },
                                    ),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "SMS notifications",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "flex items-center space-x-2",
                                  children: (0, jsx_runtime_1.jsx)("input", {
                                    type: "checkbox",
                                    id: "sms-notifications",
                                    className:
                                      "rounded border-gray-300 text-primary focus:ring-primary",
                                  }),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Bell,
                                      {
                                        className:
                                          "h-4 w-4 text-muted-foreground",
                                      },
                                    ),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Marketing emails",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "flex items-center space-x-2",
                                  children: (0, jsx_runtime_1.jsx)("input", {
                                    type: "checkbox",
                                    id: "marketing-emails",
                                    className:
                                      "rounded border-gray-300 text-primary focus:ring-primary",
                                  }),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "bg-muted/50 p-4 rounded-md mt-4 flex items-start gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.AlertTriangle,
                                  {
                                    className: "h-4 w-4 text-amber-500 mt-0.5",
                                  },
                                ),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "text-sm",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "font-medium",
                                      children: "Communication Preference Note",
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "text-muted-foreground",
                                      children:
                                        "We respect your communication preferences. You can manage your email subscription settings at any time. By opting in, you agree to receive communications from Allora AI.",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                        className: "border-t px-6 py-4",
                        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                          children: "Save Preferences",
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  });
}
