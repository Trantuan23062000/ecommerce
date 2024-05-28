import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrand,
  fetchColor,
  fetchSize,
} from "../../redux/slices/filterReducer";
import { fetchFilterData } from "../../redux/slices/ productSlice";
import CategoryCheckbox from "./CategoryCheckbox";
import BrandCheckbox from "./BrandCheckbox";
import PriceFilter from "./PriceFilter";

const Filter = () => {
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
  const [isCleared, setIsCleared] = useState(true);

  useEffect(() => {
    dispatch(fetchBrand());
    dispatch(fetchColor());
    dispatch(fetchSize());
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

    if (
      !selectedSizeId &&
      !selectedColorId &&
      !selectedCategory &&
      !selectedBrandId &&
      !selectedMinPrice &&
      !selectedMaxPrice
    ) {
      setIsCleared(true);
    } else {
      setIsCleared(false);
      dispatch(fetchFilterData(filterData));
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
    setIsCleared(true);
    dispatch(fetchFilterData({}));
  };

  return (
    <div className="filter-container">
      <div className="text-center">
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
          <div className="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
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
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
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
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
                {brands.map((item) => (
                  <BrandCheckbox
                    key={item.id}
                    id={item.id}
                    label={item.name}
                    checked={selectedBrandId === item.id || false}
                    onChange={() => handleChangeBrand(item.id)}
                  />
                ))}
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Sizes
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-5 gap-2 justify-center items-center">
                {sizes.map((item) => (
                  <div key={item.id} className="size-selector">
                    <input
                      type="checkbox"
                      id={`size-${item.id}`}
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer sr-only"
                      checked={selectedSizeId === item.id || false}
                      onChange={() => handleChangeSize(item.id)}
                    />
                    <label
                      htmlFor={`size-${item.id}`}
                      className="text-sm border border-gray-200 rounded-sm flex items-center justify-center cursor-pointer shadow-sm text-gray-600 h-10 w-10"
                    >
                      {item.size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Colors
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-5 gap-2 justify-center items-center">
                {colors.map((item) => (
                  <div key={item.id} className="color-selector">
                    <input
                      type="checkbox"
                      id={`color-${item.id}`}
                      className="text-blue-500 focus:ring-0 rounded-sm cursor-pointer sr-only"
                      checked={selectedColorId === item.id || false}
                      onChange={() => handleChangeColor(item.id)}
                    />
                    <label
                      htmlFor={`color-${item.id}`}
                      className="border border-gray-200 rounded-full h-6 w-6 cursor-pointer block"
                      style={{ backgroundColor: `${item.codeColor}` }}
                    ></label>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={isCleared ? handleFilter : handleClear}
              className="w-full bg-black h-10 font-bold text-yellow-300 hover:text-red-500 rounded-xl hover:bg-gray-500 mt-4"
            >
              {isCleared ? (
                <span className="text-yellow-500 font-semibold">Apply Filters</span>
              ) : (
                <span className="text-red-500 font-semibold">Clear Filters</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
