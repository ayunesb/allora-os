import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';
const selfCoachingPromptTemplate = `
You are {executiveName}, a {role} at Allora AI.

You recently completed the following task:
Task: {task}

The result was: {outcome}
Performance notes: {performanceNotes}

As part of your personal development:
- Reflect honestly on what went well.
- Reflect honestly on what went wrong (if anything).
- Suggest one improvement you should make next time.
- Write it like a personal self-coaching note.

Output in a motivating tone.
`;
/**
 * Generates a self-coaching note based on the outcome of an executive action
 */
export async function generateSelfCoachingNote(executiveName, role, task, outcome, performanceNotes) {
    try {
        logger.info(`Generating self-coaching note for ${executiveName} on task: ${task}`);
        const filledPrompt = selfCoachingPromptTemplate
            .replace('{executiveName}', executiveName)
            .replace('{role}', role)
            .replace('{task}', task)
            .replace('{outcome}', outcome)
            .replace('{performanceNotes}', performanceNotes);
        // Call Supabase edge function to generate the coaching note
        const { data, error } = await supabase.functions.invoke('generate-text', {
            body: {
                prompt: filledPrompt,
                temperature: 0.3
            }
        });
        if (error) {
            logger.error('Failed to generate self-coaching note', { error });
            return `Unable to generate coaching note due to API error: ${error.message}`;
        }
        logger.info('Self-coaching note generated successfully');
        return data.content;
    }
    catch (error) {
        logger.error('Error generating self-coaching note', { error });
        return `Error in self-coaching process: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
}
/**
 * Saves a self-coaching note to the executive memory
 */
export async function saveCoachingNoteToMemory(userId, executiveName, task, coachingNote) {
    try {
        const { error } = await supabase.from('executive_memory').insert([
            {
                user_id: userId,
                executive_name: executiveName,
                task: `Self-Coaching on: ${task}`,
                decision: coachingNote,
            },
        ]);
        if (error) {
            logger.error('Failed to save coaching note to memory', { error });
            return false;
        }
        logger.info('Coaching note saved to memory successfully');
        return true;
    }
    catch (error) {
        logger.error('Error saving coaching note to memory', { error });
        return false;
    }
}
