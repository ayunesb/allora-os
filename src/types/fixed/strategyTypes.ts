export interface Strategy {
  id: string;
  title: string;
  description: string;
  // Add any other shared fields
}

export interface GeneratedStrategy extends Strategy {
  generated: boolean;
}
