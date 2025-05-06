"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Profile;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var tabs_1 = require("@/components/ui/tabs");
var skeleton_1 = require("@/components/ui/skeleton");
var CompanyDetailsForm_1 = require("@/components/CompanyDetailsForm");
var ProfileForm_1 = require("@/components/profile/ProfileForm");
var sonner_1 = require("sonner");
var ProfileDiagnostics_1 = require("@/components/settings/ProfileDiagnostics");
// Ensure the object being used is typed correctly
var user = {
  id: "123",
  name: "John Doe",
  company: "TechCorp",
  industry: "Software",
};
function Profile() {
  var auth = (0, AuthContext_1.useAuth)();
  var user = auth.user,
    profile = auth.profile,
    isLoading = auth.isLoading,
    refreshProfile = auth.refreshProfile;
  var userEmail = user === null || user === void 0 ? void 0 : user.email; // Extract email directly from user object
  (0, react_1.useEffect)(
    function () {
      // Call refreshProfile to make sure we have the latest data
      if (user && !isLoading && refreshProfile) {
        refreshProfile();
      }
    },
    [user, isLoading, refreshProfile],
  );
  (0, react_1.useEffect)(
    function () {
      // Detailed logging for verification
      console.log("Current User Details:", {
        email: userEmail,
        userId: user === null || user === void 0 ? void 0 : user.id,
        profileName:
          profile === null || profile === void 0 ? void 0 : profile.name,
        profileCompany:
          profile === null || profile === void 0 ? void 0 : profile.company,
        profileIndustry:
          profile === null || profile === void 0 ? void 0 : profile.industry,
      });
      // Toast notification to make verification clear to the user
      if (user) {
        sonner_1.toast.info("User Account Verification", {
          description: "Logged in as: ".concat(
            userEmail || "Email not available",
          ),
          duration: 5000,
        });
      }
    },
    [user, profile, userEmail, isLoading],
  );
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "container max-w-4xl mx-auto px-4 py-10",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-12 w-1/3",
          }),
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-4 w-2/3",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "grid gap-6",
            children: [
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-36 w-full",
              }),
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-36 w-full",
              }),
            ],
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container max-w-4xl mx-auto px-4 py-10",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-2",
        children: "Profile Settings",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-8",
        children: "Manage your account information",
      }),
      (0, jsx_runtime_1.jsx)(ProfileDiagnostics_1.default, {}),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "basic",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "mb-4",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "basic",
                children: "Basic Info",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "company",
                children: "Company Details",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "basic",
            className: "space-y-6",
            children: (0, jsx_runtime_1.jsx)(ProfileForm_1.default, {}),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "company",
            children: (0, jsx_runtime_1.jsx)(CompanyDetailsForm_1.default, {}),
          }),
        ],
      }),
    ],
  });
}
