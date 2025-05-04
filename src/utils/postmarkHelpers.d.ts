export declare function sendEmail(to: string, subject: string, htmlBody?: string, textBody?: string, leadId?: string): Promise<boolean>;
export declare function sendTemplateEmail(to: string, templateId: number, templateModel: Record<string, any>, leadId?: string): Promise<boolean>;
export declare function sendCampaignEmails(campaignId: string, subject: string, htmlBody?: string, textBody?: string, messageType?: 'all' | 'new' | 'contacted' | 'qualified' | 'closed'): Promise<any>;
export declare function sendCampaignTemplateEmails(campaignId: string, templateId: number, templateModel: Record<string, any>, messageType?: 'all' | 'new' | 'contacted' | 'qualified' | 'closed'): Promise<any>;
