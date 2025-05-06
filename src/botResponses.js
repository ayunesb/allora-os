"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
  value: vi.fn().mockImplementation(function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated in modern browsers, use addEventListener instead
      removeListener: vi.fn(), // deprecated in modern browsers, use removeEventListener instead
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  }),
});
// Suppress console errors during tests
vi.spyOn(console, "error").mockImplementation(function () {});
// Clean up after each test
afterEach(function () {
  vi.restoreAllMocks();
});
