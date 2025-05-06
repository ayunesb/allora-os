"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var apiClient = axios_1.default.create({
  baseURL: "https://api.example.com",
  timeout: 1000,
});
apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  },
);
exports.default = apiClient;
