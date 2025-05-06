"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequireAuth;
var jsx_runtime_1 = require("react/jsx-runtime");
var useSession_1 = require("@/lib/supabase/useSession");
var react_router_dom_1 = require("react-router-dom");
function RequireAuth(_a) {
  var children = _a.children;
  var session = (0, useSession_1.useSession)().session;
  return session
    ? children
    : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
        to: "/login",
        replace: true,
      });
}
