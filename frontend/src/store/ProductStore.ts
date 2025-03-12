// src/store/productStore.ts

import { create } from 'zustand';

interface ProductState {
  // State
  selectedCategory: string;
  
  // Actions
  setSelectedCategory: (category: string) => void;
  resetProductStore: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  // State
  selectedCategory: 'ALL',
  
  // Actions
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  // Reset store
  resetProductStore: () => set({
    selectedCategory: 'ALL',
  })
}));