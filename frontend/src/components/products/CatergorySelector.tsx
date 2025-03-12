import React from 'react';
import { CategoryOption } from '../../api/productApi';

interface CategorySelectorProps {
    categories: CategoryOption[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
    isLoading: boolean;
    isError: boolean;
  }
  
  export const CategorySelector: React.FC<CategorySelectorProps> = ({ 
    categories, 
    selectedCategory, 
    onCategorySelect, 
    isLoading, 
    isError 
  }) => {
    if (isLoading) {
      return <div className="mb-6 flex gap-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-10 w-24 rounded-full bg-gray-200 animate-pulse"></div>
        ))}
      </div>;
    }
  
    if (isError) {
      return <div className="mb-6 text-red-500">Failed to load categories</div>;
    }
  
    return (
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategorySelect(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                ${selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    );
  };