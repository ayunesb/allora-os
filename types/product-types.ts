export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: Date;
};

export type ProductDetails = {
  productId: string;
  description: string;
  stock: number;
  images: string[];
};
