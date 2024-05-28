import React, { useEffect, useState } from "react";
import { GetBrands, CreateProductImage } from "../../api/productImage";
import toast from "react-hot-toast";

const ModalCreate = (props) => {
  const [brand, setBrand] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "",
    category: "",
    brandId: "",
    sale: "",
    images: [],
    imagePreviews: [], // Array to store image previews
  });

  const fetchBrand = async () => {
    const response = await GetBrands();
    setBrand(response.data.DT);
  };

  const HandleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
      imagePreviews: updatedImages.map((image) => URL.createObjectURL(image)),
    });
  };

  const handleChangeImage = (e) => {
    const selectedImages = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 5e6; // 2MB
    const validImages = [];
    const invalidImages = [];

    selectedImages.forEach((image) => {
      if (allowedTypes.includes(image.type) && image.size <= maxSizeInBytes) {
        validImages.push(image);
      } else {
        invalidImages.push(image);
      }
    });

    if (selectedImages.length + formData.images.length > 4) {
      toast.error("You can only select up to 4 images.");
      return;
    }

    // Handle invalid images
    if (invalidImages.length > 0) {
      toast.error("Some selected images are invalid or exceed 1MB in size.");
      // You can handle invalid images as needed, such as displaying an error message.
    }

    // Handle valid images
    setFormData({
      ...formData,
      images: [...formData.images, ...validImages],
      imagePreviews: [
        ...formData.imagePreviews,
        ...validImages.map((image) => URL.createObjectURL(image)),
      ],
    });
  };

  const HandleSubmit = async () => {
    const dataSened = new FormData();
    // Thêm các file vào FormData
    for (let i = 0; i < formData.images.length; i++) {
      dataSened.append("images", formData.images[i]);
    }
    if (!formData.sale) {
      // Gán giá trị mặc định là 0 cho formData.sale
      formData.sale = 0;
    }

    // Thêm các trường dữ liệu khác vào FormData
    dataSened.append("name", formData.name);
    dataSened.append("description", formData.description);
    dataSened.append("price", formData.price);
    dataSened.append("sale", formData.sale);
    dataSened.append("status", formData.status);
    dataSened.append("category", formData.category);
    dataSened.append("brandId", formData.brandId);
    const response = await CreateProductImage(dataSened);

    //console.log(response);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.message);
      props.close();
      props.fetch();
    } else {
      toast.error(response.data.error);
      props.show();
    }
  };

  useEffect(() => {
    fetchBrand();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <div className="overflow-x-hidden p-24 justify-center overflow-y-auto fixed inset-0 z-50 items-center">
          <div className="relative w-auto mx-auto max-w-3xl">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
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
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Name Product
                    </label>
                    <input
                      onChange={(e) => HandleChangeInput(e)}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter name product..."
                      name="name"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Price
                    </label>
                    <input
                      onChange={(e) => HandleChangeInput(e)}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Price..."
                      name="price"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Brand
                    </label>
                    <select
                      onChange={(e) => HandleChangeInput(e)}
                      name="brandId"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose brand</option>
                      {brand &&
                        brand.length > 0 &&
                        brand.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Image
                    </label>
                    <input
                      onChange={(e) => handleChangeImage(e)}
                      multiple
                      type="file"
                      accept="image/*"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Image"
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Sale
                    </label>
                    <input
                      onChange={(e) => HandleChangeInput(e)}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Sale..."
                      name="sale"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Status
                    </label>
                    <select
                      name="status"
                      onChange={(e) => HandleChangeInput(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose status</option>
                      <option value="Stocking">Stocking</option>
                      <option value="Out of stock">Out of stock</option>
                      <option value="Limited goods">Limited goods</option>
                      <option value="Best saler">Best saler</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      onChange={(e) => HandleChangeInput(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose category</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="All">Both men and women</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                  <div className="flex items-center justify-center w-full">
                    {formData.imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          style={{
                            width: "150px",
                            height: "150px",
                            marginRight: "10px",
                          }}
                          alt={`Product ${index + 1}`}
                        />
                        <button
                          className="absolute top-2 right-2 p-1"
                          onClick={() => removeImage(index)}
                        >
                          <svg
                            className="w-6 h-6 hover:text-red-800 text-red-600 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your message
                  </label>
                  <textarea
                    onChange={(e) => HandleChangeInput(e)}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    name="description"
                  ></textarea>
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
                  onClick={HandleSubmit}
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
    </div>
  );
};

export default ModalCreate;
