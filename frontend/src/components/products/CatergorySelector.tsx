import React from 'react';
import { CategoryOption } from '../../api/productApi';
import image1 from '../../assets/categories/category1.png';
import image2 from '../../assets/categories/category2.png';
import image3 from '../../assets/categories/category3.png';     
import image4 from '../../assets/categories/category4.png';
import image5 from '../../assets/categories/category5.png';

interface CategorySelectorProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  isLoading: boolean;
  isError: boolean;
}

// Category-to-image and style mapping
const categoryStyles: Record<string, { image: string; bgColor: string; textColor: string }> = {
  ALL: { image: image1, bgColor: 'bg-white', textColor: 'text-black' },
  AGAHAN: { image: image2, bgColor: 'bg-white', textColor: 'text-black' },
  TANGHALIAN: { image: image3, bgColor: 'bg-white', textColor: 'text-black' },
  HAPUNAN: { image: image4, bgColor: 'bg-white', textColor: 'text-black' },
  MERIENDA: { image: image5, bgColor: 'bg-white', textColor: 'text-black' }
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  isLoading,
  isError
}) => {
  if (isLoading) {
    return (
      <div className="mb-6 flex justify-center gap-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 w-20 md:h-40 md:w-40 rounded-lg bg-gray-200 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="mb-6 text-red-500">Failed to load categories</div>;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-start md:justify-center gap-3 overflow-x-auto py-2 px-4 md:px-0">
        {categories.map((category) => {
          const style = categoryStyles[category.value.toUpperCase()] || {
            image: '/images/default.jpg',
            bgColor: 'bg-white',
            textColor: 'text-black'
          };

          const subtitle = 
            category.value.toLowerCase() === 'all' ? '18 items' : 
            category.value.toLowerCase() === 'agahan' ? '5 items' :
            category.value.toLowerCase() === 'tanghalian' ? '4 items' :
            category.value.toLowerCase() === 'hapunan' ? '4 items' :
            category.value.toLowerCase() === 'merienda' ? '5 items' : '';

          return (
            <button
              key={category.value}
              onClick={() => onCategorySelect(category.value)}
              className={`flex flex-col flex-shrink-0
                ${selectedCategory === category.value ? 'ring-2 md:ring-1 ring-black' : ''}
                md:items-start md:p-4 md:w-32 md:h-32 md:rounded-lg md:shadow-lg md:border md:border-gray-200 md:transition-all
                items-center p-2 w-20 h-24 rounded-lg shadow-lg border border-gray-200 transition-all
                ${style.bgColor} ${style.textColor}`}
            >
              <img
                src={style.image}
                alt={category.label}
                className="w-10 h-10 md:w-13 md:h-13 object-contain mb-2"
              />
              {/* Mobile view - just category name */}
              <div className="block md:hidden text-center w-full">
                <div className="text-xs font-medium truncate">{category.label}</div>
              </div>
              {/* Desktop view - original layout */}
              <div className="hidden md:block w-full text-left">
                <div className="text-sm font-medium">{category.label}</div>
                <div className="text-xs text-gray-500">{subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};