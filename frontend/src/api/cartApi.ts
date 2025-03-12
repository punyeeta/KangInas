import api from './api'; // Import the configured axios instance

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
    const response = await api.get('/cart/');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addToCart = async (productId: number, quantity: number = 1): Promise<CartItem> => {
  try {
    const response = await api.post('/cart/add/', {
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
    await api.delete(`/cart/remove/${productId}/`);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (productId: number, quantity: number): Promise<CartItem> => {
  try {
    await removeFromCart(productId);
    return await addToCart(productId, quantity);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};