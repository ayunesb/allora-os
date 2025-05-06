"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest"); // ✅ Add this at the top
/// <reference types="vitest" />
require("@testing-library/jest-dom");
// Mock ResizeObserver which is not available in jsdom
global.ResizeObserver = /** @class */ (function () {
  function ResizeObserver() {}
  ResizeObserver.prototype.observe = function () {};
  ResizeObserver.prototype.unobserve = function () {};
  ResizeObserver.prototype.disconnect = function () {};
  return ResizeObserver;
})();
// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vitest_1.vi.fn().mockImplementation(function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vitest_1.vi.fn(), // deprecated in modern browsers, use addEventListener instead
      removeListener: vitest_1.vi.fn(), // deprecated in modern browsers, use removeEventListener instead
      addEventListener: vitest_1.vi.fn(),
      removeEventListener: vitest_1.vi.fn(),
      dispatchEvent: vitest_1.vi.fn(),
    };
  }),
});
// Suppress console errors during tests
vitest_1.vi.spyOn(console, "error").mockImplementation(function () {});
// Clean up after each test
afterEach(function () {
  vitest_1.vi.restoreAllMocks();
});
