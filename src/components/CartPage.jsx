import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "./CartCard";
import CartSummary from "./CartSummary";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => !!state.cart.token);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (!token) navigate("/login");   
  }, []);

 

  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item, quantity: item.quantity });
    }
    return acc;
  }, []);
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {groupedItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groupedItems.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
        </div>
      )}
      {groupedItems.length > 0 && <CartSummary />}
    </div>
  );
};

export default CartPage;
