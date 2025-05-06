export type Order = {
	id: string;
	userId: string;
	productIds: string[];
	totalAmount: number;
	createdAt: Date;
	status: OrderStatus;
};

export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';
