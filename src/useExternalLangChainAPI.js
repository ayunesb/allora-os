"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toast_1 = require("@/utils/toast"); // Fix path
// Example usage:
var toastContent = {
  children: "Some title", // Replaced 'title' with 'children' to match the expected type
  // ...existing code...
};
(0, toast_1.toast)({
  children: "Error!",
  description: "Something went wrong",
  variant: "destructive", // Ensure 'variant' is a valid property
});
