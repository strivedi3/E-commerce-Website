import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
