import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilterData,
  fetchBrand,
  fetchColor,
  fetchSize,
} from "../../redux/slices/filterReducer";

import CategoryCheckbox from "./CategoryCheckbox";
import BrandCheckbox from "./BrandCheckbox";
import PriceFilter from "./PriceFilter";

const Filter = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.filter.brands) || [];
  const sizes = useSelector((state) => state.filter.sizes) || [];
  const colors = useSelector((state) => state.filter.colors) || [];
  const [selectedBrandId, setSelectedBrandId] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);

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

    // Thêm sizeId vào filterData nếu selectedSizeId có giá trị
    if (selectedSizeId) {
      filterData.sizeId = selectedSizeId;
    }

    // Thêm colorId vào filterData nếu selectedColorId có giá trị
    if (selectedColorId) {
      filterData.colorId = selectedColorId;
    }

    // Thêm category vào filterData nếu selectedCategory có giá trị
    if (selectedCategory) {
      filterData.category = selectedCategory;
    }

    if (selectedBrandId) {
      filterData.brandId = selectedBrandId;
    }

    // Thêm price vào filterData nếu selectedMinPrice và selectedMaxPrice có giá trị
    if (selectedMinPrice && selectedMaxPrice) {
      filterData.minPrice = selectedMinPrice;
      filterData.maxPrice = selectedMaxPrice;
    }

    dispatch(fetchFilterData(filterData));
  };

  const handleChangeBrand = (id) => {
    //console.log("Selected Brand ID:", id);
    setSelectedBrandId(id);
    handleFilter(); // Gọi hàm handleFilter khi brand thay đổi
  };

  const handleChangeSize = (id) => {
    //log("Selected Size ID:", id);
    setSelectedSizeId(id);
    handleFilter(); // Gọi hàm handleFilter khi size thay đổi
  };

  const handleChangeColor = (id) => {
    //console.log("Selected Color ID:", id);
    setSelectedColorId(id);
    handleFilter(); // Gọi hàm handleFilter khi color thay đổi
  };

  const handleChangeCategory = (category) => {
    //console.log("Selected Category:", category);
    setSelectedCategory(category);
    handleFilter(); // Gọi hàm handleFilter khi category thay đổi
  };

  const handleChangePrice = (minPrice, maxPrice) => {
    //console.log("Selected price:", minPrice, maxPrice);
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
    handleFilter(); // Gọi hàm handleFilter khi giá cả thay đổi
  };

  const handleClear = () => {
    setSelectedBrandId(null);
    setSelectedSizeId(null);
    setSelectedColorId(null);
    setSelectedCategory(null);
    setSelectedMinPrice(null);
    setSelectedMaxPrice(null);
    handleFilter(); // Gọi hàm handleFilter khi xóa bộ lọc
  };

  return (
    <div>
      <div className="text-center">
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
          <div className="divide-y divide-gray-200 space-y-5">
            {/* Categories */}
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                {/* Category checkboxes */}
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
                {/* Category checkboxes */}
                <PriceFilter
                  id="<100"
                  label="0-99$"
                  checked={
                    selectedMinPrice === "0" && selectedMaxPrice === "99"
                  }
                  onChange={() => handleChangePrice("0", "99")}
                />
                <PriceFilter
                  id="99-299"
                  label="99-299$"
                  checked={
                    selectedMinPrice === "99" && selectedMaxPrice === "299"
                  }
                  onChange={() => handleChangePrice("99", "299")}
                />
                <PriceFilter
                  id="299-499"
                  label="299-499$"
                  checked={
                    selectedMinPrice === "299" && selectedMaxPrice === "499"
                  }
                  onChange={() => handleChangePrice("299", "499")}
                />
                <PriceFilter
                  id="500-900"
                  label="499-899$"
                  checked={
                    selectedMinPrice === "499" && selectedMaxPrice === "899"
                  }
                  onChange={() => handleChangePrice("499", "899")}
                />
                <PriceFilter
                  id="899-1099"
                  label="899-1099$"
                  checked={
                    selectedMinPrice === "899" && selectedMaxPrice === "1099"
                  }
                  onChange={() => handleChangePrice("899", "1099")}
                />
              </div>
            </div>

            {/* Brands */}
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
                {/* Brand checkboxes */}
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

            {/* Sizes */}
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Sizes
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-5 gap-2 justify-center items-center">
                {/* Size selectors */}
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

            {/* Colors */}
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Colors
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-5 gap-2 justify-center items-center">
                {/* Color selectors */}
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
              onClick={handleClear}
              className="w-full bg-black h-6 font-bold text-yellow-300 hover:text-red-500 rounded-xl hover:bg-yelow-500"
            >
              {" "}
              Clear filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
