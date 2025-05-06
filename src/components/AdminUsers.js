"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AdminUsers = function () {
  var _a = (0, react_1.useState)([]),
    users = _a[0],
    setUsers = _a[1];
  (0, react_1.useEffect)(function () {
    // Fetch users from API or other source
    var fetchedUsers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];
    setUsers(fetchedUsers);
  }, []);
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h1", { children: "Admin Users" }),
      users.map(function (user, index) {
        return (0, jsx_runtime_1.jsx)("div", { children: user.name }, user.id);
      }),
    ],
  });
};
exports.default = AdminUsers;
