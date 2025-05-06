"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseMock = void 0;
var vitest_1 = require("vitest");
// Create a type-safe mock for the Supabase client
var createSupabaseMock = function () {
  return {
    from: vitest_1.vi.fn().mockImplementation(function (table) {
      return {
        select: vitest_1.vi.fn().mockReturnValue({
          eq: vitest_1.vi.fn().mockReturnValue({
            eq: vitest_1.vi.fn().mockReturnValue({
              single: vitest_1.vi.fn(),
              limit: vitest_1.vi.fn(),
            }),
            single: vitest_1.vi.fn(),
          }),
        }),
        insert: vitest_1.vi.fn(),
        update: vitest_1.vi.fn(),
        delete: vitest_1.vi.fn(),
      };
    }),
    rpc: vitest_1.vi.fn(),
    auth: {
      getUser: vitest_1.vi.fn(),
      getSession: vitest_1.vi.fn(),
      signUp: vitest_1.vi.fn(),
      signIn: vitest_1.vi.fn(),
      signOut: vitest_1.vi.fn(),
    },
    storage: {
      from: vitest_1.vi.fn(),
    },
  };
};
exports.createSupabaseMock = createSupabaseMock;
