export interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
    socialMedia: {
      platform: string;
      link: string;
    };
  };
  content: string;
  timestamp: string;
  likes: number;
}

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

export interface SearchResult {
  games: Product[];
  categories: string[];
  platforms: string[];
  tags: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  errors?: ValidationError[];
} 


export interface FormErrors {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
}

export interface FormData {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
}

export interface FormErrors {
  cardNumber: string;
  expiry: string;
  cvv: string;
  otp: string;
  email: string;
}

export interface Order {
  id: string;
  payment: string;
  createdAt: string;
  totalAmount: number;
}