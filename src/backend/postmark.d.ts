/**
 * Sends an email using Postmark with company metadata
 * @param to Recipient email address
 * @param subject Email subject
 * @param companyName Company name for tracking and tagging
 * @param htmlBody HTML content of the email (optional if using template)
 * @param textBody Plain text content of the email (optional if using template)
 * @param templateId Postmark template ID (optional)
 * @param templateModel Data for the template (optional)
 * @param leadId Lead ID to associate the email with (optional)
 * @returns A promise with the result of the operation
 */
export declare const sendEmail: ({ to, subject, companyName, htmlBody, textBody, templateId, templateModel, leadId }: {
    to: string;
    subject: string;
    companyName: string;
    htmlBody?: string;
    textBody?: string;
    templateId?: string;
    templateModel?: Record<string, any>;
    leadId?: string;
}) => Promise<{
    success: boolean;
    messageId?: string;
    message?: string;
}>;
/**
 * Sends a campaign email to multiple leads
 * @param campaignId Campaign ID to send emails for
 * @param subject Email subject
 * @param companyName Company name for tracking and tagging
 * @param htmlBody HTML content of the email (optional if using template)
 * @param textBody Plain text content of the email (optional if using template)
 * @param templateId Postmark template ID (optional)
 * @param templateModel Data for the template (optional)
 * @param messageType Type of leads to email ('new', 'contacted', 'qualified', 'all', etc.)
 * @returns A promise with the result of the operation
 */
export declare const sendCampaignEmail: ({ campaignId, subject, companyName, htmlBody, textBody, templateId, templateModel, messageType }: {
    campaignId: string;
    subject?: string;
    companyName: string;
    htmlBody?: string;
    textBody?: string;
    templateId?: string;
    templateModel?: Record<string, any>;
    messageType?: string;
}) => Promise<{
    success: boolean;
    totalSent?: number;
    totalFailed?: number;
    results?: any[];
    message?: string;
}>;
