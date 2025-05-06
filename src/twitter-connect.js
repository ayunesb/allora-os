"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetchApi_1 = require("@/services/api/fetchApi");
var params = {}; // Defined params or fetch via queryParams/props
await (0, fetchApi_1.fetchApi)("/api/plugin-event", {
  method: "POST",
  body: JSON.stringify(params),
});
// ...existing code...
