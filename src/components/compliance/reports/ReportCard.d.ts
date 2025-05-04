interface ReportCardProps {
    report: {
        id: string;
        title: string;
        date: string;
        status: "completed" | "scheduled";
        type: string;
    };
}
export default function ReportCard({ report }: ReportCardProps): import("react").JSX.Element;
export {};
