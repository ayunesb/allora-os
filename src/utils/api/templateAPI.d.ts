/**
 * Fetches strategy template drafts that can be published
 */
export declare const fetchTemplateDrafts: () => Promise<unknown>;
/**
 * Publishes a strategy template to make it publicly available
 */
export declare const publishTemplate: (templateId: string) => Promise<unknown>;
