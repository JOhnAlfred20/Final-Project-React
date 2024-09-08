import React from 'react';

const CategoryItem = ({ image, name }) => {
  return (
    <div className="category-item border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-auto object-cover"
      />
      <div className="p-4">
        <h4 className="text-2xl text-center font-semibold text-gray-800">{name}</h4>
      </div>
    </div>
  );
};

export default CategoryItem;
