import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { GetProduct } from "../../api/shop/getproduct";
import toast from "react-hot-toast";

export const fetchData = createAsyncThunk(
  'products/fetchData',
  async ({ currentPage, currentLimit }, { dispatch }) => {
    try {
      const response = await GetProduct(currentPage, currentLimit);
      if (response && response.data && response.data.EC === 0) {
        dispatch(setData(response.data.productDetails));
        dispatch(setTotalPages(response.data.totalPages));
      } else {
        toast.error("no data !");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Error fetching data !");
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    totalPages: 0,
    currentPage: 1,
    currentLimit: 6,
    selectedProduct: null, // Thêm trường selectedProduct vào initialState và khởi tạo là null
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentLimit: (state, action) => {
      state.currentLimit = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
});

export const { setData, setTotalPages, setCurrentPage,setCurrentLimit, setSelectedProduct,setFilterData } = productSlice.actions;
export const selectProductData = (state) => state.products.data;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectCurrentLimit = (state) => state.products.currentLimit;
export const selectSelectedProduct = (state) => state.products.selectedProduct;

export default productSlice.reducer;
