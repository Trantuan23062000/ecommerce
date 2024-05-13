import React from "react";
import { CgHeart, CgSearch, CgShoppingCart } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import {Link} from "react-router-dom"

const Product = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          recomended for you
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative group">
              <img
                src="/images/product8.jpeg"
                alt="product 1"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgShoppingCart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgHeart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <Link to="/product"><CgSearch /></Link> 
                </div>
              </div>
            </div>

            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Nike jodan 2024
                </h4>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">$45.00</p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative group">
              <img
                src="/images/product10.jpeg"
                alt="product 1"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgShoppingCart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgHeart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                <Link to="/product"><CgSearch /></Link> 
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Nike Air 
                </h4>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">$45.00</p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative group">
              <img
                 src="/images/product11.jpeg"
                alt="product 1"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgShoppingCart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgHeart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                <Link to="/product"><CgSearch /></Link> 
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                 Nike limit Red summer 2024
                </h4>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">$45.00</p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative group">
              <img
               src="/images/product12.jpg"
                alt="product 1"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgShoppingCart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgHeart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                <Link to="/product"><CgSearch /></Link> 
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Nike custom blue
                </h4>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">$45.00</p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                   <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative group">
              <img
                src="/images/product1.jpeg"
                alt="product 1"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgShoppingCart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgHeart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                <Link to="/product"><CgSearch /></Link> 
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                 Nike Air 1
                </h4>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">$45.00</p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative group">
              <img
                src="/images/product2.jpeg"
                alt="product 1"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgShoppingCart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgHeart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                <Link to="/product"><CgSearch /></Link> 
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                 Nike jodan basic
                </h4>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">$45.00</p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative group">
              <img
                src="/images/product3.jpeg"
                alt="product 1"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgShoppingCart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgHeart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                <Link to="/product"><CgSearch /></Link> 
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Nike jodan 2023
                </h4>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">$45.00</p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative group">
              <img
                src="/images/product5.jpeg"
                alt="product 1"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgShoppingCart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <CgHeart />
                </div>
                <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                <Link to="/product"><CgSearch /></Link> 
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                 Nike limit
                </h4>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">$45.00</p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                  <span>
                  <FaStar/>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
