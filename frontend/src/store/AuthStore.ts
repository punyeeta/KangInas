import { create } from 'zustand';
import api from '../api/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../api/constants';
import { useFavoriteStore } from './StoreFavorites'; // Import the favorites store

interface AuthUser {
  id: number;
  username?: string;
  email: string;
  full_name?: string;
  phone_number?: string;
  profile_picture?: string;
  date_joined?: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_pescatarian: boolean;
  is_flexitarian: boolean;
  is_paleo: boolean;
  is_ketogenic: boolean;
  is_halal: boolean;
  is_kosher: boolean;
  is_fruitarian: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_organic: boolean;
}

interface AuthState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  hasCheckedAuth: boolean; // Flag to prevent repeated auth checks

  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  clearErrors: () => void;

  // Profile actions
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  updateProfilePicture: (file: File) => Promise<string | undefined>; // Modified to return URL
  updateDietaryPreferences: (data: Partial<DietaryPreferences>) => Promise<void>;
  refreshUserData: () => Promise<void>; // New function to refresh user data
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

interface DietaryPreferences {
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_pescatarian: boolean;
  is_flexitarian: boolean;
  is_paleo: boolean;
  is_ketogenic: boolean;
  is_halal: boolean;
  is_kosher: boolean;
  is_fruitarian: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_organic: boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,
  error: null,
  success: false,
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN),
  user: null,
  hasCheckedAuth: false, // Initialize to false

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/login/', { email, password });
      const { refresh, access, user } = response.data;

      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);

      // Update userId in favorite store
      const favoriteStore = useFavoriteStore.getState();
      favoriteStore.setUserId(user.id);

      set({ isAuthenticated: true, user, isLoading: false, hasCheckedAuth: true });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      set({ error: errorMessage, isLoading: false, hasCheckedAuth: true });
    }
  },

  register: async ({ username, email, password, full_name }) => {
    set({ isLoading: true, error: null, success: false });
    try {
      // Just register the user but don't auto-login
      await api.post('/register/', { username, email, password, full_name });
      
      // Don't set tokens or authenticate after registration
      set({ success: true, isLoading: false });
      
      // Return true to indicate successful registration
      return true;
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error.response?.data) {
        if (typeof error.response.data === 'object') {
          const firstError = Object.entries(error.response.data)[0];
          if (firstError) {
            const [field, messages] = firstError;
            const message = Array.isArray(messages) ? messages[0] : messages;
            errorMessage = `${field}: ${message}`;
          }
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      }
      set({ error: errorMessage, isLoading: false, success: false });
      return false;
    }
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        await api.post('/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      // Ignore errors during logout
    } finally {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      
      // Clear favorites when user logs out
      const favoriteStore = useFavoriteStore.getState();
      favoriteStore.clearFavorites();
      
      set({ isAuthenticated: false, user: null });
    }
  },

  clearErrors: () => {
    set({ error: null });
  },

  // Added new function to refresh user data from server
  refreshUserData: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      set({ isAuthenticated: false, hasCheckedAuth: true, user: null });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await api.get('/user/');
      console.log('Refreshed user data:', response.data);
      
      // Update userId in favorite store if user data changed
      if (response.data && response.data.id) {
        const favoriteStore = useFavoriteStore.getState();
        favoriteStore.setUserId(response.data.id);
      }
      
      set({ user: response.data, isLoading: false });
    } catch (error) {
      console.error('Error refreshing user data:', error);
      set({ isLoading: false });
    }
  },

  checkAuthStatus: async () => {
    // Don't check again if we already know we're not authenticated
    if (get().hasCheckedAuth) {
      return;
    }

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      set({ isAuthenticated: false, hasCheckedAuth: true, user: null });
      
      // Clear favorites store userId
      const favoriteStore = useFavoriteStore.getState();
      favoriteStore.setUserId(null);
      
      return;
    }

    set({ isLoading: true });
    try {
      const response = await api.get('/user/');
      console.log('Initial user data:', response.data);
      
      // Update userId in favorite store
      const favoriteStore = useFavoriteStore.getState();
      favoriteStore.setUserId(response.data.id);
      
      set({ user: response.data, isAuthenticated: true, isLoading: false, hasCheckedAuth: true });
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      
      // Clear favorites store userId
      const favoriteStore = useFavoriteStore.getState();
      favoriteStore.setUserId(null);
      
      set({ isAuthenticated: false, user: null, isLoading: false, hasCheckedAuth: true });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put('/profile/update/', data);
      set({ user: response.data, isLoading: false });
    } catch (error: any) {
      let errorMessage = 'Failed to update profile';
      if (error.response?.data) {
        if (typeof error.response.data === 'object') {
          const firstError = Object.entries(error.response.data)[0];
          if (firstError) {
            const [field, messages] = firstError;
            const message = Array.isArray(messages) ? messages[0] : messages;
            errorMessage = `${field}: ${message}`;
          }
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      }
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Modified to return the URL and added logging
  updateProfilePicture: async (file) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('profile_picture', file);
  
      console.log('Uploading profile picture...');
      
      const response = await api.put('/profile/picture/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log('Profile picture upload complete response:', response);
      console.log('Response data:', response.data);
      
      if (response.data) {
        // Try to extract the profile picture URL, handling different response formats
        const profilePicture = response.data.profile_picture || response.data.url || response.data;
        console.log('Extracted profile picture URL:', profilePicture);
        
        // Update the user object in the store
        set((state) => ({
          user: state.user ? { ...state.user, profile_picture: profilePicture } : null,
          isLoading: false,
        }));
        
        // Return the URL for external use if needed
        return profilePicture;
      } else {
        set({ error: "Failed to get profile picture URL", isLoading: false });
        return undefined;
      }
    } catch (error: any) { // Add type annotation here
      console.error('Error updating profile picture:', error);
      // Safely access error.response if it exists
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      // Safely create an error message
      const errorMessage = error.response?.data?.error || 
                           (error instanceof Error ? error.message : 'Failed to update profile picture');
      set({ error: errorMessage, isLoading: false });
      return undefined;
    }
  },

  updateDietaryPreferences: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put('/profile/dietary-preferences/', data);
      set({ user: response.data, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update dietary preferences';
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

export default useAuthStore;