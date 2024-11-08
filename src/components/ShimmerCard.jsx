import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg mb-4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      <div className="flex space-x-2">
        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
