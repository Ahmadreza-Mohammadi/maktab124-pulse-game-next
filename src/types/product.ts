export interface Product {
  id: string;
  title: string;
  description: string;
  img: string | string[];
  quantity: number;
  price: number;
  category: string;
  creator: string;
  stock: boolean;
  discount?: number;
  rating?: number;
  releaseYear?: number;
  platforms?: string;
}
