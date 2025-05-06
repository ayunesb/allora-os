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
exports.useProfileForm = useProfileForm;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var profileHelpers_1 = require("@/utils/profileHelpers");
var useAvatarUpload_1 = require("./useAvatarUpload");
function useProfileForm() {
  var _this = this;
  var _a = (0, AuthContext_1.useAuth)(),
    user = _a.user,
    profile = _a.profile,
    refreshProfile = _a.refreshProfile;
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)({
      stripe: "",
      twilio_sid: "",
      twilio_token: "",
      heygen: "",
    }),
    personalApiKeys = _c[0],
    setPersonalApiKeys = _c[1];
  // Use the avatar upload hook
  var _d = (0, useAvatarUpload_1.useAvatarUpload)(),
    avatarUrl = _d.avatarUrl,
    setAvatarUrl = _d.setAvatarUrl,
    avatarFile = _d.avatarFile,
    setAvatarFile = _d.setAvatarFile,
    uploadAvatar = _d.uploadAvatar;
  var _e = (0, react_hook_form_1.useForm)({
      defaultValues: {
        name: "",
        email: "",
        company: "",
        role: "",
        phone: "",
        location: "",
        website: "",
        bio: "",
        stripe_key: "",
        twilio_sid: "",
        twilio_token: "",
        heygen_key: "",
      },
    }),
    register = _e.register,
    handleSubmit = _e.handleSubmit,
    reset = _e.reset,
    _f = _e.formState,
    errors = _f.errors,
    isDirty = _f.isDirty;
  // Load profile data
  (0, react_1.useEffect)(
    function () {
      console.log("useProfileForm - Loading profile data:", profile);
      if (profile) {
        reset({
          name: profile.name || "",
          email: (user === null || user === void 0 ? void 0 : user.email) || "",
          company: profile.company || "",
          role: profile.role || "",
          phone: profile.phone || "",
          location: profile.location || "",
          website: profile.website || "",
          bio: profile.bio || "",
        });
        // Load avatar if exists
        if (profile.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
        // Load personal API keys if they exist
        if (profile.personal_api_keys) {
          try {
            var keys =
              typeof profile.personal_api_keys === "string"
                ? JSON.parse(profile.personal_api_keys)
                : profile.personal_api_keys;
            setPersonalApiKeys({
              stripe: keys.stripe || "",
              twilio_sid: keys.twilio_sid || "",
              twilio_token: keys.twilio_token || "",
              heygen: keys.heygen || "",
            });
          } catch (error) {
            console.error("Error parsing personal API keys:", error);
            // Set default empty values if parsing fails
            setPersonalApiKeys({
              stripe: "",
              twilio_sid: "",
              twilio_token: "",
              heygen: "",
            });
          }
        }
      }
    },
    [profile, user, reset, setAvatarUrl],
  );
  var onSubmit = function (data) {
    return __awaiter(_this, void 0, void 0, function () {
      var success, uploadedAvatarUrl, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!user) return [2 /*return*/];
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 7, 8, 9]);
            console.log("Updating profile with data:", data);
            return [
              4 /*yield*/,
              (0, profileHelpers_1.updateUserProfile)(user.id, {
                name: data.name,
                company: data.company,
                role: data.role,
                phone: data.phone,
                location: data.location,
                website: data.website,
                bio: data.bio,
                personal_api_keys: {
                  stripe: personalApiKeys.stripe,
                  twilio_sid: personalApiKeys.twilio_sid,
                  twilio_token: personalApiKeys.twilio_token,
                  heygen: personalApiKeys.heygen,
                },
              }),
            ];
          case 2:
            success = _a.sent();
            if (!success) throw new Error("Failed to update profile");
            if (!avatarFile) return [3 /*break*/, 5];
            return [4 /*yield*/, uploadAvatar(user.id, avatarFile)];
          case 3:
            uploadedAvatarUrl = _a.sent();
            if (!uploadedAvatarUrl) return [3 /*break*/, 5];
            // Update the avatar URL in the database
            return [
              4 /*yield*/,
              (0, profileHelpers_1.updateUserProfile)(user.id, {
                avatar_url: uploadedAvatarUrl,
              }),
            ];
          case 4:
            // Update the avatar URL in the database
            _a.sent();
            _a.label = 5;
          case 5:
            // Refresh profile data after update
            return [4 /*yield*/, refreshProfile()];
          case 6:
            // Refresh profile data after update
            _a.sent();
            sonner_1.toast.success("Profile updated successfully");
            return [3 /*break*/, 9];
          case 7:
            error_1 = _a.sent();
            console.error("Error updating profile:", error_1);
            sonner_1.toast.error("Failed to update profile");
            return [3 /*break*/, 9];
          case 8:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 9:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleApiKeyChange = function (key, value) {
    setPersonalApiKeys(function (prev) {
      var _a;
      return __assign(__assign({}, prev), ((_a = {}), (_a[key] = value), _a));
    });
  };
  return {
    isLoading: isLoading,
    isDirty: isDirty,
    errors: errors,
    avatarUrl: avatarUrl,
    setAvatarUrl: setAvatarUrl,
    avatarFile: avatarFile,
    setAvatarFile: setAvatarFile,
    personalApiKeys: personalApiKeys,
    handleApiKeyChange: handleApiKeyChange,
    register: register,
    handleSubmit: handleSubmit,
    reset: reset,
    onSubmit: onSubmit,
  };
}
