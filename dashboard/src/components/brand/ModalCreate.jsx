import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CreateBrand, UpdateBrand } from "../../api/brand";

const ModalCreate = (props) => {
  const { action, edit } = props;
  const navigate = useNavigate();
  const defaultBrandData = { name: "", description: "", image: null, URL: "" };
  const [brandData, setBrandData] = useState(defaultBrandData);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({ name: "", description: "" });

  useEffect(() => {
    if (props.action === "UPDATE") {
      setBrandData({ ...edit });
      setImagePreview(edit.imageUrl);
    }
    // eslint-disable-next-line
  }, [props.edit]);

  const handleChange = (value, name) => {
    setBrandData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : "This field is required",
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload an image (jpeg, png, gif).");
        return;
      }
  
      setBrandData((prevData) => ({
        ...prevData,
        image: file,
        URL: URL.createObjectURL(file), // Tạo URL đến tệp
      }));
      // Cập nhật trước hình ảnh
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async () => {
    // Kiểm tra xem có lỗi nào không
    const isValid = validateForm();
    if (isValid) {
      const formData = new FormData();
      formData.append("name", brandData.name);
      formData.append("description", brandData.description);
      if (brandData.image) {
        formData.append("image", brandData.image);
      }
  
      try {
        const response =
          action === "CREATE"
            ? await CreateBrand(formData)
            : await UpdateBrand(brandData.id, formData);
  
        if (response.data.EC === 0) {
          toast.success(response.data.mes);
          setBrandData(defaultBrandData);
          setImagePreview("");
          props.CloseModalCreate();
          props.fetchdata();
          navigate("/brand");
        } else {
          toast.error(response.data.EM);
        }
        console.log(response);
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Submission failed");
      }
    } else {
      // Nếu có lỗi, hiển thị thông báo lỗi cho người dùng
      toast.error("Please fill in all required fields.");
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {};
  
    if (!brandData.name) {
      newErrors.name = "This field is required";
      valid = false;
    }
    if (!brandData.description) {
      newErrors.description = "This field is required";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  
  

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-xl p-8 overflow-hidden">
        <div className="flex justify-between items-center pb-4 mb-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {props.action === "CREATE" ? "Create new Brand" : "Edit Brand "}
          </h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            onClick={() => props.CloseModalCreate()}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <form>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={brandData.name}
                onChange={(event) => handleChange(event.target.value, "name")}
                className={`mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={brandData.description}
                onChange={(event) =>
                  handleChange(event.target.value, "description")
                }
                className={`mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
              {props.action === "CREATE" ? (
                // If creating new, display the image preview
                imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview" // Add alt prop with meaningful text or an empty string
                    className="mt-2 h-40 w-full object-cover"
                  />
                ) : null
              ) : // If not creating new, display the image from the URL field of the edit data
              brandData && brandData.URL ? (
                <img
                  src={brandData.URL}
                  alt="Preview" // Add alt prop with meaningful text or an empty string
                  className="mt-2 h-40 w-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {props.action === "CREATE" ? "Create Brand" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
