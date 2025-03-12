import api from './api';

// Interfaces for TypeScript type safety
export interface OrderItem {
  id?: number;
  product: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  status: string;
  created_at: string;
  total_amount: number;
  items: OrderItem[];
}

export const orderApi = {
  createOrder: async () => {
    try {
      const response = await api.post<Order>('/orders/create/', {});
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Fetch recent orders
  getRecentOrders: async () => {
    try {
      const response = await api.get<Order[]>('/orders/');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Fetch specific order details
  getOrderDetail: async (orderId: number) => {
    try {
      const response = await api.get<Order>(`/orders/${orderId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }
};