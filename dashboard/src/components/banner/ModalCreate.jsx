import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CreateBanner, UpdateBanner } from "../../api/banner";

const ModalCreate = (props) => {
  const { action, edit } = props;
  const navigate = useNavigate();
  const defaultBrandData = { image: null, URL: "" };
  const [brandData, setBrandData] = useState(defaultBrandData);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (props.action === "UPDATE") {
      setBrandData({ ...edit });
      setImagePreview(edit.URL);
    }
    // eslint-disable-next-line
  }, [props.edit]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload an image (jpeg, png, gif)."
        );
        return;
      }
      setBrandData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (brandData.image) {
      formData.append("image", brandData.image);
    }
    formData.append("URL", brandData.URL);

    try {
      const response =
        action === "CREATE"
          ? await CreateBanner(formData)
          : await UpdateBanner(edit.id, formData);

      if (response.data.EC === 0) {
        toast.success(response.data.mes);
        setBrandData(defaultBrandData);
        setImagePreview("");
        props.CloseModalCreate();
        props.fetchdata();
        navigate("/banner");
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-xl p-8 overflow-hidden">
        <div className="flex justify-between items-center pb-4 mb-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {props.action === "CREATE" ? "Create new Banner" : "Edit Banner"}
          </h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            onClick={props.CloseModalCreate}
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
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-40 w-full object-cover"
                />
              )}
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {props.action === "CREATE" ? "Create Banner" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
