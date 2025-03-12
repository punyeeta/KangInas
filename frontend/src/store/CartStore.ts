import { create } from 'zustand';
import { getCartItems, addToCart, removeFromCart, updateCartItemQuantity, CartItem } from '../api/cartApi';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  loadingProductIds: number[]; // Track which products are currently being loaded
  error: string | null;

  // Actions
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;

  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  loadingProductIds: [],
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cartItems = await getCartItems();
      set({ items: cartItems, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch cart', 
        isLoading: false 
      });
    }
  },

  addItem: async (productId, quantity = 1) => {
    // Add productId to loading state
    set(state => ({
      loadingProductIds: [...state.loadingProductIds, productId],
      error: null
    }));

    try {
      const newItem = await addToCart(productId, quantity);

      // Check if item already exists, if so update it rather than add duplicate
      set(state => {
        const itemExists = state.items.some(item => item.product === productId);

        const updatedItems = itemExists 
          ? state.items.map(item => item.product === productId ? newItem : item)
          : [...state.items, newItem];

        return {
          items: updatedItems,
          loadingProductIds: state.loadingProductIds.filter(id => id !== productId)
        };
      });
    } catch (error) {
      set(state => ({ 
        error: error instanceof Error ? error.message : 'Failed to add item to cart', 
        loadingProductIds: state.loadingProductIds.filter(id => id !== productId)
      }));
    }
  },

  removeItem: async (productId) => {
    // Add productId to loading state
    set(state => ({
      loadingProductIds: [...state.loadingProductIds, productId],
      error: null
    }));
    
    try {
      await removeFromCart(productId);
      set(state => ({
        items: state.items.filter(item => item.product !== productId),
        loadingProductIds: state.loadingProductIds.filter(id => id !== productId)
      }));
    } catch (error) {
      set(state => ({ 
        error: error instanceof Error ? error.message : 'Failed to remove item from cart', 
        loadingProductIds: state.loadingProductIds.filter(id => id !== productId)
      }));
    }
  },

  updateQuantity: async (productId, quantity) => {
    // Add productId to loading state
    set(state => ({
      loadingProductIds: [...state.loadingProductIds, productId],
      error: null
    }));
    
    try {
      if (quantity <= 0) {
        await get().removeItem(productId);
      } else {
        const updatedItem = await updateCartItemQuantity(productId, quantity);
        set(state => ({
          items: state.items.map(item => 
            item.product === productId ? updatedItem : item
          ),
          loadingProductIds: state.loadingProductIds.filter(id => id !== productId)
        }));
      }
    } catch (error) {
      set(state => ({ 
        error: error instanceof Error ? error.message : 'Failed to update item quantity', 
        loadingProductIds: state.loadingProductIds.filter(id => id !== productId)
      }));
    }
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.product_price * item.quantity), 0);
  }
}));