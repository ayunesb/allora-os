/**
 * Utility functions for testing components and validators
 *
 * These functions help with:
 * - Form validation testing
 * - Component rendering tests
 * - Mock data generation
 * - Test event simulation
 */

import { ReactElement } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ZodSchema } from "zod";

/**
 * Tests validation schema against multiple cases
 * Useful for unit testing Zod schemas
 *
 * @param schema The Zod schema to test
 * @param validCases Array of valid test cases
 * @param invalidCases Array of invalid test cases with expected error messages
 *
 * @example
 * // Test user schema validation
 * const userSchema = z.object({
 *   email: z.string().email(),
 *   age: z.number().min(18)
 * });
 *
 * testValidationSchema(
 *   userSchema,
 *   [{ email: "test@example.com", age: 25 }],
 *   [
 *     {
 *       data: { email: "invalid", age: 25 },
 *       expectedError: "Invalid email"
 *     },
 *     {
 *       data: { email: "test@example.com", age: 16 },
 *       expectedError: "Expected min 18"
 *     }
 *   ]
 * );
 */
export function testValidationSchema<T>(
  schema: ZodSchema<T>,
  validCases: any[],
  invalidCases: { data: any; expectedError: string }[],
): void {
  describe("Schema validation", () => {
    // Test valid cases
    test.each(validCases)("validates valid case: %p", (testCase) => {
      const result = schema.safeParse(testCase);
      expect(result.success).toBe(true);
    });

    // Test invalid cases
    test.each(invalidCases)(
      "invalidates case: $data with error: $expectedError",
      ({ data, expectedError }) => {
        const result = schema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.errors.some((err) =>
              err.message.includes(expectedError),
            ),
          ).toBe(true);
        }
      },
    );
  });
}

/**
 * Custom render function for testing components with providers
 * Wraps components with necessary providers for testing
 *
 * @param ui Component to render
 * @param options Additional render options
 * @returns Rendered component with testing utilities
 *
 * @example
 * // Test a component that requires providers
 * const { getByText } = renderWithProviders(<MyComponent />);
 * expect(getByText('Hello')).toBeInTheDocument();
 */
export function renderWithProviders(ui: ReactElement, options = {}) {
  return render(ui, {
    // Wrap with providers as needed
    // For example: <QueryClientProvider client={queryClient}>
    wrapper: ({ children }) => children,
    ...options,
  });
}

/**
 * Generates mock data for tests based on schema
 * Creates valid test data matching the provided schema
 *
 * @param schema The schema to base mock data on
 * @param overrides Optional overrides for specific fields
 * @returns Mock data object
 *
 * @example
 * // Generate mock user data
 * const mockUser = generateMockData(userSchema, { name: "Custom Name" });
 */
export function generateMockData<T>(schema: ZodSchema<T>, overrides = {}): T {
  // Simple implementation - in a real app, would use a more sophisticated approach
  // like faker or a dedicated mock data generator
  return schema.parse({
    // Default values could be derived from schema
    ...overrides,
  });
}

/**
 * Waits for all promises to resolve
 * Useful for testing async operations
 *
 * @example
 * // Test async component behavior
 * await waitForPromises();
 * expect(getByText('Loaded')).toBeInTheDocument();
 */
export async function waitForPromises(): Promise<void> {
  return new Promise((resolve) => {
    // Wait for all promises to resolve
    setTimeout(resolve, 0);
  });
}
