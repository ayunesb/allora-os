type MessageChannel = "sms" | "whatsapp";
export declare function sendSMS(
  to: string,
  body: string,
  leadId?: string,
  channel?: MessageChannel,
): Promise<boolean>;
export declare function sendWhatsApp(
  to: string,
  body: string,
  leadId?: string,
): Promise<boolean>;
export declare function sendBulkSMS(
  body: string,
  messageType: "all" | "new" | "contacted" | "qualified" | "closed",
  channel?: MessageChannel,
): Promise<any>;
export declare function sendBulkWhatsApp(
  body: string,
  messageType: "all" | "new" | "contacted" | "qualified" | "closed",
): Promise<any>;
export declare function getWhatsAppTemplates(): Promise<any>;
export declare function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  variables: Record<string, string>,
  leadId?: string,
): Promise<boolean>;
export declare function trackMessageStatus(messageSid: string): Promise<any>;
export {};
