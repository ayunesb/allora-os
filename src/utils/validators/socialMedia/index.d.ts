export * from "./schema";
export * from "./urlValidators";
export * from "./contentValidators";
/**
 * Validates a social media post with additional platform-specific logic
 */
export declare function validateSocialMediaPost(post: any): Promise<
  | {
      valid: boolean;
      message: string;
    }
  | {
      valid: boolean;
      message?: undefined;
    }
>;
