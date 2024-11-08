import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountedAmount = totalAmount * (1 - discount / 100);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleApplyOrRemoveCoupon = () => {
    if (appliedCoupon) {
      setDiscount(0);
      setAppliedCoupon(null);
      setCouponCode("");
      toast("Coupon removed", {
        icon: "✂️",
      });
    } else {
      if (!couponCode) {
        toast.error("Please add a coupon code");
        return;
      }
      if (couponCode === "FIRST10") {
        setDiscount(10);
        setAppliedCoupon(couponCode);
        toast("Coupon applied", {
          icon: "🎉",
        });
      } else {
        setDiscount(0);
        toast.error("Invalid coupon code");
      }
    }
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    toast.success("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mt-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Cart Summary
      </h2>
      <div className="flex justify-between text-gray-900 dark:text-white">
        <span>Total Items:</span>
        <span>{cartItems.length}</span>
      </div>
      <div className="flex justify-between text-gray-900 dark:text-white mt-2">
        <span>Total Amount:</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-red-400 dark:text-red-300 mt-2">
        <span>Use coupon "FIRST10" for 10% discount</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-gray-900 dark:text-white mt-2">
          <span>Discount ({discount}%):</span>
          <span>₹{((totalAmount * discount) / 100).toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between text-gray-900 dark:text-white mt-2">
        <span>Amount After Discount:</span>
        <span>₹{discountedAmount.toFixed(2)}</span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="border border-gray-300 dark:border-gray-700 dark:text-black rounded-lg px-3 py-2 flex-1"
            disabled={!!appliedCoupon}
          />
          <button
            onClick={handleApplyOrRemoveCoupon}
            className={`${
              appliedCoupon
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white text-sm py-[0.6rem] px-4 rounded`}
          >
            {appliedCoupon ? "Remove" : "Apply"}
          </button>
        </div>
        {cartItems.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Checkout
            </button>
            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
