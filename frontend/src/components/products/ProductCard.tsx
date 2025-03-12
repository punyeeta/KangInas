import React, { useState,} from 'react';
import { Product } from '../../api/productApi';
import { useCartStore } from '../../store/CartStore';
import { useFavoriteStore } from '../../store/StoreFavorites';
import { ProductDetailModal} from './ProductDetailModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Using Zustand stores for cart and favorites management
  const { addItem, isLoading: isCartLoading } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  
  // Get favorite status directly from the store
  const isFav = isFavorite(product.id);
  
  // State for controlling the detail modal
  const [showDetails, setShowDetails] = useState(false);
  
  const handleAddToCart = () => {
    addItem(product.id);
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };
  
  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border transition-transform hover:shadow-lg hover:-translate-y-1">
        <div className="overflow-hidden rounded-2xl mt-4 ml-4 mr-4 flex items-center justify-center ">
          {product.image_url ? (
          <img
          src={product.image_url}
          alt={product.name}
          className="w-full aspect-[3/3] rounded-2xl object-cover"
        />
          ) : (
            <div className="w-full h-44 sm:h-52 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-base sm:text-lg break-words overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%-40px)]">
              {product.name}
            </h3>
            <button 
              onClick={handleToggleFavorite}
              className="ml-2 p-1 rounded-full hover:bg-gray-100"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isFav 
                    ? 'fill-red-500 stroke-red-500' 
                    : 'fill-none stroke-gray-500 hover:stroke-red-500'
                }`}
                strokeWidth="2"
              > 
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </button>
          </div>
          <p className="font-medium mb-3 text-sm sm:text-base break-words overflow-hidden text-ellipsis whitespace-nowrap">
            ₱{product.price}
          </p>
          <div className="flex space-x-2">
            <button 
              className={`flex-3 py-1.5 sm:py-2 rounded-4xl text-white text-xs sm:text-sm ${
                isCartLoading ? 'bg-blue-400' : 'bg-[#32347C] hover:bg-blue-950'
              }`}
              onClick={handleAddToCart}
              disabled={isCartLoading}
            >
              {isCartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            <button 
              className="flex-1 py-1.5 sm:py-2 rounded-4xl text-blue-900 text-xs sm:text-sm border border-blue-950 bg-white hover:bg-blue-950 hover:text-white"
              onClick={() => setShowDetails(true)}
            >
              View
            </button>
          </div>
        </div>
      </div>
      {showDetails && (
        <ProductDetailModal 
          product={product}
          onClose={() => setShowDetails(false)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
};