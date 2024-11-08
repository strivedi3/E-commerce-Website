import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "./../utilities/icons";
import DarkModeToggler from "./DarkModeToggler";
import { addToken } from "../slices/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => !!state.cart.token);
  const navigate = useNavigate();
  const cartItemCount = useSelector((state) => state.cart.items.length);

  const handleLogout = () => {
    dispatch(addToken(""));
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-2 px-4 flex items-center justify-between">
      <div className="flex flex-col items-center md:items-start">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          ROCH
        </Link>
        <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Refined Luxury
        </span>
      </div>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/cart"
              className="relative flex items-center p-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            </Link>
            <Link
              to="/wishlist"
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <DarkModeToggler />
            <button
              onClick={handleLogout}
              className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded transition"
            >
              Log out
            </button>
          </>
        ) : (
          <div className="p-2" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
