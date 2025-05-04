/**
 * Fetches unread messages for a specific executive
 */
export declare function fetchExecutiveInbox(executiveName: string): Promise<any[]>;
/**
 * Format inbox messages for use in AI prompts
 */
export declare function formatInboxForPrompt(messages: any[]): string;
/**
 * Marks messages as read for a specific executive
 */
export declare function markMessagesAsRead(executiveName: string): Promise<void>;
/**
 * Sends a message to other executives notifying them of recent messages
 */
export declare function notifyOtherExecutives(executiveName: string, executiveRole: string, messages: any[]): Promise<void>;
/**
 * Sends a message from one executive to another
 */
export declare function sendExecutiveMessage(fromExecutive: string, toExecutive: string, messageContent: string): Promise<void>;
/**
 * Generates a message from one executive to another
 */
export declare function generateExecutiveMessage(executiveName: string, role: string, recipientName: string, recipientRole: string, topic: string): Promise<any>;
