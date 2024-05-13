import React from "react";

const Category = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="py-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          shop by category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/product1.jpeg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Nike Jodan
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/product3.jpeg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Nike Jodan 2024
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/product5.jpeg"
              alt="category 1"
              className="w-full"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
            >
              Jodan
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/product10.jpeg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              The Summer
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/product8.jpeg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Best Saler
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/product1.jpeg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Best is the time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
