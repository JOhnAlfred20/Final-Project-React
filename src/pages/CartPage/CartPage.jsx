import React, { useEffect } from "react";
import greenShoppingCart from "../../assets/images/green-shopping-cart.png";
import CartProducts from "../../components/CartProducts/CartProducts";
import useCart from "../../hooks/use-cart";
import useAuth from "../../hooks/use-auth";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    getLoggedUserCart,
    numOfCartItems,
    totalCartPrice,
    cartProducts,
    clearUserCart,
  } = useCart();

  const { userData } = useAuth();

  useEffect(() => {
    if (getLoggedUserCart) {
      getLoggedUserCart();
    }
  }, [getLoggedUserCart]);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto px-4 py-8">
          <h3 className="text-center text-4xl font-extrabold text-gray-900 mt-12 mb-8">
            Welcome, {userData?.name} <span className="text-green-500">to your Cart</span>
            <i className="fa-solid fa-cart-arrow-down text-green-500 ml-2"></i>
          </h3>

          {cartProducts.length > 0 ? (
            <>
              <div className="bg-white shadow-lg rounded-lg p-6 mb-16">
                <div className="flex flex-col md:flex-row md:items-center">
                  <img
                    src={greenShoppingCart}
                    alt="Green shopping cart"
                    className="w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0 rounded-lg shadow-md"
                  />
                  <div className="md:ml-8 flex flex-col space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
                    <div className="text-gray-700">
                      <h5 className="text-lg">
                        Products:{" "}
                        <span className="text-green-600 font-bold">{numOfCartItems} items</span>
                      </h5>
                      <h5 className="text-lg">
                        Total Price:{" "}
                        <span className="text-green-600 font-bold">{totalCartPrice} EGP</span>
                      </h5>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <Link to="/payment">
                        <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                          Proceed to Checkout
                        </button>
                      </Link>
                      <button
                        className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                        onClick={() => {
                          clearUserCart();
                        }}
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <CartProducts
                  cartProducts={cartProducts}
                  getLoggedUserCart={getLoggedUserCart}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-xl text-gray-600 mt-12">
              Your cart is empty. Start shopping now!
            </div>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-t-lg h-20 flex items-center justify-between px-6 fixed bottom-0 left-0 w-full">
          <div className="flex flex-col">
            <h5 className="text-gray-700">
              Products:{" "}
              <span className="text-green-600 font-bold">{numOfCartItems} items</span>
            </h5>
            <h5 className="text-gray-700">
              Total Price:{" "}
              <span className="text-green-600 font-bold">{totalCartPrice} EGP</span>
            </h5>
          </div>
          <div className="flex space-x-4">
            <Link to="/payment">
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                Checkout
              </button>
            </Link>
            {cartProducts.length > 0 && (
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                onClick={() => {
                  clearUserCart();
                }}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
