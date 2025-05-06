/**
 * Help content utility for displaying context-sensitive help throughout the application
 */
export type HelpContent = {
  id: string;
  title: string;
  description: string;
  content?: string;
  steps?: {
    title: string;
    description: string;
  }[];
  links?: {
    title: string;
    url: string;
  }[];
  video?: string;
};
/**
 * Get help content for a specific context ID
 * @param contextId The ID of the help context to retrieve
 * @returns The help content or null if not found
 */
export declare const getHelpContent: (contextId: string) => HelpContent | null;
/**
 * Check if help content exists for a specific context
 * @param contextId The context ID to check
 * @returns Boolean indicating if help content exists
 */
export declare const hasHelpContent: (contextId: string) => boolean;
/**
 * Get all available help content contexts
 * @returns Array of all context IDs with available help content
 */
export declare const getAllHelpContexts: () => string[];
