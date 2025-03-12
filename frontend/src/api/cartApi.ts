import api from './api'; // Import the configured axios instance

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface CartItem {
  id: number;
  product: number;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
}

export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await api.get(`${BASE_URL}/cart/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addToCart = async (productId: number, quantity: number = 1): Promise<CartItem> => {
  try {
    const response = await api.post(`${BASE_URL}/cart/add/`, {
      product_id: productId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (productId: number): Promise<void> => {
  try {
    await api.delete(`${BASE_URL}/cart/remove/${productId}/`);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (productId: number, quantity: number): Promise<CartItem> => {
  // First remove the item
  await removeFromCart(productId);
  // Then add it back with the new quantity
  return await addToCart(productId, quantity);
};