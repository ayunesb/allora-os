import { Anomaly } from "./anomalyDetector";
/**
 * Triggers a crisis meeting for each anomaly detected
 *
 * @param anomalies Array of detected anomalies
 * @returns Promise resolved when all crisis meetings have been processed
 */
export declare function triggerCrisisMeeting(
  anomalies: Anomaly[],
): Promise<void>;
