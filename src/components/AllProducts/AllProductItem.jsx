import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useWishlist from '../../hooks/use-wishlist';

const AllProductItem = ({
  id,
  imageCover,
  price,
  ratingsAverage,
  title,
  category: { name },
  product,
}) => {
  const { wishlistProducts, handleAddOrRemoveWishlist, getLoggedUserWishlist } = useWishlist();

  const isInWishlist = wishlistProducts.some(product => product.id === id);
  const userToken = localStorage.getItem('userToken');
  const wishlistData = JSON.parse(localStorage.getItem('wishlistDataIds'));

  const toggleWishlist = () => {
    handleAddOrRemoveWishlist(isInWishlist, id);
    getLoggedUserWishlist();
  };

  return (
    <div className="lg:w-1/4 md:w-1/2 sm:w-full p-4">
      <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
        <button
          className="absolute top-4 right-4 bg-white p-2 rounded-full border border-gray-300"
          onClick={toggleWishlist}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <i className={`fa${isInWishlist && userToken && wishlistData ? 's' : 'r'} fa-heart text-xl ${isInWishlist ? 'text-red-500' : 'text-gray-600'}`}></i>
        </button>
        <img
          src={imageCover}
          alt={title}
          className="w-full h-80 object-cover"
        />
        <div className="p-4">
          <h5 className="text-lg font-semibold text-green-600 mb-1">{title}</h5>
          <h6 className="text-md text-gray-700 mb-3">{name}</h6>
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-800">
              {product?.priceAfterDiscount ? (
                <Fragment>
                  <span className="line-through text-red-500">{price} EGP</span>
                  <span className="font-bold text-green-600 ml-2">{product.priceAfterDiscount} EGP</span>
                </Fragment>
              ) : (
                <span>{price} EGP</span>
              )}
            </div>
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              <span className="text-gray-600">{ratingsAverage}</span>
            </div>
          </div>
          <Link to={`/productDetails/${id}`}>
            <button className="bg-green-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Show More about this Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllProductItem;
