interface AuditSummaryProps {
    summary: {
        total: number;
        passed: number;
        failed: number;
        pending: number;
    };
}
export declare function AuditSummary({ summary }: AuditSummaryProps): JSX.Element;
export {};
