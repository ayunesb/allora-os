"use strict";
/**
 * Utility functions for testing components and validators
 *
 * These functions help with:
 * - Form validation testing
 * - Component rendering tests
 * - Mock data generation
 * - Test event simulation
 */
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.testValidationSchema = testValidationSchema;
exports.renderWithProviders = renderWithProviders;
exports.generateMockData = generateMockData;
exports.waitForPromises = waitForPromises;
var react_1 = require("@testing-library/react");
require("@testing-library/jest-dom");
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
function testValidationSchema(schema, validCases, invalidCases) {
  describe("Schema validation", function () {
    // Test valid cases
    test.each(validCases)("validates valid case: %p", function (testCase) {
      var result = schema.safeParse(testCase);
      expect(result.success).toBe(true);
    });
    // Test invalid cases
    test.each(invalidCases)(
      "invalidates case: $data with error: $expectedError",
      function (_a) {
        var data = _a.data,
          expectedError = _a.expectedError;
        var result = schema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(
            result.error.errors.some(function (err) {
              return err.message.includes(expectedError);
            }),
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
function renderWithProviders(ui, options) {
  if (options === void 0) {
    options = {};
  }
  return (0, react_1.render)(
    ui,
    __assign(
      {
        // Wrap with providers as needed
        // For example: <QueryClientProvider client={queryClient}>
        wrapper: function (_a) {
          var children = _a.children;
          return children;
        },
      },
      options,
    ),
  );
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
function generateMockData(schema, overrides) {
  if (overrides === void 0) {
    overrides = {};
  }
  // Simple implementation - in a real app, would use a more sophisticated approach
  // like faker or a dedicated mock data generator
  return schema.parse(__assign({}, overrides));
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
function waitForPromises() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        new Promise(function (resolve) {
          // Wait for all promises to resolve
          setTimeout(resolve, 0);
        }),
      ];
    });
  });
}
