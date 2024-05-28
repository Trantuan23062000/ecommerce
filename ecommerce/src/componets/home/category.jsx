import React from "react";

const Category = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="py-16">
        <h2 className="text-3xl font-semibold text-gray-800 uppercase mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-105">
            <img
              src="/images/product1.jpeg"
              alt="category 1"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl text-white font-semibold group-hover:bg-opacity-70 transition">
              Nike Jordan
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-105">
            <img
              src="/images/product3.jpeg"
              alt="category 2"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl text-white font-semibold group-hover:bg-opacity-70 transition">
              Nike Jordan 2024
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-105">
            <img
              src="/images/product5.jpeg"
              alt="category 3"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl text-white font-semibold group-hover:bg-opacity-70 transition">
              Jordan
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-105">
            <img
              src="/images/product10.jpeg"
              alt="category 4"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl text-white font-semibold group-hover:bg-opacity-70 transition">
              The Summer
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-105">
            <img
              src="/images/product8.jpeg"
              alt="category 5"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl text-white font-semibold group-hover:bg-opacity-70 transition">
              Best Seller
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-105">
            <img
              src="/images/product1.jpeg"
              alt="category 6"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl text-white font-semibold group-hover:bg-opacity-70 transition">
              Best Time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
