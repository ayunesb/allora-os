import "../mocks/executivesMock";
/**
 * Updates an executive's performance metrics based on action outcomes
 *
 * @param executiveName The name of the executive
 * @param outcome The outcome of the action ('success' or 'failure')
 */
export declare function updateExecutivePerformance(
  executiveName: string,
  outcome: string,
): Promise<void>;
