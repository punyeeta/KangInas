import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { orderApi, Order } from '../api/orders';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  
  createOrder: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  clearError: () => void;
}

export const useOrderStore = create<OrderState>()(
  devtools(
    (set) => ({
      orders: [],
      isLoading: false,
      error: null,

      createOrder: async () => {
        set({ isLoading: true, error: null });
        try {
          const newOrder = await orderApi.createOrder();
          set((state) => ({
            orders: [newOrder, ...state.orders],
            isLoading: false
          }));
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error 
              ? error.message 
              : 'Failed to create order' 
          });
        }
      },

      fetchOrders: async () => {
        set({ isLoading: true, error: null });
        try {
          const fetchedOrders = await orderApi.getRecentOrders();
          set({ 
            orders: fetchedOrders, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            orders: [], 
            isLoading: false, 
            error: error instanceof Error 
              ? error.message 
              : 'Failed to fetch orders' 
          });
        }
      },

      clearError: () => set({ error: null })
    }),
    { name: 'OrderStore' }
  )
);