import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrand, fetchSize, fetchColor } from "../../redux/slices/filterReducer";
import PriceFilter from "./PriceFilter";
import CategoryCheckbox from "./CategoryCheckbox";

const ShowFilter = (props) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.filter.brands) || [];
  const sizes = useSelector((state) => state.filter.sizes) || [];
  const colors = useSelector((state) => state.filter.colors) || [];
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);

  useEffect(() => {
    dispatch(fetchBrand());
    dispatch(fetchSize());
    dispatch(fetchColor());
  }, [dispatch]);

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line
  }, [
    selectedBrandId,
    selectedSizeId,
    selectedColorId,
    selectedCategory,
    selectedMinPrice,
    selectedMaxPrice,
  ]);

  const handleFilter = () => {
    const filterData = {};

    if (selectedSizeId) {
      filterData.sizeId = selectedSizeId;
    }

    if (selectedColorId) {
      filterData.colorId = selectedColorId;
    }

    if (selectedCategory) {
      filterData.category = selectedCategory;
    }

    if (selectedBrandId) {
      filterData.brandId = selectedBrandId;
    }

    if (selectedMinPrice && selectedMaxPrice) {
      filterData.minPrice = selectedMinPrice;
      filterData.maxPrice = selectedMaxPrice;
    }

  };

  const handleChangeBrand = (id) => {
    setSelectedBrandId(id);
  };

  const handleChangeSize = (id) => {
    setSelectedSizeId(id);
  };

  const handleChangeColor = (id) => {
    setSelectedColorId(id);
  };

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleChangePrice = (minPrice, maxPrice) => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
  };

  const handleClear = () => {
    setSelectedBrandId(null);
    setSelectedSizeId(null);
    setSelectedColorId(null);
    setSelectedCategory(null);
    setSelectedMinPrice(null);
    setSelectedMaxPrice(null);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800 uppercase">Filter</h3>
          <button onClick={props.close} className="text-gray-800 hover:text-red-500 transition">
            <CgClose size={24} />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-medium text-gray-700 uppercase mb-3">Categories</h4>
            <div className="space-y-2">
              <CategoryCheckbox
                id="Male"
                label="Male"
                checked={selectedCategory === "Male"}
                onChange={() => handleChangeCategory("Male")}
              />
              <CategoryCheckbox
                id="Female"
                label="Female"
                checked={selectedCategory === "Female"}
                onChange={() => handleChangeCategory("Female")}
              />
              <CategoryCheckbox
                id="All"
                label="Both men and women"
                checked={selectedCategory === "All"}
                onChange={() => handleChangeCategory("All")}
              />
            </div>
          </div>

          <div>
            <h4 className="text-xl font-medium text-gray-700 uppercase mb-3">Price</h4>
            <div className="space-y-2">
              <PriceFilter
                id="<100"
                label="0-99$"
                checked={selectedMinPrice === "0" && selectedMaxPrice === "99"}
                onChange={() => handleChangePrice("0", "99")}
              />
              <PriceFilter
                id="99-299"
                label="99-299$"
                checked={selectedMinPrice === "99" && selectedMaxPrice === "299"}
                onChange={() => handleChangePrice("99", "299")}
              />
              <PriceFilter
                id="299-499"
                label="299-499$"
                checked={selectedMinPrice === "299" && selectedMaxPrice === "499"}
                onChange={() => handleChangePrice("299", "499")}
              />
              <PriceFilter
                id="500-900"
                label="499-899$"
                checked={selectedMinPrice === "499" && selectedMaxPrice === "899"}
                onChange={() => handleChangePrice("499", "899")}
              />
              <PriceFilter
                id="899-1099"
                label="899-1099$"
                checked={selectedMinPrice === "899" && selectedMaxPrice === "1099"}
                onChange={() => handleChangePrice("899", "1099")}
              />
            </div>
          </div>

          <div>
            <h4 className="text-xl font-medium text-gray-700 uppercase mb-3">Brand</h4>
            <select
              className="w-full mt-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
              value={selectedBrandId || "Choose a Brand"}
              onChange={(e) => handleChangeBrand(e.target.value)}
            >
              <option disabled value="Choose a Brand">
                Choose a Brand
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h4 className="text-xl font-medium text-gray-700 uppercase mb-3">Size</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size) => (
                <label key={size.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`size-${size.id}`}
                    className="hidden"
                    checked={selectedSizeId === size.id}
                    onChange={() => handleChangeSize(size.id)}
                  />
                  <label
                    htmlFor={`size-${size.id}`}
                    className={`text-sm border border-gray-200 rounded-sm flex items-center justify-center cursor-pointer shadow-sm text-gray-600 h-10 w-10 ${
                      selectedSizeId === size.id ? "bg-gray-300" : ""
                    }`}
                  >
                    {size.size}
                  </label>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-medium text-gray-700 uppercase mb-3">Color</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {colors.map((color) => (
                <label key={color.id} className="color-selector relative">
                  <input
                    type="radio"
                    name="color"
                    id={color.id}
                    className="hidden"
                    checked={selectedColorId === color.id}
                    onChange={() => handleChangeColor(color.id)}
                  />
                  <span
                    className={`block w-6 h-6 border border-gray-300 rounded-full cursor-pointer ${
                      selectedColorId === color.id ? "border-black" : ""
                    }`}
                    style={{ backgroundColor: `${color.codeColor}` }}
                  ></span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleClear}
            className="text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
          >
            Clear
          </button>
          <button
            onClick={props.close}
            className="text-white bg-black rounded-lg px-4 py-2 hover:bg-gray-800 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowFilter;
