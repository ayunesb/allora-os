import { vi } from "vitest"; // ✅ Add this at the top
/// <reference types="vitest" />
import "@testing-library/jest-dom";
// Mock ResizeObserver which is not available in jsdom
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};
// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated in modern browsers, use addEventListener instead
        removeListener: vi.fn(), // deprecated in modern browsers, use removeEventListener instead
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
// Suppress console errors during tests
vi.spyOn(console, "error").mockImplementation(() => { });
// Clean up after each test
afterEach(() => {
    vi.restoreAllMocks();
});
