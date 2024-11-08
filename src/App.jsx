import React from "react";
import {  Route, Routes } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";


const App = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
        <Navbar />
        <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
        <Footer />
        <Toaster toastOptions={{duration:700}}/>
      </div>
  );
};

export default App;
