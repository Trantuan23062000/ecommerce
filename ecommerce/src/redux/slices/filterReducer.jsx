import { createSlice } from "@reduxjs/toolkit";
import { GetBrands } from "../../api/shop/getproduct";
import { GetSize } from "../../api/shop/getsize";
import { GetColor } from "../../api/shop/getcolor";
import { FilterData} from "../../api/shop/filter";
import { setTotalPages } from "./ productSlice"; 

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    brands: [],
    sizes: [],
    colors: [],
    filterData:[],
    loading: false,
    error: null,

  },
  reducers: {
    fetchBrandsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBrandsSuccess: (state, action) => {
      state.loading = false;
      state.brands = action.payload;
    },
    fetchBrandsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchSizesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSizesSuccess: (state, action) => {
      state.loading = false;
      state.sizes = action.payload;
    },
    fetchSizesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchColorsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchColorsSuccess: (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    },
    fetchColorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchFilterDataRequest :(state)=>{
      state.loading =true
      state.error = null
    },
    fetchFilterDataSuccess :(state,action)=>{
      state.loading =false
      state.filterData = action.payload
    },
    fetchFilterDataFailure :(state,action)=>{
      state.loading =false
      state.filterData = action.payload
    }

  },
});

export const {
  fetchBrandsRequest,
  fetchBrandsSuccess,
  fetchBrandsFailure,
  fetchSizesRequest,
  fetchSizesSuccess,
  fetchSizesFailure,
  fetchColorsRequest,
  fetchColorsSuccess,
  fetchColorsFailure,
  fetchFilterDataRequest,
  fetchFilterDataSuccess,
  fetchFilterDataFailure

  
  // export các reducers cho các actions khác
} = filterSlice.actions;



export const fetchBrand = () => async (dispatch) => {
  try {
    dispatch(fetchBrandsRequest());
    const response = await GetBrands();
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchBrandsSuccess(response.data.DT));
    } else {
      dispatch(fetchBrandsFailure("Failed to fetch brands"));
    }
  } catch (error) {
    dispatch(fetchBrandsFailure(error.message));
  }
};

export const fetchSize = () => async (dispatch) => {
  try {
    dispatch(fetchSizesRequest());
    const response = await GetSize();
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchSizesSuccess(response.data.size));
    } else {
      dispatch(fetchSizesFailure("Failed to fetch brands"));
    }
  } catch (error) {
    dispatch(fetchSizesFailure(error.message));
  }
};

export const fetchColor = () => async (dispatch) => {
  try {
    dispatch(fetchColorsRequest());
    const response = await GetColor();
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchColorsSuccess(response.data.color));
    } else {
      dispatch(fetchColorsFailure("Failed to fetch brands"));
    }
  } catch (error) {
    dispatch(fetchColorsFailure(error.message));
  }
};


export const fetchFilterData = ({ brandId, sizeId, colorId, minPrice, maxPrice, category, pageSize, pageNumber }) => async (dispatch) => {
  try {
    dispatch(fetchFilterDataRequest());
    const response = await FilterData({ brandId, sizeId, colorId, minPrice, maxPrice, category, pageSize, pageNumber });
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchFilterDataSuccess(response.data.data));
      // Cập nhật số trang mới
      const totalPages = Math.ceil(response.data.data.length / pageSize);
      dispatch(setTotalPages(totalPages));
    } else {
      dispatch(fetchFilterDataFailure("Failed to fetch filter data"));
    }
  } catch (error) {
    dispatch(fetchFilterDataFailure(error.message));
  }
};

export default filterSlice.reducer;
