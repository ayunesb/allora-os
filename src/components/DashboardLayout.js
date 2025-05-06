"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Sidebar_1 = require("@/components/dashboard/Sidebar");
var MobileSidebar_1 = require("@/components/dashboard/MobileSidebar");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var useAuth_1 = require("@/hooks/useAuth");
var loading_1 = require("@/components/ui/loading");
var authCompatibility_1 = require("@/utils/authCompatibility");
var authCompatibility_2 = require("@/utils/authCompatibility");
function DashboardLayout() {
  var location = (0, react_router_dom_1.useLocation)();
  var navigate = (0, react_router_dom_1.useNavigate)();
  var authContext = (0, useAuth_1.useAuth)();
  var auth = (0, authCompatibility_2.createAuthCompatibilityLayer)(authContext);
  var _a = (0, react_1.useState)(false),
    sidebarOpen = _a[0],
    setSidebarOpen = _a[1];
  var normalizedUser = (0, authCompatibility_1.normalizeUserObject)(
    auth === null || auth === void 0 ? void 0 : auth.user,
  );
  var isLoading =
    (auth === null || auth === void 0 ? void 0 : auth.isLoading) ||
    (auth === null || auth === void 0 ? void 0 : auth.loading);
  (0, react_1.useEffect)(
    function () {
      // Close sidebar when route changes
      setSidebarOpen(false);
    },
    [location.pathname],
  );
  // Redirect to login if not authenticated
  (0, react_1.useEffect)(
    function () {
      if (
        !isLoading &&
        !(auth === null || auth === void 0 ? void 0 : auth.user)
      ) {
        navigate("/auth", { state: { from: location.pathname } });
      }
    },
    [
      auth === null || auth === void 0 ? void 0 : auth.user,
      isLoading,
      navigate,
      location.pathname,
    ],
  );
  // Check for admin routes and redirect if not admin
  (0, react_1.useEffect)(
    function () {
      var _a;
      if (
        !isLoading &&
        (auth === null || auth === void 0 ? void 0 : auth.user) &&
        location.pathname.startsWith("/admin") &&
        (normalizedUser === null || normalizedUser === void 0
          ? void 0
          : normalizedUser.role) !== "admin" &&
        !((_a =
          normalizedUser === null || normalizedUser === void 0
            ? void 0
            : normalizedUser.app_metadata) === null || _a === void 0
          ? void 0
          : _a.is_admin)
      ) {
        navigate("/dashboard", { replace: true });
      }
    },
    [
      auth === null || auth === void 0 ? void 0 : auth.user,
      isLoading,
      navigate,
      location.pathname,
      normalizedUser,
    ],
  );
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "flex items-center justify-center min-h-screen",
      children: (0, jsx_runtime_1.jsx)(loading_1.Loading, {
        size: "lg",
        text: "Loading dashboard...",
      }),
    });
  }
  if (!(auth === null || auth === void 0 ? void 0 : auth.user)) {
    return null; // Will redirect to login via useEffect
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex min-h-screen bg-background",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "hidden md:flex",
        children: (0, jsx_runtime_1.jsx)(Sidebar_1.Sidebar, {
          className: "w-64 border-r min-h-screen",
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "md:hidden",
        children: (0, jsx_runtime_1.jsx)(MobileSidebar_1.MobileSidebar, {
          open: sidebarOpen,
          onClose: function () {
            return setSidebarOpen(false);
          },
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "md:hidden flex items-center p-4 border-b",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                size: "icon",
                className: "mr-4",
                onClick: function () {
                  return setSidebarOpen(true);
                },
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, {
                    className: "h-5 w-5",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "sr-only",
                    children: "Toggle menu",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("h1", {
                className: "font-semibold",
                children: "Dashboard",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("main", {
            className: "p-4 md:p-6 lg:p-8",
            children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
          }),
        ],
      }),
    ],
  });
}
