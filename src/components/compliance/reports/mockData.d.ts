export interface Report {
    id: string;
    title: string;
    date: string;
    status: "completed" | "scheduled";
    type: string;
}
export declare const complianceReports: Report[];
export interface Certification {
    id: string;
    title: string;
    validUntil: string;
    iconUrl: string;
    alt: string;
}
export declare const certifications: Certification[];
