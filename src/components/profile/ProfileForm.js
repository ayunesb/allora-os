"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var separator_1 = require("@/components/ui/separator");
var useProfileForm_1 = require("@/hooks/useProfileForm");
var AuthContext_1 = require("@/context/AuthContext");
var ProfileAvatar_1 = require("./ProfileAvatar");
var PersonalInfoForm_1 = require("./PersonalInfoForm");
var ApiKeysSection_1 = require("./ApiKeysSection");
var ProfileFormFooter_1 = require("./ProfileFormFooter");
var ProfileForm = function () {
  var _a = (0, AuthContext_1.useAuth)(),
    user = _a.user,
    profile = _a.profile;
  var _b = (0, useProfileForm_1.useProfileForm)(),
    isLoading = _b.isLoading,
    isDirty = _b.isDirty,
    errors = _b.errors,
    avatarUrl = _b.avatarUrl,
    setAvatarUrl = _b.setAvatarUrl,
    avatarFile = _b.avatarFile,
    setAvatarFile = _b.setAvatarFile,
    personalApiKeys = _b.personalApiKeys,
    handleApiKeyChange = _b.handleApiKeyChange,
    register = _b.register,
    handleSubmit = _b.handleSubmit,
    reset = _b.reset,
    onSubmit = _b.onSubmit;
  (0, react_1.useEffect)(
    function () {
      console.log("ProfileForm - Current profile data:", profile);
    },
    [profile],
  );
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Profile Settings",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Update your profile information and avatar",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("form", {
        onSubmit: handleSubmit(onSubmit),
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsx)(ProfileAvatar_1.default, {
                avatarUrl: avatarUrl,
                setAvatarUrl: setAvatarUrl,
                avatarFile: avatarFile,
                setAvatarFile: setAvatarFile,
                profileName:
                  profile === null || profile === void 0
                    ? void 0
                    : profile.name,
                userEmail:
                  user === null || user === void 0 ? void 0 : user.email,
              }),
              (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
              (0, jsx_runtime_1.jsx)(PersonalInfoForm_1.default, {
                register: register,
                errors: errors,
                userCreatedAt:
                  user === null || user === void 0 ? void 0 : user.created_at,
              }),
              (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
              (0, jsx_runtime_1.jsx)(ApiKeysSection_1.default, {
                personalApiKeys: personalApiKeys,
                handleApiKeyChange: handleApiKeyChange,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(ProfileFormFooter_1.default, {
            isLoading: isLoading,
            isDirty: isDirty,
            avatarFile: avatarFile,
            onReset: function () {
              return reset();
            },
          }),
        ],
      }),
    ],
  });
};
exports.default = ProfileForm;
