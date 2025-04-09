
// Test setup file for Vitest
import { vi } from 'vitest';

// Configure global test environment
export default function setup(): void {
  // Reset all mocks before each test
  vi.clearAllMocks();
  
  // Make sure that mock has proper extensions
  vi.mock = vi.fn();
  
  // Set up any global test environment configuration
  global.console.error = vi.fn();
  
  // Ensure fetch is mocked
  global.fetch = vi.fn();
}
