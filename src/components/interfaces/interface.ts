export interface Comment {
  id: string;
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

export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  price: number;
  discount?: number;
  isNew?: boolean;
  isPopular?: boolean;
  tags?: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  platforms: string[];
  features: string[];
  systemRequirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  createdAt: string;
  lastLogin: string;
  preferences: {
    theme: "light" | "dark";
    language: string;
    notifications: boolean;
  };
  favorites: string[];
  cart: {
    items: {
      gameId: string;
      quantity: number;
    }[];
    total: number;
  };
}

export interface Review {
  id: string;
  gameId: string;
  userId: string;
  rating: number;
  content: string;
  timestamp: string;
  likes: number;
  isVerified: boolean;
  helpful: number;
  notHelpful: number;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    gameId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  games: string[];
}

export interface Platform {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  games: string[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  games: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: "order" | "review" | "comment" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface SearchResult {
  games: Game[];
  categories: Category[];
  platforms: Platform[];
  tags: Tag[];
}

export interface FilterOptions {
  categories: string[];
  platforms: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  sortBy: "price" | "rating" | "releaseDate" | "popularity";
  sortOrder: "asc" | "desc";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: Pagination;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
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
