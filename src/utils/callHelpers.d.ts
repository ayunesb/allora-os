export declare function makeCall(
  to: string,
  userId?: string,
): Promise<
  | {
      success: boolean;
      callSid: any;
      error?: undefined;
    }
  | {
      success: boolean;
      error: any;
      callSid?: undefined;
    }
>;
export declare function getCallStatus(callSid: string): Promise<
  | {
      success: boolean;
      status: any;
      error?: undefined;
    }
  | {
      success: boolean;
      error: any;
      status?: undefined;
    }
>;
