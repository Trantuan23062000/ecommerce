import React, { useEffect, useState } from "react";
import { CgHeart, CgSearch, CgShoppingCart } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRelated } from "../../redux/slices/relatedProduct";
import toast from "react-hot-toast";
import { addToCart, updateCart,selectCartItems } from "../../redux/slices/cartSlice";

const RelatedProduct = () => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const { dataRelated } = useSelector((state) => state.dataRelated); // Lấy trạng thái từ store
  const cartItems = useSelector(selectCartItems);

  const handleAddToCart = (item) => {
    // Kiểm tra xem số lượng sản phẩm đã có trong giỏ hàng
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    // Nếu sản phẩm đã có trong giỏ hàng
    if (existingItemIndex !== -1) {
      // Tạo một bản sao của sản phẩm đã có trong giỏ hàng
      const existingItem = { ...cartItems[existingItemIndex] };
      // Tính tổng số lượng sản phẩm sau khi thêm vào giỏ hàng
      const totalQuantity =
        existingItem.productVariant.quantity + 1;
      // Kiểm tra số lượng sản phẩm mới và số lượng hiện có
      if (totalQuantity > item.productVariant.quantity) {
        // Nếu số lượng mới vượt quá số lượng hiện có, thông báo và không thêm vào giỏ hàng
        toast.error(
          `The quantity has exceeded the limit product ${item.Product.name}: ${item.productVariant.quantity}`
        );
        return;
      }
      // Tạo một bản sao của đối tượng sản phẩm
      const updatedProductVariant = { ...existingItem.productVariant };
      // Tăng số lượng sản phẩm lên 1
      updatedProductVariant.quantity += 1;
      // Cập nhật lại đối tượng sản phẩm trong sản phẩm đã có trong giỏ hàng
      const updatedItem = { ...existingItem, productVariant: updatedProductVariant };
      // Cập nhật sản phẩm trong giỏ hàng với sản phẩm đã được cập nhật số lượng
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = updatedItem;
      // Cập nhật giỏ hàng trong Redux
      dispatch(updateCart(updatedCartItems));
      toast.success(`Product ${item.Product.name} added cart`);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng với số lượng là 1
      const newItem = { ...item, productVariant: { ...item.productVariant, quantity: 1 } };
      dispatch(addToCart(newItem));
      toast.success(`Product ${item.Product.name} added cart`);
    }
  };

  const handleProductSelect = (item) => {
    localStorage.setItem("selectedProductDrawer", JSON.stringify(item));
    window.location.reload();
  };

  useEffect(() => {
    // Lấy dữ liệu từ local storage
    const selectedProductDrawer = JSON.parse(
      localStorage.getItem("selectedProductDrawer")
    );
    // Lấy trường id từ dữ liệu và gán cho biến detailId
    const detailId = selectedProductDrawer?.id;
    // Gửi yêu cầu lấy dữ liệu liên quan
    dispatch(fetchRelated(detailId));
    // eslint-disable-next-line
  }, [dispatch]);

  // Khôi phục dữ liệu từ localStorage khi component được render lại sau khi reload trang
  useEffect(() => {
    if (!initialized) {
      const related = localStorage.getItem("selectedProductDrawer");
      if (related) {
        dispatch(fetchRelated(JSON.parse(related)));
      }
      setInitialized(true);
    }
    // eslint-disable-next-line
  }, [initialized]);

  

  if (!dataRelated) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="container pb-16">
        <h2 className="text-2xl font-bold text-gray-800 uppercase mb-6">
          Related products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {React.Children.toArray(
            dataRelated.map((item) => (
              <div className="bg-white shadow rounded overflow-hidden group">
                <div className="relative">
                  <img src={JSON.parse(item.Product.Image.URL)[0]} alt="product 1" className="w-full" />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                     justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                        <CgShoppingCart />
                      </div>
                      <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                        <CgHeart />
                      </div>
                      <div onClick={()=>handleProductSelect(item)} className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                        <Link to={{ pathname: `/product/${item.id}` }}>
                          <CgSearch />
                        </Link>
                      </div>  
                    </div>
                  </div>
                </div>
                <div className="pt-4 pb-3 px-4">
                  <div>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-black transition">
                      {item.Product.name}
                    </h4>
                  </div>
                  <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-black font-semibold">
                      ${item.Product.price}
                    </p>
                    <p className="text-sm text-gray-400 line-through">$55.90</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                  </div>
                </div>
                <div onClick={() => handleAddToCart(item)} className="block w-full py-1 rounded-b-lg text-center text-yellow-300 hover:text-red-500 font-bold bg-black border transition">
                  Add to cart
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
