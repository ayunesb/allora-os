type CommunicationStyle =
  | "consultative"
  | "relationship"
  | "outbound"
  | "balanced";
interface ResponseOptions {
  customerName?: string;
  previousInteractions?: number;
  inquiryType?: "product" | "pricing" | "support" | "general";
  style?: CommunicationStyle;
}
export declare function generateHumanResponse(
  message: string,
  executiveBot?: string,
  options?: ResponseOptions,
): string;
export declare function processWhatsAppMessage(
  incomingMessage: string,
  customerName?: string,
  previousInteractions?: number,
  executiveBot?: string,
): Promise<string>;
export {};
