import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <h3 className="text-lg font-semibold mb-2">Luxe</h3>
            <p>© 2024 Roch. All rights reserved.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <h4 className="text-lg font-semibold mb-2">Address</h4>
            <p>Outlet no. 95, Sarjapur</p>
            <p>Bangalore, Karnataka 562125</p>
          </div>
          <div className="w-full md:w-1/3 text-center">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p>Email: info@roch.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
