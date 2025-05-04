/**
 * Generates a self-coaching note based on the outcome of an executive action
 */
export declare function generateSelfCoachingNote(executiveName: string, role: string, task: string, outcome: string, performanceNotes: string): Promise<string>;
/**
 * Saves a self-coaching note to the executive memory
 */
export declare function saveCoachingNoteToMemory(userId: string, executiveName: string, task: string, coachingNote: string): Promise<boolean>;
