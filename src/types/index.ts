export interface UserSession {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  [key: string]: any;
}

export interface ProductQueryParams {
  page?: string | number;
  limit?: string | number;
  search?: string;
  category?: string;
  sort?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}
