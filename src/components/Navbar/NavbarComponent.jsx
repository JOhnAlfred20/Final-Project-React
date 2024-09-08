import { NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import useAuth from "../../hooks/use-auth";
import { Fragment, useState, useEffect } from "react";
import useWishlist from "../../hooks/use-wishlist";
import useCart from "../../hooks/use-cart";

const NavbarComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // إضافة حالة لتتبع حالة القائمة
  const { userData, handleLogout } = useAuth();
  const { getLoggedUserWishlist, wishlistCount } = useWishlist();
  const { getLoggedUserCart, numOfCartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getLoggedUserWishlist();
      getLoggedUserCart();
    }
  }, [getLoggedUserWishlist, getLoggedUserCart]);

  return (
    <nav className={`bg-emerald-500 dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600 ${isActive ? 'shadow-lg transition-shadow duration-300' : ''}`} style={{ height: '70px' }}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 h-full">
        {/* Logo and Brand Name */}
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse h-full">
          <img src={freshCartLogo} className="h-10 md:h-12" alt="Fresh Cart Logo" />
        </NavLink>

        {/* Toggle Button for Mobile */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // تعديل هنا لتبديل الحالة
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        {/* Navigation Links for Mobile */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full right-0 w-full bg-emerald-500 dark:bg-gray-900`} id="navbar-sticky">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  `block py-3 px-6 text-lg rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-600 text-white'
                      : 'text-white hover:bg-yellow-400 dark:text-gray-300 dark:hover:bg-yellow-500'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/brands" 
                className={({ isActive }) =>
                  `block py-3 px-6 text-lg rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-600 text-white'
                      : 'text-white hover:bg-yellow-400 dark:text-gray-300 dark:hover:bg-yellow-500'
                  }`
                }
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/categories" 
                className={({ isActive }) =>
                  `block py-3 px-6 text-lg rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-600 text-white'
                      : 'text-white hover:bg-yellow-400 dark:text-gray-300 dark:hover:bg-yellow-500'
                  }`
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) =>
                  `block py-3 px-6 text-lg rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-600 text-white'
                      : 'text-white hover:bg-yellow-400 dark:text-gray-300 dark:hover:bg-yellow-500'
                  }`
                }
              >
                All Products
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex items-center justify-between w-full h-full">
          <ul className="flex space-x-8 font-medium border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  `block py-3 px-6 text-lg rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-600 text-white'
                      : 'text-white hover:bg-yellow-400 dark:text-gray-300 dark:hover:bg-yellow-500'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/brands" 
                className={({ isActive }) =>
                  `block py-3 px-6 text-lg rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-600 text-white'
                      : 'text-white hover:bg-yellow-400 dark:text-gray-300 dark:hover:bg-yellow-500'
                  }`
                }
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/categories" 
                className={({ isActive }) =>
                  `block py-3 px-6 text-lg rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-600 text-white'
                      : 'text-white hover:bg-yellow-400 dark:text-gray-300 dark:hover:bg-yellow-500'
                  }`
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) =>
                  `block py-3 px-6 text-lg rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-600 text-white'
                      : 'text-white hover:bg-yellow-400 dark:text-gray-300 dark:hover:bg-yellow-500'
                  }`
                }
              >
                All Products
              </NavLink>
            </li>
          </ul>
        </div>

        {/* User and Action Links */}
        <div className="flex items-center space-x-4">
          {userData && localStorage.getItem("userToken") ? (
            <Fragment>
              <NavLink to="/cart" className="relative flex items-center text-gray-700 dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 transition-colors duration-300 px-3 py-2 rounded-md">
                <i className="fa-solid fa-cart-arrow-down text-emerald-600 text-2xl"></i>
                {numOfCartItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-md px-2 py-1 text-xs font-semibold">
                    {numOfCartItems}
                  </div>
                )}
              </NavLink>
              <NavLink to="/wishlist" className="relative flex items-center text-gray-700 dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 transition-colors duration-300 px-3 py-2 rounded-md">
                <i className="fa-solid fa-heart text-emerald-600 text-2xl"></i>
                {wishlistCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full px-2 py-1 text-xs font-semibold">
                    {wishlistCount}
                  </div>
                )}
              </NavLink>
              <NavLink to="/profile" className="flex items-center text-gray-700 dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 transition-colors duration-300 px-3 py-2 rounded-md">
                <i className="fa-solid fa-user mr-2 text-xl"></i> {userData?.name}
              </NavLink>
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-yellow-400 dark:bg-gray-600 dark:hover:bg-yellow-500 transition-colors duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink to="/login" className="text-white dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 transition-colors duration-300 px-3 py-2 rounded-md">Login</NavLink>
              <NavLink to="/register" className="text-white dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 transition-colors duration-300 px-3 py-2 rounded-md">Register</NavLink>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
