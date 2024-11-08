import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ShimmerCard from "./ShimmerCard";
import { products as allProducts } from "../utilities/products";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setWishlist } from "../slices/cartSlice";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => !!state.cart.token);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [userName, setUserName] = useState("");
  const productsPerPage = 12;

  useEffect(() => {
    if (!token) navigate("/login");
    const user = auth.currentUser;
    
    
    const fetchUserName = () => {
      if (user) {
        setUserName(user.email.substring(0,user.email.indexOf("@")) || "");
      }
      setTimeout(()=>{
        setUserName("")
      },5000)
      
    };

    const fetchCartFromFirestore = async () => {
      if (user) {
        const cartDocRef = doc(db, "carts", user.uid);
        const cartSnapshot = await getDoc(cartDocRef);
        if (cartSnapshot.exists()) {
          dispatch(setCart(cartSnapshot.data()?.items || []));
        } else {
          dispatch(setCart([]));
        }
      }
    };

    const fetchWishlistFromFirestore = async () => {
      if (user) {
        const wishlistDocRef = doc(db, "wishlists", user.uid);
        const wishlistSnapshot = await getDoc(wishlistDocRef);
        if (wishlistSnapshot.exists()) {
          dispatch(setWishlist(wishlistSnapshot.data()?.wishlist || []));
        } else {
          dispatch(setWishlist([]));
        }
      }
    };

    fetchUserName();
    fetchWishlistFromFirestore();
    fetchCartFromFirestore();

    setTimeout(() => {
      setProducts(allProducts.slice(0, productsPerPage));
      setLoading(false);
    }, 1000);
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newProducts = allProducts.slice(
        currentPage * productsPerPage,
        nextPage * productsPerPage
      );

      if (newProducts.length === 0) {
        setHasMore(false);
      }

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setCurrentPage(nextPage);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4">
      {userName && (
        <div className="mb-4 text-center text-2xl font-semibold">
          Welcome, {userName}! Happy Shopping!
        </div>
      )}

      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ShimmerCard key={`loader-${currentPage}-${index}`} />
            ))}
          </div>
        }
        endMessage={
          <p className="text-center font-bold">You have reached the end!</p>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ShimmerCard key={`shimmer-${index}`} />
              ))
            : products.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
