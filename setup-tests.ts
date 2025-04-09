
// Test setup file for Vitest
import { vi } from 'vitest';

// Configure global test environment
export default function setup(): void {
  // Reset all mocks before each test
  vi.clearAllMocks();
  
  // Set up any global test environment configuration
  global.console.error = vi.fn();
}
