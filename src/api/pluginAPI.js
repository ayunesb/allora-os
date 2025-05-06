"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetchApi_1 = require("@/utils/api/fetchApi"); // Adjust the path as needed
var params = {}; // Define or import 'params' as needed
await (0, fetchApi_1.fetchApi)("/api/endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(params), // Ensures the body is a string
});
