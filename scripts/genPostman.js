"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var routes = fs_1.default
  .readdirSync("./src/pages/api")
  .filter(function (file) {
    return file.endsWith(".ts");
  })
  .map(function (file) {
    return "/api/".concat(file.replace(".ts", ""));
  });
var collection = {
  info: {
    name: "Allora OS API",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  item: routes.map(function (route) {
    return {
      name: route,
      request: {
        method: "GET",
        url: {
          raw: "http://localhost:3000".concat(route),
          host: ["localhost"],
          port: "3000",
          path: route.split("/").filter(Boolean),
        },
      },
    };
  }),
};
fs_1.default.writeFileSync(
  "allora-postman.json",
  JSON.stringify(collection, null, 2),
);
console.log("✅ Postman collection generated: allora-postman.json");
