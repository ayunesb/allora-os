interface RunAuditStatusProps {
    isRunning: boolean;
    progress: number;
    auditComplete: boolean;
    criticalIssues?: number;
}
export declare function RunAuditStatus({ isRunning, progress, auditComplete, criticalIssues }: RunAuditStatusProps): JSX.Element;
export {};
