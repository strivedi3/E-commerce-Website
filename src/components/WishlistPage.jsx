import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);

  const token = useSelector((state) => !!state.cart.token);
  
  useEffect(() => {
    if (!token) navigate("/login");
    
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
