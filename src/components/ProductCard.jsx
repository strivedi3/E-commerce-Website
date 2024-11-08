import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  addToWishlist,
  removeFromWishlist,
} from "../slices/cartSlice";
import toast from "react-hot-toast";


import { ShoppingCart, FaHeart, Star, Heart, FaStar } from "../utilities/icons";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);
  const isLiked = wishlist.some((item) => item.id === product.id);
  const discountedPrice = (product.price * (1 - product.discount)).toFixed(2);
  const handleHeartClick = () => {
    if (isLiked) {
      dispatch(removeFromWishlist(product.id));
      toast("Removed from Wishlist!");
    } else {
      dispatch(addToWishlist(product));
      toast("Added to Wishlist!",{
        icon:'😍'
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, price: discountedPrice, quantity: 1 }));
    toast.success("Added to Cart!");
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white min-h-[55px]">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          <span className="line-through text-sm">₹{product.price}</span>
          <span className="text-red-600 dark:text-red-400 font-bold ml-2">
            ₹{discountedPrice}
          </span>
        </p>
        <div className="flex items-center mt-2">
          <span className="text-gray-600 dark:text-gray-300 font-bold">
            {product.rating}
          </span>
          <FaStar className="h-5 w-5 text-yellow-500 ml-1" />
        </div>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            <ShoppingCart />
          </button>
          <button
            onClick={handleHeartClick}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded"
          >
            <FaHeart size={20} color={isLiked ? "red" : "#383535"} />
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
