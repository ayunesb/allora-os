/**
 * Sends an SMS message to a specified phone number with company metadata
 * @param to The phone number to send the SMS to
 * @param body The message content
 * @param companyId The company ID to associate the message with
 * @param leadId Optional lead ID to associate the message with
 * @returns A promise with the result of the operation
 */
export declare const sendSMS: (
  to: string,
  body: string,
  companyId: string,
  leadId?: string,
) => Promise<{
  success: boolean;
  message: string;
  sid?: string;
}>;
/**
 * Sends bulk SMS messages to leads in a campaign
 * @param messageType The type of leads to message ('new', 'contacted', 'qualified', 'all', etc.)
 * @param body The message content
 * @param companyId The company ID to associate the messages with
 * @returns A promise with the result of the operation
 */
export declare const sendBulkSMS: (
  messageType: string,
  body: string,
  companyId: string,
) => Promise<{
  success: boolean;
  totalSent?: number;
  totalFailed?: number;
  results?: any[];
  message?: string;
}>;
