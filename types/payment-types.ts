export type Payment = {
  id: string;
  amount: number;
  method: string;
  date: Date;
  status: PaymentStatus;
};

export type PaymentStatus = "pending" | "completed" | "failed";
