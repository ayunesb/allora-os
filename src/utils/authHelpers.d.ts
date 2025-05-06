export declare function resetPassword(email: string): Promise<{
  success: boolean;
  error?: string;
}>;
export declare function updatePassword(newPassword: string): Promise<{
  success: boolean;
  error?: string;
}>;
export declare function verifyOtp(
  email: string,
  token: string,
): Promise<{
  success: boolean;
  error?: string;
}>;
export declare function resendVerificationEmail(email: string): Promise<{
  success: boolean;
  error?: string;
}>;
