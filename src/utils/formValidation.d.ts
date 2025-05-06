import * as z from "zod";
/**
 * Core form validation utilities
 */
/**
 * Enhanced form validation with sanitization
 * @param schema Zod schema for validation
 * @param data Data to validate
 * @returns Validation result
 */
export declare function validateAndSanitize<T>(
  schema: z.ZodType<T>,
  data: unknown,
): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
};
/**
 * Common schema definitions for reuse across the application
 */
export declare const emailSchema: z.ZodString;
export declare const passwordSchema: z.ZodEffects<
  z.ZodEffects<
    z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>,
    string,
    string
  >,
  string,
  string
>;
export declare const nameSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const urlSchema: z.ZodUnion<
  [z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]
>;
export declare const phoneSchema: z.ZodUnion<
  [z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>, z.ZodLiteral<"">]
>;
export declare const dateSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const csrfTokenSchema: z.ZodString;
/**
 * Create a schema with CSRF protection
 * @param schema Base schema to enhance with CSRF protection
 * @returns Enhanced schema with CSRF token field
 */
export declare function withCsrfProtection<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
): z.ZodObject<
  z.objectUtil.extendShape<
    T,
    {
      csrfToken: z.ZodString;
    }
  >,
  z.UnknownKeysParam,
  z.ZodTypeAny,
  z.objectUtil.addQuestionMarks<
    z.baseObjectOutputType<
      z.objectUtil.extendShape<
        T,
        {
          csrfToken: z.ZodString;
        }
      >
    >,
    any
  > extends infer T_1
    ? {
        [k in keyof T_1]: z.objectUtil.addQuestionMarks<
          z.baseObjectOutputType<
            z.objectUtil.extendShape<
              T,
              {
                csrfToken: z.ZodString;
              }
            >
          >,
          any
        >[k];
      }
    : never,
  z.baseObjectInputType<
    z.objectUtil.extendShape<
      T,
      {
        csrfToken: z.ZodString;
      }
    >
  > extends infer T_2
    ? {
        [k_1 in keyof T_2]: z.baseObjectInputType<
          z.objectUtil.extendShape<
            T,
            {
              csrfToken: z.ZodString;
            }
          >
        >[k_1];
      }
    : never
>;
