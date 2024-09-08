import React from 'react';
import useFetch from '../../hooks/use-fetch';
import Loading from '../Loading/Loading';
import CategoryItem from './CategoryItem';

const CATEGORIES_URL = '/categories';

const Categories = () => {
  const [categories, loading] = useFetch(CATEGORIES_URL);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Loading State */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-green-600 mb-4">Our Categories</h3>
            <p className="text-6xl text-gray-700">
            All Your Needs .
            </p>
          </div>
          
          {/* Categories List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.length ? (
              categories.map((category) => (
                <CategoryItem 
                  key={category._id} 
                  image={category.image} 
                  name={category.name} 
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No categories available at the moment.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
