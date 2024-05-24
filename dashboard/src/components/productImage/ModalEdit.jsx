import React, { useEffect, useState } from "react";
import { GetBrands, GetListImage, UpdateProduct } from "../../api/productImage";
import toast from "react-hot-toast";

const ModalEdit = (props) => {
  const [formData, setFormData] = useState({
    ...props.data,
    images: [],
    imagePreviews: [],
  });
  const [brand, setBrand] = useState({});
  const [images, setImages] = useState([]);
  const [showInitialImages, setShowInitialImages] = useState(true); // State để kiểm soát việc hiển thị hình ảnh ban đầu

  const fetchBrand = async () => {
    const response = await GetBrands();
    if (response && response.data && response.data.EC === 0) {
      // console.log(response.data.DT);
      setBrand(response.data.DT);
    } else {
      toast.error(" Get Brands Erorr");
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchImage = async () => {
    const response = await GetListImage();
    if (response && response.data && response.data.EC === 0) {
      setImages(response.data.images.images);
    } else {
      toast.error("Get list Image error !");
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 2e6; // 1MB
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

    // Xử lý hình ảnh không hợp lệ
    if (invalidImages.length > 0) {
      toast.error("Some selected images are invalid or exceed 1MB in size.");
      // Bạn có thể xử lý hình ảnh không hợp lệ theo cách cần thiết, chẳng hạn hiển thị thông báo lỗi.
    }

    // Xử lý hình ảnh hợp lệ
    setFormData({
      ...formData,
      images: [...formData.images, ...validImages],
      // Tạo các URL xem trước hình ảnh mới được chọn
      imagePreviews: [
        ...formData.imagePreviews,
        ...validImages.map((image) => URL.createObjectURL(image)),
      ],
    });

    setShowInitialImages(false);
  };

  // Lấy đường dẫn URL từ mảng lưu trong trường URL của bảng Image
  const getImageUrl = (imageId) => {
    const image = images.find((img) => img.id === imageId);
    return image && image.URL && image.URL.startsWith("blob:")
      ? image.URL
      : image
      ? image.URL
      : null;
  };

  // Xoá hình ảnh từ mảng images
  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
      // Xoá URL xem trước ứng với hình ảnh bị xoá
      imagePreviews: formData.imagePreviews.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    fetchImage();
    fetchBrand();
    //console.log(props.data);
    // eslint-disable-next-line
  }, []);

  const HandleSubmit = async () => {
    // Tạo một FormData object
    const formDataToSend = new FormData();
    if (!formData.sale) {
      // Gán giá trị mặc định là 0 cho formData.sale
      formData.sale = 0;
    }
    // Thêm các trường dữ liệu vào formDataToSend
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("sale", formData.sale);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("brandId", formData.brandId);
    formDataToSend.append("imageId", formData.imageId);
    formDataToSend.append("description", formData.description);

    // Kiểm tra xem có hình ảnh nào mới được chọn không
    if (formData.images.length > 0) {
      // Nếu có hình ảnh mới được chọn, thêm chúng vào formDataToSend
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });
    }

    const response = await UpdateProduct(props.data.id, formDataToSend);
    if (response && response.EC === 0) {
      toast.success(response.message);
      props.close();
      props.fetch();
    } else {
      props.show();
      toast.error(response.error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="overflow-x-hidden p-24 justify-center overflow-y-auto fixed inset-0 z-50 items-center">
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit ProductImage
                  </h3>
                  <button
                    onClick={() => {
                      props.close();
                    }}
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
                  <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Name Product
                      </label>
                      <input
                        value={formData.name}
                        onChange={handleChangeInput}
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter name product..."
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Price
                      </label>
                      <input
                        onChange={handleChangeInput}
                        value={formData.price}
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
                        onChange={handleChangeInput}
                        value={formData.brandId}
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
                        onChange={handleImageChange}
                        multiple
                        type="file"
                        accept="image/*"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Image"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 mb-4 md:grid-cols-3">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Sale
                      </label>
                      <input
                        onChange={handleChangeInput}
                        value={formData.sale}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="No sale"
                        name="sale"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Status
                      </label>
                      <select
                        name="status"
                        onChange={handleChangeInput}
                        value={formData.status}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose status</option>
                        <option value="Stocking">Stocking</option>
                        <option value="Out of stock">Out of stock</option>
                        <option value="Limited goods">Limited goods</option>
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
                        onChange={handleChangeInput}
                        value={formData.category}
                        name="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose category</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="All">Both men and women</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-4 mb-1 sm:grid-cols-1">
                    <div className="flex items-center justify-center w-full">
                      {formData.imagePreviews.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
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

                  <div className="grid gap-4 mb-1 sm:grid-cols-1">
                    <div className="flex items-center justify-center w-full">
                      {showInitialImages &&
                        typeof getImageUrl(formData.imageId) === "string" &&
                        JSON.parse(getImageUrl(formData.imageId)).map(
                          (url, index) => (
                            <div key={index} className="relative">
                              <img
                                src={url}
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  marginRight: "10px",
                                }}
                                alt={`Product ${index + 1}`}
                              />
                            </div>
                          )
                        )}
                    </div>
                  </div>

                  <div className="grid gap-4 mb-4 sm:grid-cols-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Description
                    </label>
                    <textarea
                      onChange={handleChangeInput}
                      value={formData.description}
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
    </div>
  );
};

export default ModalEdit;
