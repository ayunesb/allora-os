"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDebateContext;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
function useDebateContext() {
  var profile = (0, AuthContext_1.useAuth)().profile;
  var _a = (0, react_1.useState)(null),
    sessionId = _a[0],
    setSessionId = _a[1];
  // Context variables shared between debate hooks
  return {
    sessionId: sessionId,
    setSessionId: setSessionId,
    profile: profile,
  };
}
