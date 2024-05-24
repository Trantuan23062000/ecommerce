import React, { useEffect, useState } from "react";
import {
  getProduct,
  getImageDetail,
  CreateProductDetails,
  GetSize,
  GetColor,
} from "../../api/productDetails";
import toast from "react-hot-toast";
import Select from "react-select";

const CreateDetails = (props) => {
  const [dataPro, setDataPro] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    colorId: "",
    sizeId: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchProduct = async () => {
    try {
      const response = await getProduct();
      setDataPro(response.data.product);
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Failed to fetch product data!");
    }
  };

  const fetchSize = async () => {
    try {
      const response = await GetSize();
      setSize(response.data.size);
    } catch (error) {
      console.error("Error fetching size data:", error);
      toast.error("Failed to fetch size data!");
    }
  };

  const fetchColor = async () => {
    try {
      const response = await GetColor();
      setColor(response.data.color);
    } catch (error) {
      console.error("Error fetching size data:", error);
      toast.error("Failed to fetch size data!");
    }
  };

  const handleChange = async (selectedOption) => {
    if (selectedOption) {
      setSelectedProduct(selectedOption);
      const selectedProductData = dataPro.find(
        (product) => product.id === selectedOption.value
      );
      const imageId = selectedProductData?.imageId;
      try {
        const imageDetailResponse = await getImageDetail(imageId);
        const imageURLs = imageDetailResponse.data.image.URL;
        setImageUrls(imageURLs);
      } catch (error) {
        console.error("Error fetching image details:", error);
        toast.error("Failed to fetch image details!");
      }
    }
  };
  const handleChangeSize = async (selectedSizeOption) => {
    if (selectedSizeOption) {
      setSelectedSize(selectedSizeOption);
      size.find((item) => item.id === selectedSizeOption.value);
    }
  };

  const handleChangeColor = async (selectedColorOption) => {
    if (selectedColorOption) {
      setSelectedColor(selectedColorOption);
      size.find((item) => item.id === selectedColorOption.value);
    }
  };

  const options = dataPro.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const optionsSize = size.map((item) => ({
    value: item.id,
    label: item.size,
  }));

  const optionsColor = color.map((item) => ({
    value: item.id,
    label: item.color,
  }));

  const handleSubmit = async () => {
    try {
      if (!selectedProduct) {
        toast.error("Please select a product.");
        return;
      }

      const data = {
        productId: selectedProduct.value,
        productvariants: [
          {
            colorId: selectedColor.value,
            sizeId: selectedSize.value,
            quantity: formData.quantity,
          },
        ],
      };

      const response = await CreateProductDetails(data);
      if (response.data.EC === 0) {
        toast.success(response.data.message);
        props.close();
        props.fetch();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error creating product details:", error);
      toast.error("Failed to create product details!");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchSize();
    fetchColor();
  }, []);

  let imageUrlsArray = [];
  try {
    imageUrlsArray = JSON.parse(imageUrls);
  } catch (error) {}

  return (
    <div>
      <div className="overflow-x-hidden p-24 justify-center overflow-y-auto fixed inset-0 z-50 items-center">
        <div className="relative w-auto mx-auto max-w-xl">
          <div className="relative p-2 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create ProductImage
              </h3>
              <button
                onClick={props.close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div>
              <div className="flex items-center justify-center"></div>
              <div className="grid gap-2 mb-2 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Name Product
                  </label>
                  <Select
                    value={selectedProduct}
                    onChange={(selectedOption) => handleChange(selectedOption)}
                    options={options}
                    isClearable
                    placeholder="Choose Product"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Size
                  </label>
                  <Select
                    value={selectedSize}
                    onChange={(selectedSizeOption) =>
                      handleChangeSize(selectedSizeOption)
                    }
                    options={optionsSize}
                    isClearable
                    placeholder="Choose Size"
                  />
                </div>
              </div>

              <div className="grid gap-2 mb-2 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Color
                  </label>
                  <Select
                    value={selectedColor}
                    onChange={(selectedColorOption) =>
                      handleChangeColor(selectedColorOption)
                    }
                    options={optionsColor}
                    isClearable
                    placeholder="Choose Size"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Quantity
                  </label>
                  <input
                    value={formData.quantity}
                    onChange={handleInputChange}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder=" Color Code.."
                    name="quantity"
                  />
                </div>
              </div>
              <div>
                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                  <div className="flex items-center justify-center w-full">
                    {imageUrlsArray.map((imageUrl, index) => (
                      <img
                        key={imageUrl} // Sử dụng URL hình ảnh làm key
                        src={imageUrl}
                        style={{
                          width: "150px",
                          height: "150px",
                          marginRight: "10px",
                        }}
                        alt={`Product ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
          <button
            onClick={props.close}
            className="px-4 py-2 mr-2 text-sm font-medium text-red-500 border border-red-500 rounded-lg hover:bg-red-600 hover:text-white dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={()=>handleSubmit()}
            className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-800 rounded-lg hover:bg-blue-600 hover:text-white dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            Upload
          </button>
        </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default CreateDetails;
