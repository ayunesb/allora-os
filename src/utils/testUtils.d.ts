/**
 * Utility functions for testing components and validators
 *
 * These functions help with:
 * - Form validation testing
 * - Component rendering tests
 * - Mock data generation
 * - Test event simulation
 */
import { ReactElement } from 'react';
import '@testing-library/jest-dom';
import { ZodSchema } from 'zod';
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
export declare function testValidationSchema<T>(schema: ZodSchema<T>, validCases: any[], invalidCases: {
    data: any;
    expectedError: string;
}[]): void;
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
export declare function renderWithProviders(ui: ReactElement, options?: {}): any;
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
export declare function generateMockData<T>(schema: ZodSchema<T>, overrides?: {}): T;
/**
 * Waits for all promises to resolve
 * Useful for testing async operations
 *
 * @example
 * // Test async component behavior
 * await waitForPromises();
 * expect(getByText('Loaded')).toBeInTheDocument();
 */
export declare function waitForPromises(): Promise<void>;
