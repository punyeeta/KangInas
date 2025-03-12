// First, let's update your productApi.ts to add search functionality
// src/api/productApi.ts
import api from './api';

// Define type interfaces
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  available: boolean;
  created_at: string;
  category: string;
  // New fields
  ingredients: string | null;
  serving_size: string | null;
  dietary_info: string | null;
}

export interface CategoryOption {
  value: string;
  label: string;
}

// Product-related API calls
export const productApi = {
  // Get all categories
  getCategories: async (): Promise<CategoryOption[]> => {
    const response = await api.get<CategoryOption[]>('/categories/');
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/category/${category}/`);
    return response.data;
  },

  // Add search products function
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }
};