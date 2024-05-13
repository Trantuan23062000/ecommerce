import React, { useEffect} from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrand,fetchSize,fetchColor

  
} from "../../redux/slices/filterReducer"



const ShowFilter = (props) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.filter.brands)||[];
  const sizes = useSelector((state) => state.filter.sizes)||[];
  const colors = useSelector((state) => state.filter.colors)||[];
 
  useEffect(()=>{
    dispatch(fetchBrand())
    dispatch(fetchSize())
    dispatch(fetchColor())  
    // eslint-disable-next-line
  },[dispatch])
  return (
    <div className="top-0 left-0 right-0 z-50 flex justify-center items-center">
      <div className="bg-gray-900 bg-opacity-50 absolute"></div>
      <div className="bg-white rounded-b-lg shadow-lg p-6 w-full max-w-md">
        <div className="divide-y  divide-gray-200 space-y-5">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 uppercase">
              Categories
            </h3>
            <div className="flex space-x-4 items-center">
              <div className="flex">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                </div>
                <label className="text-gray-600 ml-3 cusror-pointer">Men</label>
              </div>
              <div className="flex">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                </div>
                <label className="text-gray-600 ml-3 cusror-pointer">
                  Wonman
                </label>
              </div>
              <div className="flex">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                </div>
                <label className="text-gray-600 ml-3 cusror-pointer">Men & Wonmen</label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 font-bold uppercase">
              Brand
            </h3>{" "}
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-xs sm:max-w-md md:max-w-lg"
              defaultValue="Choose a Brand"
            >
              <option
                disabled
                value="Choose a Brand"
                className="text-lg font-bold"
              >
                Choose a Brand
              </option>
              {React.Children.toArray(brands.map((item)=>(
                  <option value={item.id}>{item.name}</option>
              )))}
             
            </select>
          </div>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-bold">
              Price
            </h3>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                name="min"
                id="min"
                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                placeholder="min"
              />
              <span className="mx-3 text-gray-500">-</span>
              <input
                type="text"
                name="max"
                id="max"
                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                placeholder="max"
              />
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-bold">
              size
            </h3>
            <div className="flex space-x-4 items-center">
              {React.Children.toArray(sizes.map((item)=>(
                  <div className="flex">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    />
                  </div>
                  <label className="text-gray-600 ml-3 cusror-pointer">{item.size.substring(2)}</label>
                </div>
              )))}
             
            </div>
          </div>

          <div className="pt-4 hover:bg-gray-300">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-bold">
              Color
            </h3>
            <div className="flex items-center gap-2">
              {React.Children.toArray(colors.map((item)=>(
                   <div className="color-selector">
                   <input type="radio" name="color" id="red" className="hidden" />
                   <label
                     htmlFor="red"
                     className="border border-gray-200 rounded-full h-6 w-6  cursor-pointer shadow-sm block"
                     style={{ backgroundColor: `${item.codeColor}` }}
                   ></label>
                 </div>
              )))}
             
            </div>
          </div>
        </div>
        <div className="border-b pt-4 border-gray-300"></div>
        <button
          onClick={props.close}
          className="text-white bg-black hover:bg-gray-200 hover:text-gray-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mt-6"
        >
          <CgClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default ShowFilter;
