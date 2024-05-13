import React from "react";
import { FaAngleUp, FaSearch } from "react-icons/fa";

const SearchShop = (props) => {
  return (
    <div className="bg-gray-100">
      <div className=" p-2 bg-gray-100 rounded-lg">
       
        <form className="flex text-center justify-center">
          <input
            type="text"
            placeholder="Enter your search term..."
            className=" w-96 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none"
          />
          <button className="bg-black p-3 rounded-r-md text-white">
            <FaSearch/>
          </button>
        </form>
      </div>
      <div className="text-center bg-gray-100">
      <button onClick={props.close} className="text-black rounded-full"><FaAngleUp size={24}/></button>
      </div>
     
    </div>
  );
};

export default SearchShop;
