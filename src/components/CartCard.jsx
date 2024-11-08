import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, adjustQuantity } from "../slices/cartSlice";
import { Trash2 } from "../utilities/icons";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();
    // console.log(item);
    
  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  const handleQuantityChange = (change) => {
    console.log('Current Quantity:', item.quantity);
    if (item.quantity + change > 0) {
      dispatch(adjustQuantity({ id: item.id, change }));
    }
  };

  return (
    <div className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg ">
      <img
        className="w-20 h-20 object-contain rounded-lg"
        src={item.image}
        alt={item.name}
      />
      <div className="ml-4 flex-1 text-left">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {item.name}
        </h2>
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            -
          </button>
          <span className="px-4 text-gray-900 dark:text-gray-100">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="ml-4 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
      >
        <Trash2 size={24} />
      </button>
    </div>
  );
};

export default CartCard;
